"use client";
import usePost from '@/hooks/postHook';
import globalService from '@/services/globalService';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { format } from 'timeago.js';

function Related() {
    const searchParams = useSearchParams();
    const category = searchParams!.get("category");
    const { useGetAllPostQuery } = usePost();
    const { isPending, data } = useGetAllPostQuery({
        limit: 3,
        sort: "-createdAt",
        category
    });

    return (
        <div>
            <div>
                <span className="text-gray-500 text-sm">Check Now</span>
                <h2 className='font-bold pb-6 text-xl'>Related Topics:</h2>
            </div>
            {/*  */}
            <div className="flex flex-col gap-8">
                {isPending ? (<p>Loading...</p>) : data?.data?.length > 0 ? (data?.data?.map((item: any) => (
                    <div key={item?._id} className="flex items-center gap-3">
                        <div className="w-[20%]"> <Image src={globalService.postImg + item?.postImg} width={100} height={100} alt={item?.title} className="rounded-full w-[50px] h-[50px] " /></div>
                        <div className="flex flex-col gap-1.5 w-[80%]">
                            <span className={`flex rounded-2xl text-xs px-2 py-1 text-gray-800   ${item?.category === "fashion" ? "bg-[#fbc9f1]"
                                : item?.category === "art" ? "bg-[#d8f8d8]"
                                    : item?.category === "design" ? "bg-[#cac8fb]"
                                        : item?.category === "food" ? "bg-[#c3e0f7]"
                                            : item?.category === "technology" ? "bg-[#f8c4b7]"
                                                : "bg-[#f4af62]"
                                }  w-fit px-2 capitalize`}>{item?.category}</span>
                            <p className='text-sm text-gray-600 h-[60px] savedtext overflow-auto'>{item?.briefDesc}</p>
                            <div className='flex gap-2 items-center'>
                                <span className="font-bold text-sm text-[#f9d7b3]">{item?.userId?.name}</span>
                                <span className="text-xs text-gray-400">{format(item?.createdAt)}</span>
                            </div>
                            <Link href={`/posts/${item?._id}?category=${item?.category}`} className='text-xs text-amber-300 underline'>See Details</Link>
                            <div className="flex items-center gap-2 pt-2"><FontAwesomeIcon icon={faEye} /> <span className="text-sm text-amber-500">({item?.views})</span></div>

                        </div>
                    </div>
                ))) : (<p>No Related Posts Available !</p>)}

            </div>
            {/*  */}
        </div>

    )
}

export default Related
