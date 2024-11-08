"use client";
import { Provider } from "react-redux";
import Demo from "./ElProComponents/Demo/demo";
import NavTo from "./ElProComponents/NavigationComponent/navTo";
import store from "./Redux/store/store";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <NavTo location="Order/New">New</NavTo>
        <Demo></Demo>
      </Provider>
    </>
  );
}
