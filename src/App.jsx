import React, { useEffect } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll"; // for smooth scrolling

const App = () => {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <>
      {/* if we map the data then all the arrays will be mapped, 
        so we need to map the data's index again to get the info of the canvas i.e. to maps the objects
        but it will again map all the objects of all arrays so to load the cavas of only first page we mapped data[0] */}
      <div className="w-full relative min-h-screen">
        {data[0].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}
      </div>
      <div className="w-full relative min-h-screen">
        {data[1].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}
      </div>
      <div className="w-full relative min-h-screen">
        {data[2].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}
      </div>
    </>
  );
};

export default App;
