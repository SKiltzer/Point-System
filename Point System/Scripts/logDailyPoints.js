(async () => {
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) return;
    
    const cache = app.metadataCache.getFileCache(currentFile);
    if (!cache?.frontmatter) return;
    
    const frontmatter = cache.frontmatter;
    
    if (frontmatter.Daily_Logged === true) {
        new Notice("Day already logged!");
        return;
    }
    
    const currentPoints = frontmatter.Points || 20;
    
    // Tier Info
    let dayTier = "";
    if (currentPoints < 20) {
        dayTier = "Needs Work";
    } else if (currentPoints >= 21 && currentPoints <= 30) {
        dayTier = "Solid Day";
    } else if (currentPoints >= 31 && currentPoints <= 39) {
        dayTier = "Great Day";
    } else if (currentPoints >= 40) {
        dayTier = "Rockstar Day";
    }
    
    // Streak Info
    const streakInfo = await getCurrentStreak();
    
    let bonusPoints = 0;
    let newStreakType = streakInfo.type;
    let newStreakCount = streakInfo.count;
    
    if (dayTier === "Needs Work") {
        newStreakType = "";
        newStreakCount = 0;
    } else {
        if (streakInfo.count === 0) {
            newStreakType = dayTier;
            newStreakCount = 1;
        } else {
            if ((streakInfo.type === "Solid Day" && dayTier === "Solid Day") ||
                (streakInfo.type === "Great Day" && (dayTier === "Great Day" || dayTier === "Rockstar Day")) ||
                (streakInfo.type === "Rockstar Day" && dayTier === "Rockstar Day")) {
                newStreakCount = streakInfo.count + 1;
            } else if (dayTier === "Great Day" && streakInfo.type === "Solid Day") {
                newStreakType = "Great Day";
                newStreakCount = 1;
            } else if (dayTier === "Rockstar Day" && (streakInfo.type === "Solid Day" || streakInfo.type === "Great Day")) {
                newStreakType = "Rockstar Day";
                newStreakCount = 1;
            } else {
                newStreakType = dayTier;
                newStreakCount = 1;
            }
        }
    }
    
    // Bonus Points
    if (newStreakType === "Great Day" && newStreakCount >= 3) {
        bonusPoints = 5;
    } else if (newStreakType === "Rockstar Day" && newStreakCount >= 3) {
        bonusPoints = 10;
    } else if (newStreakType === "Solid Day" && newStreakCount >= 3 && newStreakCount <= 5) {
        bonusPoints = 5;
    }
    
    const weeklyStats = await getWeeklyStats();
    const totalGreatRockstar = weeklyStats.great + weeklyStats.rockstar + (dayTier === "Great Day" || dayTier === "Rockstar Day" ? 1 : 0);
    
    if (totalGreatRockstar >= 7 && !await checkRockstarUsedThisWeek()) {
        bonusPoints = Math.max(bonusPoints, 10);
        newStreakType = "Rockstar Day";
        await markRockstarUsedThisWeek();
    }
    
    // Update Metadata
    const fileContent = await app.vault.read(currentFile);
    const updatedContent = fileContent.replace(
        /---\n([\s\S]*?)\n---/,
        (match, frontmatterContent) => {
            const lines = frontmatterContent.split('\n');
            const updatedLines = [];
            const fieldsToUpdate = {
                'Daily_Logged': 'true',
                'Day_Tier': `"${dayTier}"`,
                'Current_Streak_Type': `"${newStreakType}"`,
                'Current_Streak_Count': newStreakCount.toString(),
                'Bonus_Points_Applied': bonusPoints.toString()
            };
            
            let fieldsAdded = new Set();
            
            for (const line of lines) {
                let updated = false;
                for (const [field, value] of Object.entries(fieldsToUpdate)) {
                    if (line.startsWith(`${field}:`)) {
                        updatedLines.push(`${field}: ${value}`);
                        fieldsAdded.add(field);
                        updated = true;
                        break;
                    }
                }
                if (!updated) {
                    updatedLines.push(line);
                }
            }
            
            for (const [field, value] of Object.entries(fieldsToUpdate)) {
                if (!fieldsAdded.has(field)) {
                    updatedLines.push(`${field}: ${value}`);
                }
            }
            
            return `---\n${updatedLines.join('\n')}\n---`;
        }
    );
    
    await app.vault.modify(currentFile, updatedContent);
    
    // Progress Checks
    const newTotalProgress = await getTotalProgress();
    const finalContent = await app.vault.read(currentFile);
    const finalUpdatedContent = finalContent.replace(
        /Total_Progress:\s*\d+/,
        `Total_Progress: ${newTotalProgress}`
    );
    
    await app.vault.modify(currentFile, finalUpdatedContent);
    
    const totalPoints = currentPoints + bonusPoints;
    new Notice(`Day logged! ${totalPoints} points (${bonusPoints} bonus) - ${dayTier}`);
    
    if (newTotalProgress >= 650) {
        new Notice("🎉 GOAL REACHED! Time for roller blades! 🛼");
    }
})();

