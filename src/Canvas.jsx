import React, { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimages"; // importing 149 images
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas() {
  const [index, setIndex] = useState({ value: 0 }); // the useState hook indicates which image to be shown
  const canvasRef = useRef(null);

  useGSAP(() => {
    gsap.to(index, {
      value: 149,
      duration: 3,
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
    const canvas = canvasRef.current; // fetches the canvas element using useRef hook so that we can work on it
    const ctx = canvas.getContext("2d"); // ctx is a drawing tool
    const img = new Image(); // creates new instance of Image object
    img.src = canvasImages[index.value]; // changes the image according to the index and the index is changed by gsap
    img.onload = () => {
      // the height and width of canvas is equal to the height and width of the image
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0); // draw the image and 0,0 indicates the position of it
    };
  }, [index]); // when the gsap changes the value of index, the useEffect hook runs and it is because useEffect has index as dependencies

  return (
    <canvas
      ref={canvasRef}
      className="w-[18rem] h-[18rem]"
      id="canvas"
    ></canvas>
  );
}

export default Canvas;
