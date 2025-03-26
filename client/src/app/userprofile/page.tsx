import React from 'react'
import UserProfilePage from '@/pages/UserProfile'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: {
        absolute: "User Profile"
    },
};
function UserProfile() {

    return (
        <>
            <UserProfilePage />
        </>
    )
}

export default UserProfile
