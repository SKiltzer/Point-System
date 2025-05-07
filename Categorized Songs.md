## Dark & Aggressive EDM
```dataview
TABLE WITHOUT ID
	Songs.Title AS Title,
	Songs.Artist AS Artist,
	Songs.Song_Id AS ID,
    Songs.Tags.Sound AS Sound,
    Songs.Tags.Genre AS Genre
FROM "Game/Geometry Dash/Songs/Song Database"
WHERE elink("Songs.Link", "Songs.Title")
```


