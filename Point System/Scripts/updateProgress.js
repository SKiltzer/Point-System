(async () => {
    const currentFile = app.workspace.getActiveFile();
    if (!currentFile) return;
    
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
    
    const fileContent = await app.vault.read(currentFile);
    const updatedContent = fileContent.replace(
        /Total_Progress:\s*\d+/,
        `Total_Progress: ${totalProgress}`
    );
    
    await app.vault.modify(currentFile, updatedContent);
    
    new Notice(`Progress updated: ${totalProgress} total points`);
})();