---
date: <% tp.date.now("YYYY-MM-DD") %>
day_of_week: <% tp.date.now("dddd") %>
week_number: <% tp.date.now("w") %>
year: <% tp.date.now("YYYY") %>
Points: 20
Daily_Logged: false
Day_Tier: ""
Current_Streak_Type: ""
Current_Streak_Count: 0
Bonus_Points_Applied: 0
Total_Progress: 0
# Goal Configuration
goals:
  small_treat:
    name: "Ice Cream Sundae"
    points: 150
    achieved: false
    date_achieved: ""
  medium_reward:
    name: "New Art Supplies"
    points: 350
    achieved: false
    date_achieved: ""
  big_goal:
    name: "Roller Blades"
    points: 650
    achieved: false
    date_achieved: ""
  ultimate_prize:
    name: "Special Day Out"
    points: 1000
    achieved: false
    date_achieved: ""
---
# <% tp.file.title %>
---
**Controls:** `BUTTON[count-down-two, count-down-one, count-reset, count-up-one, count-up-two]`  ||  **Update Progress:** `BUTTON[update-progress]`  ||  **End Day:** `BUTTON[log-day]`
```meta-bind-button
label: "3"
icon: circle-plus
hidden: true
id: "add-3"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "x + 3"
```
```meta-bind-button
label: "4"
icon: circle-plus
hidden: true
id: "add-4"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "x + 4"
```
```meta-bind-button
label: "5"
icon: circle-plus
hidden: true
id: "add-5"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "x + 5"
```
```meta-bind-button
label: "6"
icon: circle-plus
hidden: true 
id: "add-6"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "x + 6"
```
```meta-bind-button
label: "8"
icon: circle-plus
hidden: true
id: "add-8"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "x + 8"
```
```meta-bind-button
label: "10"
icon: circle-plus
hidden: true
id: "add-10"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "x + 10"
```
```meta-bind-button
label: "2"
icon: circle-plus
hidden: true
id: "count-up-two"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "x + 2"
```
```meta-bind-button
label: "1"
icon: circle-plus
hidden: true
id: "count-up-one"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "x + 1"
```
```meta-bind-button
label: "1"
icon: circle-minus
hidden: true
id: "count-down-one"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "Math.max(0, x - 1)"
```
```meta-bind-button
label: "2"
icon: circle-minus
hidden: true
id: "count-down-two"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "Math.max(0, x - 2)"
```
```meta-bind-button
label: "3"
icon: circle-minus
hidden: true
id: "subtract-3"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: true
    value: "Math.max(0, x - 3)"
```
```meta-bind-button
label: "Reset"
hidden: true
id: "count-reset"
style: default
actions:
  - type: updateMetadata
    bindTarget: Points
    evaluate: false
    value: 20
```
```meta-bind-button
label: "Update Progress"
icon: "refresh-cw"
hidden: true
id: "update-progress"
style: primary
actions:
  - type: js
    file: "Scripts/updateProgress.js"
```
```meta-bind-button
label: "Log Day"
icon: "save"
hidden: true
id: "log-day"
style: primary
actions:
  - type: js
    file: "Scripts/logDailyPointsWithGoals.js"
```

# 🌞 Daily Points: `VIEW[{Points}]`
**<% tp.date.now("dddd, MMMM Do, YYYY") %>**

## 🎯 **Goal Progress**
**Current Total Progress: `VIEW[{Total_Progress}]`**
```meta-bind
INPUT[progressBar(minValue(0), maxValue(150), addLabels(true), title(🍦 Ice Cream)):Total_Progress]
````
Progress: `VIEW[{Total_Progress}]` / 150 points
```meta-bind
INPUT[progressBar(minValue(0), maxValue(350), addLabels(true), title(🎨 Art Supplies)):Total_Progress]
```
Progress: `VIEW[{Total_Progress}]` / 350 points
```meta-bind
INPUT[progressBar(minValue(0), maxValue(650), addLabels(true), title(🛼 Roller Blades)):Total_Progress]
```
Progress: `VIEW[{Total_Progress}]` / 650 points
```meta-bind
INPUT[progressBar(minValue(0), maxValue(1000), addLabels(true), title(🎉 Special Day)):Total_Progress]
```
Progress: `VIEW[{Total_Progress}]` / 1000 points

---
**Day Tier:** `VIEW[{Day_Tier}]`  ||  **Current Streak:** `VIEW[{Current_Streak_Type}]` - `VIEW[{Current_Streak_Count}]` **days**  ||  **Bonus Points Today:** `VIEW[{Bonus_Points_Applied}]`

---
## 💰Point Tasks
- [ ] **Dusting** `BUTTON[add-3]`
- [ ] **Cleaning Tables** `BUTTON[add-3]`
- [ ] **Taking Out Trash** `BUTTON[add-4]`
- [ ] **Cleaning Litter Boxes** `BUTTON[add-5]`
- [ ] **Doing Dishes (put away)** `BUTTON[add-5]`
- [ ] **Vacuuming Carpet** `BUTTON[add-6]`
- [ ] **Cleaning Bathrooms** `BUTTON[add-8]`
- [ ] **Cleaning Bedroom (properly)** `BUTTON[add-6]`
- [ ] **Doing Laundry (Wash, Dry, Put Away)** `BUTTON[add-10]`

---
## 🥳 Good Attitude and Small Tasks
- [ ] **Feed Pets (Cats)** `BUTTON[count-up-two]`
- [ ] **Feed Pets (Dogs)** `BUTTON[count-up-two]`
- [ ] **No Arguing** `BUTTON[count-up-two]`
- [ ] **Good Manners** `BUTTON[count-up-one, count-up-two]`
- [ ] **Clean up messes (without being asked)** `BUTTON[add-3]`

---
## 😟 Point Losses
- [ ] **Whining/Disobeying** `BUTTON[count-down-one]`
- [ ] **Arguing** `BUTTON[count-down-two]`
- [ ] **Fighting/Yelling with sister** `BUTTON[subtract-3]`

