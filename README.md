# 🛼 Point Tracking System for Kids
A comprehensive Obsidian vault for tracking chores, behavior, and progress toward reward goals with built-in streak bonuses and weekly reflection.
## 📦 What's Included
This vault comes pre-configured with everything you need:
- ✅ **All Required Plugins** (Templater, Meta-Bind, Dataview, Periodic Notes)
- ✅ **Complete Templates** (Daily Notes, Weekly Summaries)
- ✅ **JavaScript Scripts** (Point logging, progress tracking)
- ✅ **Dashboard** (Real-time progress visualization)
- ✅ **Sample Data** (Example logged days to test functionality)
## 🚀 Quick Start Guide

### Step 1: Open the Vault
1. **Download and extract** the vault folder
2. **Open Obsidian**
3. **"Open folder as vault"** → Select the extracted folder
4. **Trust author and enable plugins** when prompted
### Step 2: Customize Your Goal
1. **Open**: `Point System.md` to review the point structure
2. **Edit the goal** in daily note templates if needed (default: 650 points for roller blades as this was the goal in our case)
3. **Modify point values** for chores/behaviors if desired
### Step 3: Start Tracking
1. **Create daily note**: Use Command Palette → "Periodic Notes: Open daily note"
2. **Track points**: Click buttons throughout the day as tasks are completed
3. **End of day**: Click "Log Day" button to finalize and calculate bonuses
4. **Weekly review**: Use Command Palette → "Periodic Notes: Open weekly note" on Sundays

Everything is fully configured to be used as an "out-of-the-box" solution. However, if anything is adjusted, below is the FULL vault file structure:
````markdown
📁 Point-Tracking-Vault/
├── 📄 README.md                           ← Main instructions file
├── 📄 Point System.md                     ← Reference document with rules
│
├── 📁 .obsidian/                         ← Plugin configurations
│   ├── 📁 plugins/                       ← Installed plugins
│   │   ├── 📁 templater-obsidian/
│   │   ├── 📁 obsidian-meta-bind-plugin/
│   │   ├── 📁 dataview/
│   │   ├── 📁 periodic-notes/
│   │   └── 📁 dbfolder/
│   ├── 📄 app.json                       ← Obsidian settings
│   ├── 📄 community-plugins.json         ← Plugin list
│   └── 📄 plugins.json                   ← Plugin enable/disable
│
├── 📁 Daily Notes/                       ← Daily tracking notes
│   ├── 📄 2025-06-03.md                 ← Example logged day
│   ├── 📄 2025-06-04.md                 ← Example logged day  
│   └── ...                               ← Future daily notes created here
│
├── 📁 Weekly Summaries/                  ← Weekly reflection notes
│   ├── 📄 2025-W23.md                   ← Example weekly summary
│   └── ...                               ← Future weekly summaries
│
├── 📁 Dashboards/                        ← Progress tracking dashboards
│   ├── 📄 Progress Dashboard.md          ← Main progress tracking dashboard
│   ├── 📄 Weekly Overview.md             ← Weekly performance summary
│   └── 📄 Achievement History.md         ← Long-term achievement tracking
│
├── 📁 Templates/                         ← Note templates
│   ├── 📄 Daily Note Template.md         ← Main daily tracking template
│   ├── 📄 Weekly Summary Template.md     ← Weekly reflection template
│   ├── 📄 Multi-Goal Daily Template.md   ← Alternative multi-goal version
│   └── 📄 Multi-Goal Weekly Template.md  ← Alternative multi-goal weekly
│
├── 📁 Scripts/                           ← JavaScript files for Meta-Bind
│   ├── 📄 logDailyPoints.js             ← Main day logging script
│   ├── 📄 updateProgress.js             ← Manual progress update
│   ├── 📄 debugUpdateProgress.js        ← Troubleshooting script
│   │
│   └── 📁 templater/                     ← Templater-specific functions
│       └── 📄 templater-functions.js     ← User functions for templates
│
├── 📁 Archive/                           ← Optional: completed goals
│   └── 📁 Previous Goals/
│
└── 📁 Documentation/                     ← Additional help files
    ├── 📄 Setup Instructions.md          ← Detailed setup guide
    ├── 📄 Troubleshooting Guide.md       ← Common issues and fixes
    ├── 📄 Customization Examples.md      ← How to modify goals/points
    └── 📄 Plugin Configurations.md       ← Plugin settings backup
````
## 📋 Daily Workflow

