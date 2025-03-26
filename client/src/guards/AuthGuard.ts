"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/login");
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  return children;
}
export default AuthGuard;