// Helper Functions
async function getCurrentStreak() {
    const dailyNotes = app.vault.getMarkdownFiles()
        .filter(file => 
            file.name.match(/^\d{4}-\d{2}-\d{2}/) && 
            file.path.includes('Daily Notes')
        )
        .sort((a, b) => b.name.localeCompare(a.name));
    
    let currentStreak = {
        type: "",
        count: 0
    };
    
    const notesToCheck = dailyNotes.slice(1);
    
    for (const file of notesToCheck) {
        const cache = app.metadataCache.getFileCache(file);
        if (cache?.frontmatter?.Daily_Logged === true) {
            const tier = cache.frontmatter.Day_Tier;
            
            if (currentStreak.count === 0) {
                if (tier === "Solid Day" || tier === "Great Day" || tier === "Rockstar Day") {
                    currentStreak.type = tier;
                    currentStreak.count = 1;
                } else {
                    break;
                }
            } else {
                if ((currentStreak.type === "Solid Day" && tier === "Solid Day") ||
                    (currentStreak.type === "Great Day" && (tier === "Great Day" || tier === "Rockstar Day")) ||
                    (currentStreak.type === "Rockstar Day" && tier === "Rockstar Day")) {
                    currentStreak.count++;
                } else {
                    break;
                }
            }
        }
    }
    
    return currentStreak;
}

async function getWeeklyStats() {
    const currentDate = new Date();
    const currentWeek = moment(currentDate).week();
    const currentYear = currentDate.getFullYear();
    
    const dailyNotes = app.vault.getMarkdownFiles().filter(file => 
        file.name.match(/^\d{4}-\d{2}-\d{2}/) && 
        file.path.includes('Daily Notes')
    );
    
    let weekStats = {
        solid: 0,
        great: 0,
        rockstar: 0
    };
    
    for (const file of dailyNotes) {
        const cache = app.metadataCache.getFileCache(file);
        if (cache?.frontmatter) {
            const noteWeek = cache.frontmatter.week_number;
            const noteYear = cache.frontmatter.year;
            
            if (noteWeek == currentWeek && noteYear == currentYear) {
                const tier = cache.frontmatter.Day_Tier;
                if (tier === "Solid Day") weekStats.solid++;
                else if (tier === "Great Day") weekStats.great++;
                else if (tier === "Rockstar Day") weekStats.rockstar++;
            }
        }
    }
    
    return weekStats;
}

async function getTotalProgress() {
    const dailyNotes = app.vault.getMarkdownFiles().filter(file => 
        file.name.match(/^\d{4}-\d{2}-\d{2}/) && 
        file.path.includes('Daily Notes')
    );
    
    let totalProgress = 0;
    
    for (const file of dailyNotes) {
        const cache = app.metadataCache.getFileCache(file);
        if (cache?.frontmatter?.Daily_Logged === true) {
            const points = cache.frontmatter.Points || 0;
            const bonusPoints = cache.frontmatter.Bonus_Points_Applied || 0;
            totalProgress += points + bonusPoints;
        }
    }
    
    return totalProgress;
}

async function checkRockstarUsedThisWeek() {
    const currentDate = new Date();
    const currentWeek = moment(currentDate).week();
    const currentYear = currentDate.getFullYear();
    
    const dailyNotes = app.vault.getMarkdownFiles().filter(file => 
        file.name.match(/^\d{4}-\d{2}-\d{2}/) && 
        file.path.includes('Daily Notes')
    );
    
    for (const file of dailyNotes) {
        const cache = app.metadataCache.getFileCache(file);
        if (cache?.frontmatter) {
            const noteWeek = cache.frontmatter.week_number;
            const noteYear = cache.frontmatter.year;
            
            if (noteWeek == currentWeek && noteYear == currentYear && 
                cache.frontmatter.Rockstar_Bonus_Used === true) {
                return true;
            }
        }
    }
    
    return false;
}

async function markRockstarUsedThisWeek() {
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) return;
    
    const fileContent = await app.vault.read(currentFile);
    const updatedContent = fileContent.replace(
        /---\n([\s\S]*?)\n---/,
        (match, frontmatterContent) => {
            return match + '\nRockstar_Bonus_Used: true';
        }
    );
    
    await app.vault.modify(currentFile, updatedContent);
}