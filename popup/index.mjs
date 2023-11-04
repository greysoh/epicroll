import { importImageToCanvas } from "../libs/export.mjs";
const canvas = document.getElementById("canvas");

window.addEventListener("message", (msg) => {
  importImageToCanvas(canvas, msg.data);
});