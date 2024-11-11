"use client";
import Demo from "./ElProComponents/Demo/demo";
import NavTo from "./ElProComponents/NavigationComponent/navTo";

export default function Home() {
  return (
    <>
        <NavTo location="Order/New">New</NavTo>
        <Demo></Demo>
    </>
  );
}
