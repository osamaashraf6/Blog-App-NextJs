import React from 'react'
import { Metadata } from 'next';
import LikePage from '@/padges/Like';
export const metadata: Metadata = {
    title: {
        absolute: "Like"
    },
};
function Like() {


    return (
        <>
            <LikePage />
        </>
    )
}

export default Like
