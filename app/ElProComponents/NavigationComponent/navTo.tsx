"use client";
import DSButton from "../../Components/DsButton/DsButton";
import { useRouter } from "next/navigation";
import { NavProp } from "../types";

export default function NavTo({ location, children }: NavProp) {
  const router = useRouter();

  const goTo = () => {
    if (location) router.push(location); // Navigate forward to Given Page
  };

  return (
    <>
      <div>
        <DSButton handleOnClick={goTo}>
          {children ? children : location}
        </DSButton>
      </div>
    </>
  );
}
