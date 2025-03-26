import React from 'react'
import ForgetPasswordPage from "@/pages/ForgetPassword";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: {
        absolute: "Forget Password"
    },
};
function ForgetPassword() {
    return (
        <>
            <ForgetPasswordPage />
        </>
    )
}

export default ForgetPassword
