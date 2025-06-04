# Progress Summary

## 🎯 All Goals Overview
```dataview
TABLE WITHOUT ID
    goals.ice_cream.name as "🍦 Reward",
    goals.ice_cream.points as "Points Needed",
    goals.ice_cream.achieved as "✅ Achieved",
    goals.ice_cream.date_achieved as "Date Achieved"
FROM "Daily Notes"
WHERE goals.ice_cream
LIMIT 1
```
```dataview
TABLE WITHOUT ID
    ("Current Progress") as "Status",
    (sum(rows.Points) + sum(rows.Bonus_Points_Applied)) as "Total Points",
    (round(((sum(rows.Points) + sum(rows.Bonus_Points_Applied)) / 1500) * 100, 1) + "%") as "Ultimate Goal %"
FROM "Daily Notes"  
WHERE Daily_Logged = true
```
## 📊 Weekly Performance
```dataview
TABLE 
    week_number as "Week #",
    length(rows) as "Days Logged",
    sum(rows.Points) as "Base Points",
    sum(rows.Bonus_Points_Applied) as "Bonus Points",
    (sum(rows.Points) + sum(rows.Bonus_Points_Applied)) as "Week Total",
    length(filter(rows, (x) => x.Day_Tier = "Rockstar Day")) as "🌟 Rockstar",
    length(filter(rows, (x) => x.Day_Tier = "Great Day")) as "⭐ Great",
    length(filter(rows, (x) => x.Day_Tier = "Solid Day")) as "✅ Solid",
    length(filter(rows, (x) => x.Day_Tier = "Needs Work")) as "⚠️ Needs Work"
FROM "Daily Notes"
WHERE Daily_Logged = true
GROUP BY week_number
SORT week_number DESC
```

## 📈 Daily Breakdown (Last 14 Days)
```dataview
TABLE 
    file.name as "Date",
    day_of_week as "Day",
    Points as "Daily Points",
    Bonus_Points_Applied as "Bonus",
    (Points + Bonus_Points_Applied) as "Total",
    Day_Tier as "Tier",
    Current_Streak_Type as "Streak Type",
    Current_Streak_Count as "Streak Count"
FROM "Daily Notes"
WHERE Daily_Logged = true
SORT file.name DESC
LIMIT 14
```
## 🏆 Best Performing Days
```dataview
TABLE 
    file.name as "Date",
    (Points + Bonus_Points_Applied) as "Total Points",
    Day_Tier as "Tier",
    Bonus_Points_Applied as "Bonus Earned"
FROM "Daily Notes"
WHERE Daily_Logged = true AND (Points + Bonus_Points_Applied) >= 25
SORT (Points + Bonus_Points_Applied) DESC
```
## 🔥 Current Stats Summary
```dataview
TABLE WITHOUT ID
    ("📊 **Statistics**") as "Stat Type",
    length(rows) as "Value"
FROM "Daily Notes"
WHERE Daily_Logged = true
```
```dataview
TABLE WITHOUT ID
    ("Total Base Points") as "Stat",
    sum(Points) as "Value"
FROM "Daily Notes"
WHERE Daily_Logged = true
```
```dataview
TABLE WITHOUT ID
    ("Total Bonus Points") as "Stat",
    sum(Bonus_Points_Applied) as "Value"
FROM "Daily Notes"
WHERE Daily_Logged = true
```
```dataview
TABLE WITHOUT ID
    ("Average Daily Points") as "Stat",
    round(sum(Points) / length(rows), 1) as "Value"
FROM "Daily Notes"
WHERE Daily_Logged = true
```
## 🍬 Weekly Summaries
```dataview
LIST
FROM "Weekly Summaries"
WHERE file.name != null
SORT file.name DESC
```
## 📅 This Week's Progress
```dataview
TABLE 
    file.name as "Date",
    day_of_week as "Day",
    Points as "Points",
    Day_Tier as "Tier",
    Bonus_Points_Applied as "Bonus"
FROM "Daily Notes"
WHERE Daily_Logged = true AND week_number = 23
SORT file.name ASC
```

> Dashboard updates automatically as daily notes are logged
