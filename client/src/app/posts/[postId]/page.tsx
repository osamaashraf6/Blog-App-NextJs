import React from 'react'
import PostPage from '@/pages/Post'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: {
        absolute: "Post"
    },
};
function Post() {
    return (
        <>
            <PostPage />
        </>
    )
}

export default Post
