---
date: <% tp.date.now("YYYY-MM-DD") %>
week_number: <% tp.date.now("w") %>
year: <% tp.date.now("YYYY") %>
type: "weekly_summary"
week_start: <% tp.date.now("YYYY-MM-DD", "P-6D") %>
week_end: <% tp.date.now("YYYY-MM-DD") %>
---
# Weekly Review
<%*
// Start and end dates
const weekStart = tp.date.now("YYYY-MM-DD", "P-6D");
const weekEnd = tp.date.now("YYYY-MM-DD");
const currentWeek = tp.date.now("w");
const currentYear = tp.date.now("YYYY");
// Build weekly stats
let weekStats = {
    solid: 0,
    great: 0,
    rockstar: 0,
    needsWork: 0,
    totalPoints: 0,
    bonusPoints: 0
};
// Collect daily notes
const dailyNotes = app.vault.getMarkdownFiles().filter(file => 
    file.name.match(/^\d{4}-\d{2}-\d{2}/) && 
    file.path.includes('Daily Notes')
);
for (const file of dailyNotes) {
    const cache = app.metadataCache.getFileCache(file);
    if (cache?.frontmatter) {
        const noteWeek = cache.frontmatter.week_number;
        const noteYear = cache.frontmatter.year;
        if (noteWeek == currentWeek && noteYear == currentYear && cache.frontmatter.Daily_Logged === true) {
            const tier = cache.frontmatter.Day_Tier;
            const points = cache.frontmatter.Points || 0;
            const bonus = cache.frontmatter.Bonus_Points_Applied || 0;
            weekStats.totalPoints += points;
            weekStats.bonusPoints += bonus;
            if (tier === "Solid Day") weekStats.solid++;
            else if (tier === "Great Day") weekStats.great++;
            else if (tier === "Rockstar Day") weekStats.rockstar++;
            else if (tier === "Needs Work") weekStats.needsWork++;
        }
    }
}
let treatsEarned = [];
if (weekStats.great >= 3) {
    treatsEarned.push("🍭 Popsicle (Great Day Streak)");
}
if (weekStats.rockstar >= 3 || (weekStats.great + weekStats.rockstar >= 7)) {
    treatsEarned.push("🍦 Ice Cream (Rockstar Achievement)");
}
if (weekStats.solid >= 3 && weekStats.solid <= 5) {
    treatsEarned.push("🍭 Popsicle (Solid Day Streak)");
}
%>
# 📊 Week <% tp.date.now("w") %> Summary
**Week of <% tp.date.now("YYYY-MM-DD", "P-6D") %> to <% tp.date.now("YYYY-MM-DD") %>**
## 🏆 Daily Performance
- **Rockstar Days:** <%* tR += weekStats.rockstar %> 🌟
- **Great Days:** <%* tR += weekStats.great %> ⭐
- **Solid Days:** <%* tR += weekStats.solid %> ✅
- **Needs Work Days:** <%* tR += weekStats.needsWork %> ⚠️
## 📈 Points Summary
- **Total Base Points:** <%* tR += weekStats.totalPoints %>
- **Bonus Points Earned:** <%* tR += weekStats.bonusPoints %>
- **Week Total:** <%* tR += (weekStats.totalPoints + weekStats.bonusPoints) %>
## 🍬 Treats Earned This Week
<%* 
if (treatsEarned.length > 0) {
    treatsEarned.forEach(treat => {
        tR += "- " + treat + "\n";
    });
} else {
    tR += "- No treats earned this week\n";
}
%>
## 📝 Reflection Time & Discussion
### What went well this week?
- 
- 
### What were some struggles?
- 
- 
---
## 🔄 Weekly Reset
```dataview
TABLE 
    file.name as "Date",
    Points as "Daily Points",
    Bonus_Points_Applied as "Bonus Points",
    Day_Tier as "Tier"
FROM "Daily Notes"
WHERE week_number = <% tp.date.now("w") %> AND year = <% tp.date.now("YYYY") %> AND Daily_Logged = true
SORT file.name ASC
```
> All streaks and bonus counters are reset *weekly*.

---
## **Next Week:** Week <%* tR += (parseInt(tp.date.now("w")) + 1) %>

### What can we improve?
- 
- 
### Goals for next week:
- 
- 
### What can I do to help you reach your goals?
- 
- 