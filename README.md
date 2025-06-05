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
1. **Download and extract** the vault folder
2. **"Open folder as vault"** → Select the extracted folder
3. **Trust author and enable plugins** when prompted
4. Customize goals by editing the daily note templates (single goal or tiered)
    - **Edit the goal** in daily note templates if needed (default: 650 points for roller blades as this was the goal in our case)
    - Point values can also be **modified** within the daily templates by editing the button configurations and list values
### Tracking Points
1. **Create daily note**: two methods
    - Use Command Palette → "Periodic Notes: Open daily note"
    - Disable Daily Notes **Core Plugin** and use *Open Today* in the ribbon menu (Hidden by default)
2. Buttons are placed next to each item and can be used to add or subtract points throughout the day as tasks are completed.
    - For unlisted items that warrant point addition or losses, the generic controls located at the top of the page can be used
4. **End of day**: Click "Log Day" button to finalize and calculate bonuses
5. **Weekly review**: Use Command Palette → "Periodic Notes: Open weekly note" on Sundays (or whatever day has been designated as the end of the week)
---
## Vault Structure
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
---
## 🎯 Point System Overview
### Daily Tiers (values can be adjusted to meet individual needs):
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
---
## 🔧 Customization Guide

### Changing the Main Goal

#### Option 1: Simple Goal Change
1. **Open** `Templates/Daily Note Template.md`
    - find the progress bar section and change the `maxValue(650)` to the desired point total
    - **Update** the goal name in the template (change "🛼 Roller Blades" to your reward)
#### Option 2: Multiple Goals (Advanced)
1. **Open** `Templates/Tiered - Daily Note Template.md`
    - **Replace** the frontmatter in daily template with multi-goal structure (must be done in source mode)
    - **Customize** Goal names, point values, and rewards in the frontmatter
        - **Note**: The point structure is already present so best practice would be to only modify names and values. If others are added, copy existing ones as templates
---
### Modifying Point Values

1. **Open**: `Templates/Daily Note Template.md`
2. **Find**: The intended point section (Point Tasks, Good Attitude, Point Loss) and edit the button values and descriptions    
    ```markdown
    - [ ] **Dusting** `BUTTON[add-3]` (3 points)
    ```
    - Update the description text as needed
    - **Note**: If a value is needed and there is no button with the desired amount, it will requre the addition of a new button. Functionality is described in the next section.
---
### Adding New Buttons:
1. Button configurations are located directly beneath the *Controls* options at the top of each note template. These are best viewed in source mode, as they are hidden by default.
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
---
## 📊 Monitoring Progress

### Dashboards
- **Location**: `Dashboards/` folder
#### Progress Report Dashboards
- For single goal: `Dashboards/Single Goal Progress Report.md` - Complete progress overview
- For multiple goals: `Dashboards/Multi-Goal Progress Report.md` - Complete progress overview
- **Weekly Overview**: `Dashboards/Weekly Overview.md` - Weekly performance summary
- **Achievement History**: `Dashboards/Achievement History.md` - Long-term tracking
- **Updates**: Automatically as days are logged. Each progress report dashboard maintains a log of the previous 14 daily notes
--- 
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
- If templates are not called on note creation:
    - **Enable**: *Trigger Templater on new file creation* and *Folder Templates*
    - **Add**: Template path and Folder path as folder templates
#### Periodic Notes:
- **Daily Notes**: Enabled, folder `Daily Notes/`, template `Templates/Daily Note Template.md`
- **Weekly Notes**: Enabled, folder `Weekly Summaries/`, template `Templates/Weekly Summary Template.md`
#### Meta-Bind:
- **JavaScript**: Enabled
- **Files referenced**: Relative to vault root in `Scripts/` folder
---
## 📝 Useful Tips

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
---
## 📚 Plugin Documentation
This vault uses several powerful Obsidian plugins. Below are links intended to provide additional resources:
- **[Templater](https://silentvoid13.github.io/Templater/)** - Dynamic note templates and automation
  - Used for: Daily/weekly note creation, dynamic dates, user functions
  - Settings: Template folder, script folder configuration
- **[Meta-Bind](https://www.moritzjung.dev/obsidian-meta-bind-plugin-docs/)** - Interactive buttons and progress bars  
  - Used for: Point increment/decrement buttons, progress visualization
  - Settings: JavaScript execution, button styling
- **[JS-Engine](https://www.moritzjung.dev/obsidian-js-engine-plugin-docs/)** - Javascript functionality
  - Ties directly to Meta-Bind
  - Used to call Javascript functions with buttons
- **[Dataview](https://blacksmithgu.github.io/obsidian-dataview/)** - Live data queries and tables
  - Used for: Dashboard tables, progress tracking, weekly summaries
  - Settings: Inline queries, JavaScript queries enabled
- **[Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes)** - Automated daily/weekly note creation
  - Used for: Creating daily and weekly notes from templates
  - Settings: Daily/weekly note configuration, template paths
- **[DB Folder](https://rafaelgb.github.io/obsidian-db-folder/)** - Enhanced folder organization (Optional)
  - Used for: Better organization of daily notes folder
  - Settings: Folder database configuration
---
## Additional Resources:
- **[Obsidian Help](https://help.obsidian.md/)** - Official Obsidian documentation
- **[YAML Frontmatter](https://yaml.org/spec/1.2.2/)** - Understanding note metadata
- **[Markdown Guide](https://www.markdownguide.org/)** - Markdown syntax reference
---
## 📞 Support
### Bugs
- Create new issue - Add **Bug** label
    - Provide a description of the issue, including what note is affected and when it occurs
    - Error messages produced
    - Output of the developer console
    - Any additional information or attachments
### Additional Features
- Create new issue - Add **Enhancement** label
    - Provide a thorough description of the desired feature
    - Any additional information or attachments
---
**Happy tracking! 🎉 May all your goals be achieved through consistent effort and positive habits!**
