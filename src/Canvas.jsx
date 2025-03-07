import React, { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimages"; // importing 149 images
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details; // destructured, we can use details.startIndex too in the below codes

  const [index, setIndex] = useState({ value: startIndex }); // the useState hook indicates which image to be shown
  const canvasRef = useRef(null);

  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1, // unlimited animation
      ease: "linear",
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) }); // round offs the value onUpdate
      },

      // onUpdate is a property of gsap, it is a callback function
      // it runs continuously through the animation, whenever gsap updates the value
    });
  });

  useEffect(() => {
    // console.log(canvasimages); // check if the image is loading or not
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current; // fetches the canvas element using useRef hook so that we can work on it
    const ctx = canvas.getContext("2d"); // getContext let us perform drawing operation on the canvas in 2D environment, it we does use this, canvas would just be empty space without any drawing
    const img = new Image(); // creates new instance of Image object
    img.src = canvasImages[index.value]; // changes the image according to the index and the index is changed by gsap
    img.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight); // draw the image and 0,0 indicates the position of it
    };
  }, [index]); // when the gsap changes the value of index, the useEffect hook runs and it is because useEffect has index as dependencies

  return (
    <canvas
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size * 1.4}px`,
        height: `${size * 1.4}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: `${zIndex}`,
      }}
      id="canvas" // the id doesn't have any use, the canvas of useEffect and this is different
    ></canvas>
  );
}

export default Canvas;
