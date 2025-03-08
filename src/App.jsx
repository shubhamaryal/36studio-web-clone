import React, { useEffect } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll"; // for smooth scrolling

const App = () => {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []); // make the scrolling smooth

  return (
    <>
      {/* if we map the data then all the arrays will be mapped, 
        so we need to map the data's index again to get the info of the canvas i.e. to maps the objects
        but it will again map all the objects of all arrays so to load the cavas of only first page we mapped data[0] */}
      <div className="w-full relative min-h-screen font-['Helvetica']">
        {/* {data[0].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))} */}

        <div className="w-full h-screen text-white">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-regular">Thirtysixstudios</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a key={index} className="text-md hover:text-gray-300">
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer w-full px-[27%]">
            <div className="text-white w-[50%]">
              <h3 className="text-4xl font-light pt-2 leading-[1.2]">
                At Thirtysixstudio, we build digital assets and immersive
                experiences for purposeful brands.
              </h3>
              <p className="text-md w-1.5xl mt-10 font-light">
                We're a boutique production studio focused on design, animation,
                and technology, constantly rethinking what digital craft can do
                for present-day ads and campaigns.
              </p>
              <p className="text-md mt-10">Scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-10 left-0">
            <h1 className="text-[20.5rem] font-regular pl-5 leading-none">
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
