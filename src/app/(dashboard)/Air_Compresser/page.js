"use client";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const imageRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 1500, height: 1000 }); // Default dimensions

  // const areas = [
  //   {
  //     coords: "760,400,850,470",//left,top,right,bottom
  //     href: "/solar_detail?val=S_1",
  //     alt: "Solar Detail S_1",
  //     style: { backgroundColor: "rgba(0, 0, 255, 0.3)" }, // Blue semi-transparent rectangle
  //   },
  //   {
  //     coords: "780,530,840,590",
  //     href: "/solar_detail?val=S_2",
  //     alt: "Solar Detail S_2",
  //     style: { backgroundColor: "rgba(0, 255, 0, 0.3)" }, // Green semi-transparent rectangle
  //   },
  //   {
  //     coords: "1180,220,1320,300",
  //     href: "/oneline?id=T_2",
  //     alt: "Oneline T_2",
  //     style: { backgroundColor: "rgba(255, 0, 0, 0.3)" }, // Red semi-transparent rectangle
  //   },
  // ];

  useEffect(() => {
    // Wait for the image to load to calculate its natural dimensions
    const imageElement = imageRef.current;
    if (imageElement) {
      const handleImageLoad = () => {
        setImageSize({
          width: imageElement.naturalWidth || 1500,
          height: imageElement.naturalHeight || 1000,
        });
      };
      imageElement.addEventListener("load", handleImageLoad);

      return () => {
        imageElement.removeEventListener("load", handleImageLoad);
      };
    }
  }, []);

  return (
    <div className="flex-shrink-0 w-full p-6 h-[85vh] rounded-[8px] bg-[#f2f2f2] border-2 border-[grey] border-t-[4px] border-t-[#1d5999] relative">
      <h1 className="text-lg font-bold text-gray-700 mb-4">Air Compresser Diagram</h1>

      {/* Image Section */}
      <div
       className="relative w-[1500px] h-[800px]"
        style={{
          width: "100%",
          height: "75vh",
          overflowX: "auto", // Enable horizontal scrolling
          overflowY: "hidden", // Disable vertical scrolling
        }}
      >
        {/* Container for the image */}
        <div
          style={{
            width: "1500px", // Set the width of the image container
            height: "1000px", // Set the height of the image container
            position: "relative", // Ensure the map regions are relative to this container
            marginTop: "-150px"
          }}
        >
          <img
            ref={imageRef}
            src="fm.png" // Replace with your image path
            alt="Oneline Diagram"
            useMap="#workmap3" // Reference the map name
            style={{
              objectFit: "contain", // Ensure the image scales properly
              width: "100%", // Adjust the width to fit the container
              height: "100%", // Adjust the height to fit the container
              position: "absolute", // Ensure the clickable regions align with the image
            }}
          />

          {/* Debug rectangles for areas */}
          {/* {areas.map((area, index) => {
            const [x1, y1, x2, y2] = area.coords.split(",").map(Number);

            return (
              <a
                key={index}
                href={area.href}
                style={{
                  position: "absolute",
                  left: `${x1}px`,
                  top: `${y1}px`,
                  width: `${x2 - x1}px`,
                  height: `${y2 - y1}px`,
                  ...area.style, // Apply rectangle-specific styles (color and transparency)
                  border: "1px solid black", // Add a black border for better visibility
                }}
                title={area.alt} // Tooltip for better debugging
              />
            );
          })} */}

          {/* Map for clickable areas */}
          <map name="workmap3">
          <area
    shape="rect"
    coords="760,400,850,470"
    style={{ cursor: "pointer" }}
    href="/log_detail3?val=F_1"
    alt="F_1 Data"
  />
  <area
    shape="rect"
    coords="780,530,840,590"
    style={{ cursor: "pointer" }}
    href="/log_detail3?val=F_2"
    alt="F_2 Data"
  />
            <area
              shape="rect"
              coords="1180,220,1320,300"
              style={{ cursor: "pointer" }}
              href="/Compresser"
              alt="Oneline T_2"
            />
          </map>
        </div>
      </div>
    </div>
  );
};

export default Page;
