import React from 'react'
import ArchivePage from '@/pages/Archive'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: {
        absolute: "Archive"
    },
};
function Archive() {
    return (
        <>
            <ArchivePage />
        </>
    )
}

export default Archive
