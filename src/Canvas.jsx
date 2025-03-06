import React, { useEffect, useRef } from "react";
import canvasimages from "./canvasimages";

const Canvas = () => {
  const canvasRef = useRef(null);
  const ctx = canvas.getContext("2d"); // ctx is a drawing tool
  const img = new Image[0]();
  img.onload = () => {
    // the height and width of canvas is equal to the height and width of the image
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0); // draw the image
  };

  useEffect(() => {
    console.log(canvasimages);
  });

  return (
    <canvas
      ref={canvasRef}
      className="w-[18rem] h-[18rem]"
      id="canvas"
    ></canvas>
  );
};

export default Canvas;
