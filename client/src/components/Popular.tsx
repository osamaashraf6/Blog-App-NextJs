"use client"
import { myAnimation } from '@/features/motion/motion';
import usePost from '@/hooks/postHook';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react'
import { format } from 'timeago.js';
import { motion } from "framer-motion";

function Popular() {
    const { useGetAllPostQuery } = usePost();
    const { isPending, data } = useGetAllPostQuery({
        limit: 3,
        sort: "-views",
    });
    return (
        <div>
            <div>
                <span className="text-gray-500 text-sm">What's hot</span>
                <h2 className='font-bold pb-6 text-xl'>Most Popular:</h2>
            </div>
            <div className="flex flex-col gap-8">
                {isPending ? (<p>Loading..</p>) : data?.data?.length > 0 ? (data?.data?.map((item: any) => (


                    <motion.div initial='initial' whileInView='inView'  
                        variants={myAnimation} key={item?._id} className='flex flex-col gap-2'>
                        <span className={`flex rounded-2xl text-gray-800 px-2 py-1 text-xs 
                            ${item?.category === "fashion" ? "bg-[#fbc9f1]"
                                : item?.category === "art" ? "bg-[#d8f8d8]"
                                    : item?.category === "design" ? "bg-[#cac8fb]"
                                        : item?.category === "food" ? "bg-[#c3e0f7]"
                                            : item?.category === "technology" ? "bg-[#f8c4b7]"
                                                : "bg-[#f4af62]"
                            }
                            w-fit px-2 capitalize`}>{item?.category}</span>
                        <p className='text-sm text-gray-500 leading-7 h-[80px] overflow-auto savedtext'>{item?.briefDesc}</p>
                        <div className="flex gap-2 items-center">
                            <span className='font-bold text-sm'>{item?.userId?.name}</span>
                            <span className='text-sm text-gray-500'>{format(item?.createdAt)}</span>
                        </div>
                        <Link href={`/posts/${item?._id}?category=${item?.category}`} className='text-xs text-amber-300 underline'>See Details</Link>
                        <div className="flex items-center gap-2 pt-2"><FontAwesomeIcon icon={faEye} /> <span className="text-sm text-amber-500">({item?.views})</span></div>

                    </motion.div>

                ))) : (<p>No Popular Posts Available !</p>)}
            </div>

            {/*  */}

        </div>
    )
}

export default Popular
