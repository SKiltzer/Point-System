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
    // Recalculate progress each day
    const newTotalProgress = await getTotalProgress() + currentPoints + bonusPoints;
    // Check Goals reached
    const goals = frontmatter.goals || {};
    let achievementMessages = [];
    for (const [goalKey, goalData] of Object.entries(goals)) {
        if (!goalData.achieved && newTotalProgress >= goalData.points) {
            goalData.achieved = true;
            goalData.date_achieved = new Date().toISOString().split('T')[0];
            achievementMessages.push(`🎉 GOAL ACHIEVED: ${goalData.name}! 🎉`);
        }
    }
    const fileContent = await app.vault.read(currentFile);
    let updatedContent = fileContent.replace(
        /---\n([\s\S]*?)\n---/,
        (match, frontmatterContent) => {
            const lines = frontmatterContent.split('\n');
            const updatedLines = [];
            
            const fieldsToUpdate = {
                'Daily_Logged': 'true',
                'Day_Tier': `"${dayTier}"`,
                'Current_Streak_Type': `"${newStreakType}"`,
                'Current_Streak_Count': newStreakCount.toString(),
                'Bonus_Points_Applied': bonusPoints.toString(),
                'Total_Progress': newTotalProgress.toString()
            };
            let inGoalsSection = false;
            let goalsSectionLines = [];
            for (const line of lines) {
                if (line.trim() === 'goals:') {
                    inGoalsSection = true;
                    goalsSectionLines.push(line);
                    continue;
                }
                if (inGoalsSection) {
                    if (line.startsWith('  ') || line.trim() === '') {
                        goalsSectionLines.push(line);
                        continue;
                    } else {
                        inGoalsSection = false;
                        for (const [goalKey, goalData] of Object.entries(goals)) {
                            goalsSectionLines.push(`  ${goalKey}:`);
                            goalsSectionLines.push(`    name: "${goalData.name}"`);
                            goalsSectionLines.push(`    points: ${goalData.points}`);
                            goalsSectionLines.push(`    achieved: ${goalData.achieved}`);
                            goalsSectionLines.push(`    date_achieved: "${goalData.date_achieved}"`);
                        }
                        updatedLines.push(...goalsSectionLines);
                        goalsSectionLines = [];
                    }
                }
                if (!inGoalsSection) {
                    let updated = false;
                    for (const [field, value] of Object.entries(fieldsToUpdate)) {
                        if (line.startsWith(`${field}:`)) {
                            updatedLines.push(`${field}: ${value}`);
                            updated = true;
                            break;
                        }
                    }
                    if (!updated) {
                        updatedLines.push(line);
                    }
                }
            }
            if (goalsSectionLines.length > 0) {
                for (const [goalKey, goalData] of Object.entries(goals)) {
                    goalsSectionLines.push(`  ${goalKey}:`);
                    goalsSectionLines.push(`    name: "${goalData.name}"`);
                    goalsSectionLines.push(`    points: ${goalData.points}`);
                    goalsSectionLines.push(`    achieved: ${goalData.achieved}`);
                    goalsSectionLines.push(`    date_achieved: "${goalData.date_achieved}"`);
                }
                updatedLines.push(...goalsSectionLines);
            }
            return `---\n${updatedLines.join('\n')}\n---`;
        }
    );
    await app.vault.modify(currentFile, updatedContent);
    const totalPoints = currentPoints + bonusPoints;
    new Notice(`Day logged! ${totalPoints} points (${bonusPoints} bonus) - ${dayTier}`);
    for (const message of achievementMessages) {
        new Notice(message, 5000);
    }
})();