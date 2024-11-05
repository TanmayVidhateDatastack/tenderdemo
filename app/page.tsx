"use client";
import React from "react";
import PopUpContext, { displaycontext,handlerblur } from "./Components/dscontext/dscontext";

export default function Home() {
  const contextMenuId = "context-display"; 
  const containerId = "context-container"; 
 

  return (
    <div id={containerId} style={{ position: "relative", width: "100%", height: "100%" }}>
      <PopUpContext id={contextMenuId} containerId={containerId} alignment="center" />

      {/* Button at Top Left */}
      <button
        onClick={(e) => displaycontext(e, contextMenuId, containerId, "center")}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "150px",
          height: "50px",
        }}
        onBlur={() => handlerblur(contextMenuId)}
      >
     
      </button>
    </div>
  );
}
