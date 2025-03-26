import React from 'react'
import SavedPage from '@/pages/Saved'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: {
        absolute: "Saved"
    },
};
function Saved() {

    return (
        <>
            <SavedPage />
        </>
    )
}

export default Saved
