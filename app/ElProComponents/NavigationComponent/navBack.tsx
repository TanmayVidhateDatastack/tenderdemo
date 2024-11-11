"use client";
import DSButton from "../../Components/dsButton/DsButton";
import { useRouter } from "next/navigation";
import { NavProp } from "../types";

export default function NavBack({ children }: NavProp) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div>
        <DSButton handleOnClick={goBack}>{children}</DSButton>
      </div>
    </>
  );
}
