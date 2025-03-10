import React, { use, useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll"; // for smooth scrolling
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
// we need to register the plugin to use scrollTrigger in the code else it will not work

const App = () => {
  const [showCanvas, setShowCanvas] = useState(false);

  const headingRef = useRef(null);
  const growingSpanRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll(); // make the scrolling smooth
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpanRef.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(".text-white", {
            color: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpanRef.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpanRef.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });

          gsap.to(cursorRef.current, {
            backgroundColor: "white",
            ease: "power2.inOut",
          });
        } else {
          gsap.to("body", {
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(".text-white", {
            color: "#fff",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(cursorRef.current, {
            backgroundColor: "red",
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingRef.current;
    if (headingElement) {
      headingElement.addEventListener("click", handleClick);

      // Clean up event listener on unmount
      return () => headingElement.removeEventListener("click", handleClick);
    }
  }, []);

  useGSAP(() => {
    window.addEventListener("mousemove", (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 1,
        ease: "power2.out",
        opacity: 1,
      });
    });

    headingRef.current.addEventListener("mouseenter", () => {
      gsap.to(cursorRef.current, {
        scale: 5,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    headingRef.current.addEventListener("mouseleave", () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.4,
      });
    });
  });

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(headingRef.current, {
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: "power2.inOut",
    });

    tl.from(
      ".textcontainer div h3, .textcontainer div p",
      {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.5"
    );

    tl.from(
      ".links, .brand",
      {
        y: -30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.7"
    );
  });

  useGSAP(() => {
    var tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".section2",
        scroller: "body",
        start: "top 50%",
        end: "top 0%",
        scrub: 1.5,
        // markers: true,
      },
    });
    tl2
      .from(".section2 div h1", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        ".section2 div h3",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".section2 div p",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      );
  });

  return (
    <>
      <div
        ref={cursorRef}
        className="customcursor bg-red-500 h-5 w-5 rounded-full fixed opacity-0"
      ></div>
      <span
        ref={growingSpanRef}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>

      {/* if we map the data then all the arrays will be mapped, 
        so we need to map the data's index again to get the info of the canvas i.e. to maps the objects
        but it will again map all the objects of all arrays so to load the cavas of only first page we mapped data[0] */}
      <div className="w-full relative min-h-screen font-['Helvetica'] border-[0.1px] border-black">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)}

        <div className="w-full h-screen relative z-[0] text-white">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-regular cursor-pointer">
              Thirtysixstudios
            </div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  className="text-md cursor-pointer relative pb-[5px] after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[3px] after:bg-black after:transition-all after:duration-300 after:ease-in-out after:-translate-x-1/2 hover:after:w-full"
                >
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
            <h1
              ref={headingRef}
              className="text-[18.5rem] font-regular pl-5 leading-none"
            >
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>

      <div className="section2 w-full h-screen border-[0.1px] border-black flex relative">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <div className="w-[50%] h-full z-[0]">
          <h1 className="text-[20px] text-white top-23 left-128 relative">
            01 --- WHAT WE DO
          </h1>
        </div>
        <div className="w-[50%] h-full">
          <h3 className="text-white text-4xl font-light leading-[1.2] pt-23 pl-48 w-[60%]">
            We aim to elevate digital production in the advertising space,
            bringing your ideas to life.
          </h3>
          <p className="text-white  font-light leading-[1.2] pt-50 pl-48 w-[67%]">
            As a contemporary studio, we use cutting-edge design practices and
            the latest technologies to deliver current digital work.
          </p>
          <p className="text-white  font-light leading-[1.2] pl-48 pt-3 w-[67%]">
            Our commitment to innovation and simplicity, paired with our agile
            approach, ensures your journey with us is smooth and enjoyable from
            start to finish.
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