### Morning:
- **Open today's daily note** (auto-created by Periodic Notes)
- **Review goals** and point opportunities
- **Start with 20 base points**
### Throughout the Day:
- **Click chore buttons** when tasks are completed (+3 to +10 points)
- **Click behavior buttons** for good attitudes (+1 to +3 points)
- **Subtract points** for negative behaviors (-1 to -3 points)
- **Watch real-time progress** on the progress bar
### Evening (Before 22:00 recommended):
- **Review daily total** and discuss the day
- **Click "Log Day"** to finalize points and calculate tier/bonuses
- **Celebrate achievements** and plan for tomorrow
### Weekly (Sundays):
- **Create weekly summary** using Periodic Notes
- **Complete reflection questions** together
- **Review treats earned** and plan rewards
- **Set goals** for the upcoming week

## 🎯 Point System Overview
### Daily Tiers:

- **< 20 points**: Needs Work (resets streaks)
- **21-30 points**: Solid Day
- **31-39 points**: Great Day (streak bonus after 3 days)
- **40+ points**: Rockstar Day (streak bonus after 3 days)
### Streak Bonuses:
- **Great Day Streak**: +5 points/day after 3 consecutive great days
- **Rockstar Streak**: +10 points/day after 3 consecutive rockstar days
- **Weekly Rockstar**: +10 points if 7 great/rockstar days in one week (once per week)
### Treats & Rewards:
- **Great Day Streak (3+ days)**: Popsicle + bonus points
- **Rockstar Streak (3+ days)**: Ice cream + bonus points
- **Solid Day Streak (3-5 days)**: Popsicle (one-time bonus)

## 🔧 Customization Guide

### Changing the Main Goal

#### Option 1: Simple Goal Change
1. **Open**: `Templates/Daily Note Template.md`
2. **Find**: The progress bar section
3. **Change**: `maxValue(650)` to your new point total
4. **Update**: Goal name in the template (change "🛼 Roller Blades" to your reward)
#### Option 2: Multiple Goals (Advanced)
1. **Use**: The tiered goals template provided in the artifacts
2. **Replace**: The frontmatter in daily template with multi-goal structure
3. **Customize**: Goal names, point values, and rewards in the frontmatter

### Modifying Point Values

#### Chore Points:
1. **Open**: `Templates/Daily Note Template.md`
2. **Find**: The chore section
3. **Edit**: Button values and descriptions    
    ```markdown
    - [ ] **Dusting** `BUTTON[add-3]` (3 points)
    ```    
    - Change `add-3` to `add-5` for 5 points
    - Update the description text
#### Behavior Points:
1. **Locate**: The positive/negative behavior sections
2. **Modify**: Button values as needed
3. **Add new behaviors**: Copy existing button format

### Adding New Buttons:
````markdown
```meta-bind-button
label: "7"
icon: "plus"
hidden: true
id: "add-7"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "x + 7"
```
Then reference with: `BUTTON[add-7]`
````

## 📊 Monitoring Progress

### Progress Dashboards
- **Location**: `Dashboards/` folder
- **Main Dashboard**: `Dashboards/Progress Dashboard.md` - Complete progress overview
- **Weekly Overview**: `Dashboards/Weekly Overview.md` - Weekly performance summary  
- **Achievement History**: `Dashboards/Achievement History.md` - Long-term tracking
- **Updates**: Automatically as days are logged
### Key Metrics to Watch:
- **Daily Point Averages**: Aim for 25+ points per day
- **Streak Maintenance**: Look for consistent tier achievements
- **Weekly Patterns**: Identify best/worst days of week
- **Bonus Point Earnings**: Track streak bonus accumulation
## 🛠️ Troubleshooting

### Common Issues:

#### Buttons Not Working:
> In most cases, closing and reopening the note will resolve any issues.
- **Check**: Meta-Bind plugin is enabled
- **Verify**: JavaScript is enabled in Meta-Bind settings
- **Ensure**: Scripts folder contains the JavaScript files
#### Progress Not Updating:
- **Must click**: "Log Day" button to finalize daily points
- **Check**: `Daily_Logged: true` appears in frontmatter after logging
- **Click**: "Update Progress" button to refresh totals manually
#### Templates Not Creating:
- **Verify**: Periodic Notes plugin is configured
- **Check**: Template paths in Periodic Notes settings
- **Ensure**: Templates folder contains the template files
#### Dashboard Shows Errors:
- **Requires**: At least one logged day for most tables to populate
- **Check**: Daily notes are in "Daily Notes/" folder
- **Verify**: File names follow YYYY-MM-DD format
- **Location**: Dashboards are now in `Dashboards/` folder for better organization

