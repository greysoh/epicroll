# EpicRoll
Epicly own your friends with a rickroll using an army of windows
## Installation
Download any video (preferrably a rickroll) into `roller.webm`, probably using `yt-dlp`. Then, run an HTTP server.
## How?
It works by creating a main HTML5 canvas element set to the size of the screen to draw to, and I copy the video frames to it, then cut that up and send it to a bunch of 200x200 popups on the screen. It's not very fast but who cares?
## Caveats
This doesn't work (so far) on:
 - GNOME
 - Firefox (at stock settings, `about:config` settings required)
 - Safari