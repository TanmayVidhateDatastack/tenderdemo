"use client";
import DSButton from "../../Components/dsButton/dsButton";
import { useRouter } from "next/navigation";
import { NavProp } from "../types";

export default function NavRedirect({ location, children }: NavProp) {
  const router = useRouter();

  const goTo = () => {
    if (location) router.replace(location); // Navigate forward to Given Page
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
