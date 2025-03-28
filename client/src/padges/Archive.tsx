"use client";
import PolishLink from "@/features/element/PolishLink";
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";
import AuthGuard from "@/guards/AuthGuard"
import useArchiveLogic from "@/hooks/shared/archiveLogic";
import useCheckToken from "@/hooks/shared/checkToken";
import globalService from "@/services/globalService";
import Image from "next/image";
import Link from "next/link";


function ArchivePage() {
    useCheckToken();

    const {
        archives,
        isPending,
        handleUnArchivedBtn,
        deleteArchiveLoading,
        archiveId,
    } = useArchiveLogic();
    return (
        <AuthGuard>
            <>
                <section className="py-10">
                    <div className="container relative">
                        <div className="hidden md:flex absolute bottom-[-50px] left-0 bg-gradient-to-tr from-yellow-500 via-red-400 to-orange-300 w-[20px] h-[20px] rounded-full  shadow-[-1px_4px_100px_22px_rgba(147,_51,_234,_0.5)]"></div>
                        <div className="hidden md:flex absolute top-0 right-0 bg-gradient-to-tr from-yellow-500 via-red-400 to-orange-300 w-[20px] h-[20px] rounded-full  shadow-[-1px_4px_100px_22px_rgba(147,_51,_234,_0.5)]"></div>

                        <div className="text-center pb-6">
                            <h1 className="bg-gradient-to-t from-red-500 via-indigo-500 to-teal-500 text-transparent bg-clip-text text-4xl">Archived Posts</h1>
                        </div>
                        <div className="items flex flex-col gap-6 md:flex-row">
                            <div className="item md:w-[40%] lg:w-[25%] flex flex-col gap-3">
                                <span className="text-sm text-gray-600 font-bold">Archives</span>
                                <h2 className="font-bold text-2xl">Our Amazing Posts !</h2>
                                <p className="text-gray-600 text-xs">Check out the new posts to add them in bookmarks Check out the new posts to add them in bookmarks Check out the new posts to add them in bookmarks Check out the new posts to add them in bookmarks</p>
                                <Link href="/saved">   <PolishLink content="Check BookMarks" /></Link>
                            </div>
                            <div className="item md:w-[60%] lg:w-[75%] md:flex-row flex flex-col gap-4 md:flex-wrap">

                                {/*  */}
                                {isPending ? (<p>Loading...</p>) : archives?.data?.length > 0 ? (archives?.data?.map((item: any) => (
                                    <div key={item?._id} className="item  lg:w-[31%]   shadow   border-gray-300 border rounded  p-2 ">
                                        <div className='pb-2'>
                                            <Image src={globalService.postImg + item?.postId?.postImg} width={100} height={100} alt={item?.postId?.title} className='w-[500px] h-[200px]  rounded shadow-lg md:h-[180px] md:w-[600px]' />
                                        </div>
                                        <div className='flex flex-col gap-2'>

                                            <span className="text-pink-700 font-bold capitalize">{item?.postId?.category}</span>

                                            <p className='text-gray-500 text-xs leading-6 savedtext'>{item?.postId?.briefDesc}...</p>
                                            <div className='flex justify-between'>
                                                <div className='flex flex-col gap-2'>
                                                    <button onClick={() =>
                                                        handleUnArchivedBtn(item?._id, item?.postId?._id)
                                                    } className="bg-amber-500 rounded-lg text-xs px-2 py-1 cursor-pointer" disabled={item?._id === archiveId && deleteArchiveLoading}> {item?._id === archiveId && deleteArchiveLoading ? (
                                                        <LazyLoadingBtn />
                                                    ) : (
                                                        <>
                                                            Unarchive
                                                        </>
                                                    )}</button>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <Link href={`/posts/${item?.postId?._id}?category=${item?.postId?.category}`} className="underline text-sm">  See details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))) : (<div className="text-center m-auto">No Archives Available !</div>)}
                                {/*  */}
                                {/*  */}

                                {/*  */}
                                {/*  */}

                                {/*  */}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </AuthGuard>

    )
}

export default ArchivePage
