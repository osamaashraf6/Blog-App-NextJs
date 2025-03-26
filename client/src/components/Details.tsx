import React from 'react'
import Comment from './Comment'

function Details({ post, detailedDesc }: any) {
    return (
        <div className="w-full md:w-[70%]">
            <h2 className='font-bold pb-6 text-xl text-amber-600'># {post?.data?.category}</h2>
            <p className='pb-6 text-justify'>{post?.data?.briefDesc}</p>
            <div dangerouslySetInnerHTML={{ __html: detailedDesc }} />
            {/* <Comment /> */}
        </div>
    )
}

export default Details
