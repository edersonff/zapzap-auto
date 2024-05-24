"use client";

// @ts-ignore
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";

import { useEffect } from "react";

export default function WorldMap() {
  useEffect(() => {
    new jsVectorMap({
      selector: "#map",
      map: "world",
    });
  }, []);

  return (
    <div className="bg-gray-100 h-[500px]">
      <div id={"map"}></div>
    </div>
  );
}
