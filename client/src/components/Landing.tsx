"use client"
import React from 'react'
import usePost from '@/hooks/postHook';
import globalService from '@/services/globalService';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image'
import Link from 'next/link'
import Atropos from "atropos/react";
import "atropos/css";
import { motion } from "framer-motion";
import { myAnimation } from '@/features/motion/motion';

function Landing() {
    const { useGetAllPostQuery } = usePost();
    const { isPending, data } = useGetAllPostQuery({
        limit: 1,
        sort: "title",
    });
    return (
        <>
            <section className="py-12">
                <div className="container">
                    <div className="pb-10"><h1 className='text-3xl md:text-5xl xl:pr-80 bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600  font-sans'><span className="font-bold ">Hey, Osama Ashraf here!</span> <span className="text-xl md:text-4xl">Discover my stories and creative ideas.</span></h1></div>
                    {isPending ? (<p>Loading..</p>) : (
                        <motion.div initial='initial' whileInView='inView' viewport={{ once: true }}
                    variants={myAnimation} key={data?.data[0]?._id} className="items-center flex flex-col gap-8 md:flex-row ">
                            <div className="w-full">
                                <Image src={`${globalService.postImg + data?.data[0]?.postImg}`} width={100} height={100} alt="Landing-Img" className=' w-[500px] h-[200px]  rounded shadow-lg md:h-[300px] md:w-[600px]' />
                            </div>
                            <div className="w-full flex flex-col gap-5">
                                <h2 className="font-bold text-2xl pr-12 capitalize ">{data?.data[0]?.title}</h2>
                                <p className="text-sm text-gray-500">{data?.data[0]?.briefDesc}</p>
                                <Link href={`/posts/${data?.data[0]?._id}?category=${data?.data[0]?.category}`} className="hover:scale-110 duration-500 ease-in-out rounded p-2 bg-gray-300 text-xs w-fit text-gray-600">Read More</Link>
                                <div className="flex items-center gap-2"><FontAwesomeIcon icon={faEye} /> <span className="text-sm text-amber-500">({data?.data[0]?.views})</span></div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Landing
