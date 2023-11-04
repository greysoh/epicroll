import { exportCanvasAsImage } from "./libs/export.mjs";
import { renderRickRoll } from "./libs/rickroller.mjs";
import { render3DCube } from "./libs/3dcube.mjs";

// This function made me die inside using ChatGPT
const sizeFactor = 200;

function splitCanvasRev2(canvas, width, height) {
  debugger;

  const chunks = [];

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  let x = 0;
  let y = 0;

  while (true) {
    if (y+(sizeFactor*2) >= canvasWidth) {
      x += sizeFactor;
      y = 0;
    }
  
    if (x+(sizeFactor*2) >= canvasHeight) break;
    y += sizeFactor;

    const chunk = document.createElement('canvas');
    const chunkCtx = chunk.getContext('2d');

    chunk.width = width;
    chunk.height = height;

    chunkCtx.drawImage(canvas, y, x, width, height, 0, 0, width, height);
    chunks.push({
      x,
      y,
      chunk
    })
  }

  return chunks;
}

let x = 0;
let y = 0;

async function init() {
  const canvas = document.createElement("canvas");
  canvas.width = screen.width;
  canvas.height = screen.height;

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const loopyFruits = renderRickRoll(ctx, canvas.width, canvas.height);

  const windows = [];

  while (true) {
    if (y+(sizeFactor*2) >= screen.width) {
      x += sizeFactor;
      y = 0;
    }
  
    if (x+(sizeFactor*2) >= screen.height) {
      break;
    }
  
    y += sizeFactor;
  
    const win = window.open("/popup", "_blank", `height=${sizeFactor}, width=${sizeFactor}, top=${x}, left=${y}`);
    windows.push({
      win,
      x,
      y
    });

    await new Promise((i) => setTimeout(i, 100));
  }

  console.log("Beginning loopyfruits...");
  x = 0;
  y = 0;

  loopyFruits.play();

  while (true) {
    const chunks = splitCanvasRev2(canvas, sizeFactor, sizeFactor);
    x = 0;
    y = 0;

    let activeIter = -1;

    while (true) {
      if (y+(sizeFactor*2) >= screen.width) {
        x += sizeFactor;
        y = 0;
      }
    
      if (x+(sizeFactor*2) >= screen.height) {
        break;
      }
    
      y += sizeFactor;
      activeIter++;

      const activeWindow = windows.find((i) => i.x == x && i.y == y);

      activeWindow.win.postMessage(exportCanvasAsImage(chunks[activeIter].chunk));
      await new Promise((i) => setTimeout(i, 1));
    }

    await new Promise((i) => setTimeout(i, 10));
  }
}

const btn = document.getElementById("videoplayer_init");
btn.addEventListener("click", () => init());