### Plugin Settings (Should already be configured):

#### Templater:
- **Template folder**: `Templates/`
- **Script files folder**: `Scripts/templater/`
- **User Functions**: Enabled
#### Periodic Notes:
- **Daily Notes**: Enabled, folder `Daily Notes/`, template `Templates/Daily Note Template.md`
- **Weekly Notes**: Enabled, folder `Weekly Summaries/`, template `Templates/Weekly Summary Template.md`
#### Meta-Bind:
- **JavaScript**: Enabled
- **Files referenced**: Relative to vault root in `Scripts/` folder
## 🎮 Advanced Features

### Tiered Goals System:
- **Multiple simultaneous goals** with different point thresholds
- **Progressive rewards** to maintain motivation
- **Customizable reward types** and point values
### Automated Tracking:
- **Streak calculations** happen automatically
- **Bonus point application** based on achievement patterns
- **Weekly statistics** compilation and reset
### Family Bonding Features:
- **Weekly reflection questions** promote discussion
- **Parent involvement prompts** in weekly summaries
- **Goal-setting collaboration** tools

## 📝 Tips for Success

### For Parents:
- **Review daily notes together** - discuss the day's achievements
- **Celebrate milestones** - acknowledge streak achievements and tier upgrades
- **Be consistent** - help maintain daily logging routine
- **Adjust as needed** - modify point values based on effort and difficulty
- **Use weekly reflections** - build communication and goal-setting skills
### For Kids:
- **Check progress daily** - stay motivated by seeing advancement
- **Plan point strategies** - think about which tasks to prioritize
- **Communicate challenges** - discuss difficulties during weekly reviews
- **Celebrate achievements** - enjoy the rewards and recognition
### System Maintenance:
- **Weekly backups** - Copy vault folder regularly
- **Monitor file organization** - Keep daily notes in proper folders
- **Update goals periodically** - Adjust targets as skills improve
- **Archive completed goals** - Keep motivation high with new challenges

## 🔄 Version History & Updates
This system is designed to be:
- **Self-contained** - All dependencies included
- **Customizable** - Easy to modify without breaking functionality
- **Scalable** - Can grow with changing needs and goals
- **Educational** - Teaches responsibility, goal-setting, and self-reflection

## 📚 Plugin Documentation & Resources
This vault uses several powerful Obsidian plugins. Below are links intended to provide additional resources:
[Templater](https://silentvoid13.github.io/Templater/introduction.html)
[Meta-Bind](https://www.moritzjung.dev/obsidian-meta-bind-plugin-docs/)
	Related: [JS-Engine](https://www.moritzjung.dev/obsidian-js-engine-plugin-docs/)
[Dataview](https://blacksmithgu.github.io/obsidian-dataview/)
[Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes)
### Core Plugins Used:
- **[Templater](https://silentvoid13.github.io/Templater/)** - Dynamic note templates and automation
  - Used for: Daily/weekly note creation, dynamic dates, user functions
  - Settings: Template folder, script folder configuration
- **[Meta-Bind](https://www.moritzjung.dev/obsidian-meta-bind-plugin-docs/)** - Interactive buttons and progress bars  
  - Used for: Point increment/decrement buttons, progress visualization
  - Settings: JavaScript execution, button styling
- **[Dataview](https://blacksmithgu.github.io/obsidian-dataview/)** - Live data queries and tables
  - Used for: Dashboard tables, progress tracking, weekly summaries
  - Settings: Inline queries, JavaScript queries enabled
- **[Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes)** - Automated daily/weekly note creation
  - Used for: Creating daily and weekly notes from templates
  - Settings: Daily/weekly note configuration, template paths
- **[DB Folder](https://rafaelgb.github.io/obsidian-db-folder/)** - Enhanced folder organization (Optional)
  - Used for: Better organization of daily notes folder
  - Settings: Folder database configuration
### Additional Resources:
- **[Obsidian Help](https://help.obsidian.md/)** - Official Obsidian documentation
- **[YAML Frontmatter](https://yaml.org/spec/1.2.2/)** - Understanding note metadata
- **[Markdown Guide](https://www.markdownguide.org/)** - Markdown syntax reference

## 📞 Support
If you need help customizing the system:
1. **Check troubleshooting section** above
2. **Review Obsidian plugin documentation** for advanced features
3. **Modify gradually** - test small changes before major updates
4. **Keep backups** - Always save working versions before experimenting

---
**Happy tracking! 🎉 May all your goals be achieved through consistent effort and positive habits!**
