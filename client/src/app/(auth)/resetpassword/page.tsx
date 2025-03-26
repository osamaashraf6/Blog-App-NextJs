import React from 'react'
import ResetPasswordPage from '@/pages/ResetPassword'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: {
        absolute: "Reset Password"
    },
};
function ResetPassword() {
    return (
        <>
            <ResetPasswordPage />
        </>
    )
}

export default ResetPassword
