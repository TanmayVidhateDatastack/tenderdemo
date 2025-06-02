"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useAppDispatch } from "@/Redux/hook/hook"; // Adjust import as needed
import { setUserRole } from "@/Redux/slice/UserSlice/userSlice";

function UserRoleSetter() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const role = searchParams.get("role")?.toUpperCase() || "MAKER";
  useEffect(() => {
    dispatch(setUserRole(role));
  }, [role]);

  return null; // Or your component JSX
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserRoleSetter />
    </Suspense>
  );
}
