// Debug Update Progress Script
// Save this as Scripts/debugUpdateProgress.js
// Use this temporarily to troubleshoot the Update Progress issue

(async () => {
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) {
        new Notice("No active file found");
        return;
    }
    
    console.log("Current file:", currentFile.name);
    
    // Get all daily notes
    const dailyNotes = app.vault.getMarkdownFiles().filter(file => 
        file.name.match(/^\d{4}-\d{2}-\d{2}/) && 
        file.path.includes('Daily Notes')
    );
    
    console.log("Found daily notes:", dailyNotes.length);
    
    let totalProgress = 0;
    let loggedNotes = [];
    
    for (const file of dailyNotes) {
        const cache = app.metadataCache.getFileCache(file);
        if (cache?.frontmatter) {
            console.log(`File: ${file.name}, Daily_Logged: ${cache.frontmatter.Daily_Logged}, Points: ${cache.frontmatter.Points}, Bonus: ${cache.frontmatter.Bonus_Points_Applied}`);
            
            if (cache.frontmatter.Daily_Logged === true) {
                const points = cache.frontmatter.Points || 0;
                const bonusPoints = cache.frontmatter.Bonus_Points_Applied || 0;
                const fileTotal = points + bonusPoints;
                totalProgress += fileTotal;
                
                loggedNotes.push({
                    file: file.name,
                    points: points,
                    bonus: bonusPoints,
                    total: fileTotal
                });
            }
        }
    }
    
    console.log("Logged notes breakdown:", loggedNotes);
    console.log("Calculated total progress:", totalProgress);
    
    // Get current file content to see what we're working with
    const fileContent = await app.vault.read(currentFile);
    const frontmatterMatch = fileContent.match(/---\n([\s\S]*?)\n---/);
    
    if (frontmatterMatch) {
        console.log("Current frontmatter:", frontmatterMatch[1]);
    }
    
    // Update the current file's Total_Progress
    const updatedContent = fileContent.replace(
        /Total_Progress:\s*\d+/,
        `Total_Progress: ${totalProgress}`
    );
    
    console.log("Content changed:", fileContent !== updatedContent);
    
    if (fileContent !== updatedContent) {
        await app.vault.modify(currentFile, updatedContent);
        new Notice(`Progress updated: ${totalProgress} total points (found ${loggedNotes.length} logged days)`);
    } else {
        new Notice(`No change needed. Progress is already ${totalProgress}`);
    }
    
    // Display breakdown in notice
    if (loggedNotes.length > 0) {
        const breakdown = loggedNotes.map(note => `${note.file}: ${note.total}`).join(', ');
        console.log("Breakdown:", breakdown);
    }
})();