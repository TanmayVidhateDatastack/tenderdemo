import Demo from "@/app/Elements/ElProComponents/Demo/demo";
import NavTo from "@/app/Elements/ElProComponents/NavigationComponent/navTo";


export default function Home() {
  return (
    <>
     <NavTo location="Order/New">New</NavTo>
     <NavTo location="Order/Cancelation">Cancelation</NavTo>
     <NavTo location="Order/EwayBill">EwayBill</NavTo>
     <Demo></Demo>
    </>
  );
}
