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
