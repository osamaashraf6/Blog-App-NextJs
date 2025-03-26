import React from 'react'
import WritePage from '@/pages/Write'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: {
        absolute: "Write"
    },
};
function Write() {
    return (
        <>
            <WritePage />
        </>
    )
}

export default Write
