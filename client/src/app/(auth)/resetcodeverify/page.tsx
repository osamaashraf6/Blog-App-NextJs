import React from 'react'
import ResetCodeVerifyPage from '@/padges/ResetCodeVerify'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: {
        absolute: "Reset Code Verify"
    },
};
function ResetCodeVerify() {
    return (
        <>
            <ResetCodeVerifyPage />
        </>
    )
}

export default ResetCodeVerify
