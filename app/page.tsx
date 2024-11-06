"use client";
import React from "react";
import ContextMenu, { closecontext, displaycontext } from "./Components/dscontext/dscontext";

export default function Home() {
  //
  return (
    <div id={containerId} style={{ position: "relative", width: "100%", height: "100%" }}>
      <ContextMenu id={contextMenuId} containerId={containerId} alignment="center" position ="horizontal"content="kalyani deshmukh"/>

      {/* Button at Top Left */}
      <button
        onClick={(e) => displaycontext(e, contextMenuId, containerId, "horizontal","center")}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "150px",
          height: "50px",
        }}
        onBlur={() =>closecontext(contextMenuId)}
      >
     
      </button>
    </div>
  );
}
