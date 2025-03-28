import React from 'react'
import SavedPage from '@/padges/Saved'
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
