import RegisterPage from '@/pages/Register';
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: {
        absolute: "Register"
    },
};
function Register() {
    return (
        <>
            <RegisterPage />
        </>
    )
}

export default Register
