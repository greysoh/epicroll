export function renderRickRoll(ctx, w, h) {
  const vid = document.createElement("video");
  vid.src = "/roller.webm";
  vid.controls = false;
  vid.muted = false;

  vid.addEventListener("play", function() {
    (function loop() {
      if (!vid.paused && !vid.ended) {
        ctx.drawImage(vid, 0, 0, w, h);
        setTimeout(loop, 1000 / 30);
      }
    })();
  });

  return vid;
}