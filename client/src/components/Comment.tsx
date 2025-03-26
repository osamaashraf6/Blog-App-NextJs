"use client"
import LazyLoadingBtn from '@/features/loading/LazyLoadingBtn';
import useCommentLogic from '@/hooks/shared/commentLogic';
import globalService from '@/services/globalService';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

function Comment() {
    const [open, setOpen] = useState<boolean>(false);
    const [commentBtnId, setCommentBtnId] = useState(null);
    const { currentUser } = useSelector((state: any) => state.user);
    const params = useParams();
    const id = params?.postId;
    const {
        changePage,
        handleDeleteComment,
        deleteComLoading,
        commentId,
        register,
        handleSubmit,
        errors,
        handleCreateOneComment,
        createComLoading,
        comments,
        commentLoading,
        //
        handleUpdateOneComment,
        errorsUpdateComment,
        handleSubmitUpdateComment,
        registerUpdateComment,
        updateComLoading,
        post
    } = useCommentLogic();
    return (
        <>
            <div className="py-10">
                <h2 className='text-2xl font-bold text-gray-500 pb-3'># Comments:</h2>
                <form className='pb-10' onSubmit={handleSubmit((data) =>
                    handleCreateOneComment(post?.data?._id, data)
                )}>
                    <div className="formcontrol flex flex-col md:flex-row  md:items-center gap-4">
                        <textarea className="resize-none w-full md:w-[80%] border h-[100px]  rounded hover:border-amber-600 transition-all duration-150 text-sm placeholder:text-sm p-2" placeholder='Add Comment....'  {...register("comment", {
                            required: "Comment is required",
                            minLength: {
                                value: 6,
                                message: "Comment must be at least 6 characters",
                            },
                            maxLength: {
                                value: 200,
                                message: "Comment cannot exceed 200 characters",
                            },
                        })}></textarea>

                        <button type="submit" className="cursor-pointer w-fit text-white bg-gray-400 rounded text-sm px-2 py-1" disabled={createComLoading}>  {createComLoading ? <LazyLoadingBtn /> : "Comment"}</button>
                    </div>
                    {errors.comment && typeof errors.comment.message === 'string' && <p className="text-red-500">{errors.comment.message}</p>}
                </form>
                {/*  */}
                <div className="show-comments flex flex-col gap-8">
                    {/*  */}
                    {commentLoading ? (<p>Loading...</p>) : comments?.data?.length > 0 ? (
                        comments?.data?.map((item: any) => (
                            <div key={item?._id} className="comment-wrapper flex flex-col gap-3 w-full md:w-[80%]">
                                <div className="flex justify-between">
                                    <div className="comment-owner flex items-center gap-3">
                                        <Image src={`${item?.userId?.profileImg ? globalService.userImg + item?.userId?.profileImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLNskLysx-bhYLWXuebdAbB4rjz9u8sNTkR4o4w484CkY8Fp0tdAfMbncOvg4I9eZMtpg&usqp=CAU"}`} width={50} height={50} alt={item?.userId?.name} className="rounded-full w-[40px] h-[40px]" />
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-sm text-[#d8a875]">{item?.userId?.name}</span>
                                            <span className="text-xs text-gray-500">{format(item?.createdAt)}</span>
                                        </div>
                                    </div>
                                    {/*  */}
                                    {item?.userId?._id === currentUser?.data?._id && (<div>
                                        <button onClick={() => {
                                            setOpen(true);
                                            setCommentBtnId(item?._id);
                                        }} className="px-2 py-1 text-sm  rounded-2xl bg-amber-400 text-white m-1     w-[66px]" disabled={item?._id === commentId && updateComLoading}>  {item?._id === commentId && updateComLoading ? (
                                            <LazyLoadingBtn />
                                        ) : (
                                            "Update"
                                        )}</button>
                                        <button onClick={() => handleDeleteComment(item?._id)} className="px-2 py-1  text-sm rounded-2xl bg-amber-700 text-white m-1    w-[66px]" disabled={item?._id === commentId && deleteComLoading}> {item?._id === commentId && deleteComLoading ? (
                                            <LazyLoadingBtn />
                                        ) : (
                                            " Delete"
                                        )}</button>
                                    </div>)}
                                </div>
                                <div className="comment-content text-sm text-gray-600 leading-6">
                                    {item?.comment}
                                </div>
                            </div>
                        ))
                    ) : (<p>No Comments Available !</p>)}
                    {/*  */}
                    {/*  */}
                    {/* <!-- Start Pagination --> */}
                    <nav
                        aria-label="Page navigation example"
                        className="flex justify-center items-center py-20"
                    >
                        <ul className="inline-flex -space-x-px text-sm">
                            <li onClick={() => changePage(1)}>
                                <button className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Previous
                                </button>
                            </li>
                            {/* <!-- End previous --> */}
                            {comments?.pagination.prev && (
                                <li
                                    onClick={() => changePage(comments?.pagination.prev)}
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <button className="page-link">
                                        {comments?.pagination.prev}
                                    </button>
                                </li>
                            )}
                            <li className="page-item">
                                <button
                                    disabled
                                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                >
                                    {comments?.pagination.currentPage}
                                </button>
                            </li>
                            {comments?.pagination.next && (
                                <li
                                    onClick={() => changePage(comments?.pagination.next)}
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <button className="page-link">
                                        {comments?.pagination.next}
                                    </button>
                                </li>
                            )}
                            {/* <!-- Start next --> */}
                            <li onClick={() => changePage(comments?.pagination.totalPages)}>
                                <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                    {/* <!-- End Pagination --> */}
                </div>
            </div>
            {/* <!-- Modal comment update --> */}
            <div
                className={`
        ${open ? "flex" : "hidden"}
         parmodal top-0 left-0 w-full h-full justify-center pt-[82px] bg-[#000000cc] z-50 fixed
      `}
            >
                <div className="parmodal_modal  bg-neutral-950 border w-[350px]  p-4 h-fit pb-12">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setOpen(false)}
                            className="w-[30px] h-[30px] text-white bg-red-500 text-xs rounded-full"
                        >
                            ×
                        </button>
                    </div>
                    <h2 className="text-2xl text-gray-300 font-bold pb-6">
                        Upade Post Comment
                    </h2>
                    <form
                        onSubmit={handleSubmitUpdateComment((data) =>
                            handleUpdateOneComment(commentBtnId, data)
                        )}
                        className="flex flex-col gap-4 pr-6"
                    >
                        <div className="flex flex-col">
                            <label className="text-gray-400 pb-4 text-xs font-medium">
                                Comment
                            </label>
                            <input
                                type="text"
                                className="text-sm w-full border-0 border-b"
                                {...registerUpdateComment("comment")}
                            />
                        </div>

                        <button
                            className="p-1 bg-amber-500 text-white text-sm"
                            disabled={updateComLoading}
                        >
                            {updateComLoading ? <LazyLoadingBtn /> : "Update"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Comment
