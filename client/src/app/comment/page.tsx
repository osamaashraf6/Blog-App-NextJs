import React from 'react'
import CommentPage from '@/padges/Comment'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: {
        absolute: "Comment"
    },
};
function Comment() {

    return (
        <>
            <CommentPage />
        </>
    )
}

export default Comment
