"use client";

// src/hooks/useTodo.js
import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from "@/services/authService";

const useAuth = () => {
  const forgetPasswordMutation = useMutation({
    mutationFn: forgotPassword,
  });
  const resetCodeVerifyMutation = useMutation({
    mutationFn: verifyResetCode,
  });
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
  });

  return {
    forgetPasswordMutation,
    resetCodeVerifyMutation,
    resetPasswordMutation,
  };
};

export default useAuth;
