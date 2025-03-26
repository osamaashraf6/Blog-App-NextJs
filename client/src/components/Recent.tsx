"use client"
import usePost from '@/hooks/postHook';
import globalService from '@/services/globalService';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { format } from 'timeago.js';
import { motion } from "framer-motion";
import { myAnimation } from '@/features/motion/motion';

function Recent() {
    const searchParams = useSearchParams();
    const category = searchParams!.get("category");
    const [page, setPage] = useState(1);
    const { useGetAllPostQuery } = usePost();
    const { isPending, data } = useGetAllPostQuery({
        limit: 3,
        page,
        sort: "-createdAt",
        category: category ? category : ""
    });
    const changePage = (page: number) => {
        setPage(page);
    };
    return (
        <div className='w-full md:w-[75%]'>
            <h2 className='font-bold pb-6 text-xl'># Recent {category ? category : ""} Posts</h2>
            <div className='flex flex-col gap-8'>
                {isPending ? (<p>Loading...</p>) : data?.data?.length > 0 ? (data?.data?.map((item: any) => (
                    <motion.div initial='initial' whileInView='inView'
                        variants={myAnimation} key={item?._id} className="item flex flex-col md:items-center md:flex-row gap-8   shadow-lg border-gray-300 border-r  p-2 ">
                        <div className='md:w-[50%] w-full'>
                            <Image src={`${globalService.postImg + item?.postImg}`} width={100} height={100} alt={item?.title} className='w-[500px] h-[200px]  rounded shadow-lg md:h-[230px] md:w-[600px]' />
                        </div>
                        <div className='flex flex-col gap-2 md:w-[50%] w-full'>
                            <div className='flex gap-2'>
                                <span className='text-gray-500 text-sm'>{format(item?.createdAt)}</span>
                                <span className="text-pink-700 font-bold">{item?.category}</span>
                            </div>
                            <h2 className="text-2xl">{item?.title}</h2>
                            <p className='text-gray-500 text-sm leading-7 h-[105px] overflow-auto savedtext'>{item?.briefDesc}</p>
                            <Link href={`/posts/${item?._id}?category=${item?.category}`} className='border-b border-pink-700 text-sm w-fit'>Read More</Link>
                            <div className="flex items-center gap-2 pt-2"><FontAwesomeIcon icon={faEye} /> <span className="text-sm text-amber-500">({item?.views})</span></div>

                        </div>
                    </motion.div>
                ))) : (<p>No Recent Posts Available !</p>)}
                {/*  */}

            </div>
            {/* <!-- Start Pagination --> */}
            <nav
                aria-label="Page navigation example"
                className="flex justify-center items-center py-20"
            >
                <ul className="inline-flex -space-x-px text-sm">
                    <li onClick={() => changePage(1)}>
                        <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            First
                        </button>
                    </li>
                    {/* <!-- End previous --> */}
                    {data?.pagination.prev && (
                        <li
                            onClick={() => changePage(data?.pagination.prev)}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <button className="page-link">{data?.pagination.prev}</button>
                        </li>
                    )}
                    <li className="page-item">
                        <button
                            disabled
                            className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                            {data?.pagination.currentPage}
                        </button>
                    </li>
                    {data?.pagination.next && (
                        <li
                            onClick={() => changePage(data?.pagination.next)}
                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            <button className="page-link">{data?.pagination.next}</button>
                        </li>
                    )}
                    {/* <!-- Start next --> */}
                    <li onClick={() => changePage(data?.pagination.totalPages)}>
                        <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Last
                        </button>
                    </li>
                </ul>
            </nav>

            {/* <!-- End Pagination --> */}
            {/*  */}
        </div>
    )
}

export default Recent
