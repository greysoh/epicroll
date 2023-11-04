export function exportCanvasAsImage(canvas) {
  return canvas.toDataURL('image/png');
}

export function importImageToCanvas(canvas, imageURL) {
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  };

  img.src = imageURL;
}