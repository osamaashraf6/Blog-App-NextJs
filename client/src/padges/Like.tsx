"use client"
import AuthGuard from "@/guards/AuthGuard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook, faPinterest } from "@fortawesome/free-brands-svg-icons";
import { faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import useLikeLogic from "@/hooks/shared/likeLogic";
import { format } from "timeago.js";
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";
import Link from "next/link";
import useCheckToken from "@/hooks/shared/checkToken";

function LikePage() {
    useCheckToken();

    const {
        changePage,
        likeId,
        handleDeleteLike,
        deleteLikLoading,
        likes,
        isPending,
    } = useLikeLogic();
    return (
        <AuthGuard>
            <>
                <section className=" py-[60px]" id="">
                    <div className="w-[85%] md:w-[72%] m-auto">
                        <div className="text-left  pb-[20px]">
                            <h2>
                                My Likes <FontAwesomeIcon icon={faPencil} />
                            </h2>
                        </div>
                        {/*  */}


                        <div className="relative comment-table overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Like Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            created At
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Post title
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
                                    </tr>) : likes?.data?.length > 0 ? likes?.data?.map((item: any) => (
                                        <tr key={item?._id} className="odd:bg-white odd:dark:bg-neutral-950 even:bg-gray-50 even:dark:bg-neutral-950 border-b dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-neutral-950 whitespace-nowrap dark:text-white">
                                                {item?._id}
                                            </th>

                                            <td className="px-6 py-4">
                                                {format(item?.createdAt)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={`/posts/${item?.postId?._id}?category=${item?.postId?.category}`} className="underline"> {item?.postId?.title}</Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleDeleteLike(item?._id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline" disabled={item?._id === likeId && deleteLikLoading}>  {item?._id === likeId && deleteLikLoading
                                                    ? <LazyLoadingBtn />
                                                    : " Dislike"}</button>
                                            </td>
                                        </tr>

                                    )) : (<tr >
                                        <td >
                                            No Likes Available
                                        </td>
                                    </tr>)}


                                </tbody>
                            </table>
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
                                {likes?.pagination.prev && (
                                    <li
                                        onClick={() => changePage(likes?.pagination.prev)}
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <button className="page-link">
                                            {likes?.pagination.prev}
                                        </button>
                                    </li>
                                )}
                                <li className="page-item">
                                    <button
                                        disabled
                                        className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    >
                                        {likes?.pagination.currentPage}
                                    </button>
                                </li>
                                {likes?.pagination.next && (
                                    <li
                                        onClick={() => changePage(likes?.pagination.next)}
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <button className="page-link">
                                            {likes?.pagination.next}
                                        </button>
                                    </li>
                                )}
                                {/* <!-- Start next --> */}
                                <li onClick={() => changePage(likes?.pagination.totalPages)}>
                                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        Last
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        {/* <!-- End Pagination --> */}
                        {/*  */}

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
                </section>            </>
        </AuthGuard>
    )
}

export default LikePage
