"use client";
import { useState } from "react";
import AuthGuard from "@/guards/AuthGuard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import useCommentLogic from "@/hooks/shared/commentLogic";
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";
import { format } from "timeago.js";
import Link from "next/link";
import useCheckToken from "@/hooks/shared/checkToken";

function CommentPage() {
    useCheckToken();

    const [open, setOpen] = useState(false);
    const [commentBtnId, setCommentBtnId] = useState(null);
    const {
        isPending,
        usercomments,
        changePage,
        handleDeleteComment,
        deleteComLoading,
        commentId,
        handleUpdateOneComment,
        errorsUpdateComment,
        handleSubmitUpdateComment,
        registerUpdateComment,
        updateComLoading,
    } = useCommentLogic();
    return (
        <AuthGuard>
            <>
                <section className=" py-[60px]" id="">
                    <div className="w-[85%] md:w-[72%] m-auto">
                        <div className="text-left  pb-[20px]">
                            <h2>
                                My Comments <FontAwesomeIcon icon={faPencil} />
                            </h2>
                        </div>
                        {/*  */}


                        <div className="relative comment-table overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Comment Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Created At
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Post title
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Comment
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isPending ? (<tr>
                                        <td  >
                                            Loading...
                                        </td>
                                    </tr>) : usercomments?.data?.length > 0 ? (usercomments?.data?.map((item: any) => (
                                        <tr key={item?._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item?._id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {format(item?.createdAt)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={`/posts/${item?.postId?._id}?category=${item?.postId?.category}`} className="underline"> {item?.postId?.title}</Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.comment}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => {
                                                    setOpen(true);
                                                    setCommentBtnId(item?._id);
                                                }} className=" cursor-pointer font-medium text-green-600 dark:text-green-500 hover:underline pr-4">Edit</button>
                                                <button onClick={() => handleDeleteComment(item?._id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline" disabled={item?._id === commentId && deleteComLoading}>  {item?._id === commentId && deleteComLoading ? (
                                                    <LazyLoadingBtn />
                                                ) : (
                                                    " Delete"
                                                )}</button>
                                            </td>
                                        </tr>
                                    ))) : (<tr>
                                        <td  >
                                            No Comments Available
                                        </td>
                                    </tr>)}




                                </tbody>
                            </table>
                        </div>
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
                                {usercomments?.pagination.prev && (
                                    <li
                                        onClick={() => changePage(usercomments?.pagination.prev)}
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <button className="page-link">
                                            {usercomments?.pagination.prev}
                                        </button>
                                    </li>
                                )}
                                <li className="page-item">
                                    <button
                                        disabled
                                        className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    >
                                        {usercomments?.pagination.currentPage}
                                    </button>
                                </li>
                                {usercomments?.pagination.next && (
                                    <li
                                        onClick={() => changePage(usercomments?.pagination.next)}
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <button className="page-link">
                                            {usercomments?.pagination.next}
                                        </button>
                                    </li>
                                )}
                                {/* <!-- Start next --> */}
                                <li
                                    onClick={() =>
                                        changePage(usercomments?.pagination.totalPages)
                                    }
                                >
                                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        {/* <!-- End Pagination --> */}
                        <div className="flex gap-4 pt-10 justify-center items-center">
                            <span className="font-medium text-lg text-yellow-500 shadow-md p-1">
                                Share on:
                            </span>
                            <div className="flex gap-4 items-center">
                                <FontAwesomeIcon icon={faFacebook} />
                                <FontAwesomeIcon icon={faX} />
                                <FontAwesomeIcon icon={faLinkedin} />
                                <FontAwesomeIcon icon={faPinterest} />
                            </div>
                        </div>
                    </div>
                </section>
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

        </AuthGuard>
    )
}

export default CommentPage
