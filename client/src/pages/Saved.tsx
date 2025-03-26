"use client"
import PolishLink from "@/features/element/PolishLink";
import AuthGuard from "@/guards/AuthGuard"
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import useLikeLogic from "@/hooks/shared/likeLogic";
import useSavedLogic from "@/hooks/shared/savedLogic";
import globalService from "@/services/globalService";
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";
import useArchiveLogic from "@/hooks/shared/archiveLogic";
import useCheckToken from "@/hooks/shared/checkToken";

function SavedPage() {
    useCheckToken();

    const { handleLikedBtn, createLikeLoading, likeId } = useLikeLogic();
    const { handleCreateOneArchiveBtn, createArchiveLoading, archiveId } =
        useArchiveLogic();
    const { handleUnsavedBtn, deleteSavLoading, isPending, saveds, savedId } =
        useSavedLogic();
    return (
        <AuthGuard>
            <>
                <section className="py-10">
                    <div className="container relative">
                        <div className="hidden md:flex absolute bottom-[-50px] left-0 bg-gradient-to-tr from-yellow-500 via-red-400 to-orange-300 w-[20px] h-[20px] rounded-full  shadow-[-1px_4px_100px_22px_rgba(147,_51,_234,_0.5)]"></div>
                        <div className="hidden md:flex absolute top-0 right-0 bg-gradient-to-tr from-yellow-500 via-red-400 to-orange-300 w-[20px] h-[20px] rounded-full  shadow-[-1px_4px_100px_22px_rgba(147,_51,_234,_0.5)]"></div>

                        <div className="text-center pb-6">
                            <h1 className="bg-gradient-to-t from-red-500 via-indigo-500 to-teal-500 text-transparent bg-clip-text text-4xl">Book Marks</h1>
                        </div>
                        <div className="items flex flex-col gap-6 md:flex-row">
                            <div className="item md:w-[40%] lg:w-[25%] flex flex-col gap-3">
                                <span className="text-sm text-gray-600 font-bold">Bookmarks</span>
                                <h2 className="font-bold text-2xl">Our Amazing Posts !</h2>
                                <p className="text-gray-600 text-xs">Check out the new posts to add them in bookmarks Check out the new posts to add them in bookmarks Check out the new posts to add them in bookmarks Check out the new posts to add them in bookmarks</p>
                                <Link href="/">   <PolishLink content="Check Posts" /></Link>
                            </div>
                            <div className="item md:w-[60%] lg:w-[75%] md:flex-row flex flex-col gap-4 md:flex-wrap">

                                {/*  */}
                                {isPending ? (<p>Loading...</p>) : saveds?.data?.length > 0 ? (saveds?.data?.map((item: any) => (
                                    <div key={item?._id} className="item  lg:w-[31%]   shadow   border-gray-300 border rounded  p-2 ">
                                        <div className='pb-2'>
                                            <Image src={globalService.postImg + item?.postId?.postImg} width={100} height={100} alt={item?.postId?.title} className='w-[500px] h-[200px]  rounded shadow-lg md:h-[180px] md:w-[600px]' />
                                        </div>
                                        <div className='flex flex-col gap-2'>

                                            <span className="text-pink-700 font-bold capitalize">{item?.postId?.category}</span>

                                            <p className='text-gray-500 text-xs leading-6 h-[70px] overflow-auto savedtext'>{item?.postId?.briefDesc}...</p>
                                            <div className='flex justify-between'>
                                                <div className='flex flex-col gap-2'>
                                                    <button onClick={() => handleLikedBtn(item?.postId?._id)} disabled={
                                                        item?.postId?._id === likeId && createLikeLoading
                                                    }>

                                                        {item?.postId?._id === likeId && createLikeLoading ? (
                                                            <LazyLoadingBtn />
                                                        ) : (
                                                            <>
                                                                <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5 pr-2 cursor-pointer" />

                                                            </>
                                                        )}
                                                    </button>
                                                    <button onClick={() => handleUnsavedBtn(item?._id)} className="relative cursor-pointer" disabled={savedId === item?._id && deleteSavLoading}>

                                                        {savedId === item?._id && deleteSavLoading ? (
                                                            <LazyLoadingBtn />
                                                        ) : (
                                                            <>
                                                                <FontAwesomeIcon icon={faBookmark} className="w-5 h-5 cursor-pointer" />
                                                            </>
                                                        )}
                                                        <span className=" absolute top-[-1px] left-[8px] rotate-45 w-[3px] h-[22px] flex bg-gray-600 rounded"></span></button>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <button onClick={() =>
                                                        handleCreateOneArchiveBtn(item?._id, item?.postId?._id)
                                                    } className="bg-amber-500 rounded-lg text-xs px-2 py-1 cursor-pointer" disabled={
                                                        item?.postId?._id === archiveId && createArchiveLoading
                                                    }> {item?.postId?._id === archiveId &&
                                                        createArchiveLoading ? (
                                                        <LazyLoadingBtn />
                                                    ) : (
                                                        <>
                                                            Archive
                                                        </>
                                                    )}</button>
                                                    <Link href={`/posts/${item?.postId?._id}?category=${item?.postId?.category}`} className="underline text-sm">  See details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))) : (<div className="text-center m-auto">No BookMarks Available !</div>)}
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

export default SavedPage
