function getTotalProgress(tp) {
    try {
        const dailyNotes = app.vault.getMarkdownFiles().filter(file => 
            file.name.match(/^\d{4}-\d{2}-\d{2}/) && 
            file.path.includes('Daily Notes')
        );
        
        let totalProgress = 0;
        
        for (const file of dailyNotes) {
            const cache = app.metadataCache.getFileCache(file);
            if (cache && cache.frontmatter && cache.frontmatter.Daily_Logged === true) {
                const points = cache.frontmatter.Points || 0;
                const bonusPoints = cache.frontmatter.Bonus_Points_Applied || 0;
                totalProgress += points + bonusPoints;
            }
        }
        
        return totalProgress;
    } catch (error) {
        console.error('Error calculating total progress:', error);
        return 0;
    }
}

function getWeeklyStats(tp) {
    try {
        const currentWeek = tp.date.now("w");
        const currentYear = tp.date.now("YYYY");
        
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
            if (cache && cache.frontmatter) {
                const noteWeek = cache.frontmatter.week_number;
                const noteYear = cache.frontmatter.year;
                
                if (noteWeek == currentWeek && noteYear == currentYear && cache.frontmatter.Daily_Logged === true) {
                    const tier = cache.frontmatter.Day_Tier;
                    if (tier === "Solid Day") weekStats.solid++;
                    else if (tier === "Great Day") weekStats.great++;
                    else if (tier === "Rockstar Day") weekStats.rockstar++;
                }
            }
        }
        
        return weekStats;
    } catch (error) {
        console.error('Error getting weekly stats:', error);
        return { solid: 0, great: 0, rockstar: 0 };
    }
}

function getCurrentStreak(tp) {
    try {
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
            if (cache && cache.frontmatter && cache.frontmatter.Daily_Logged === true) {
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
    } catch (error) {
        console.error('Error getting current streak:', error);
        return { type: "", count: 0 };
    }
}

// Export Functions
module.exports = getTotalProgress;
module.exports.getWeeklyStats = getWeeklyStats;
module.exports.getCurrentStreak = getCurrentStreak;