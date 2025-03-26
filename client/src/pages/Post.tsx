"use client"
import CategoryLayout from "@/components/CategoryLayout";
import Popular from "@/components/Popular";
import Related from "@/components/Related";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Details from "@/components/Details";
import Comment from "@/components/Comment";
import { useEffect, useState } from "react";
import usePostLogic from "@/hooks/shared/postLogic";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { useParams } from "next/navigation";
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";
import globalService from "@/services/globalService";
import useSavedLogic from "@/hooks/shared/savedLogic";
import useLikeLogic from "@/hooks/shared/likeLogic";

function PostPage() {
    const [commentBtnId, setCommentBtnId] = useState(null);
    const [detailedDesc, setDetailedDesc] = useState("");
    const [updatedPost, setUpdatedPost] = useState([]);
    const { currentUser } = useSelector((state: any) => state.user);
    const params = useParams();
    const postId = params?.postId;
    const { post, isPending, handleDeleteOnePost, deletePostLoading } =
        usePostLogic(postId);
    const { handleSavedBtn, createSavLoading } = useSavedLogic();
    const { handleLikedBtn, createLikeLoading } = useLikeLogic();

    useEffect(() => {
        // ! imporatnt as not appear if you don't write condition as it is asyncho
        if (post?.data?.detailedDesc) {
            setDetailedDesc(post?.data?.detailedDesc);
        }
        if (post?.data) {
            setUpdatedPost(post?.data);
        }
    }, [post]);
    console.log(post)

    return (
        <>
            <section className="pb-16">
                <div className="container">
                    <div className="items-center flex flex-col gap-8 md:flex-row pb-8">
                        {isPending ? (<p>Loading...</p>) : post?.data ? (
                            <>
                                <div className="w-full">
                                    <h2 className="font-bold text-3xl  md:pr-12 pt-10 pb-8 md:pt-8 md:pb-6 capitalize">{post?.data?.title}</h2>
                                    <div className="flex items-center gap-3 pb-10">
                                        <Image src={`${post?.data?.userId?.profileImg ? globalService.userImg + post?.data?.userId?.profileImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLNskLysx-bhYLWXuebdAbB4rjz9u8sNTkR4o4w484CkY8Fp0tdAfMbncOvg4I9eZMtpg&usqp=CAU"}`} width={50} height={50} alt={post?.data?.userId?.name} className="rounded-full w-[40px] h-[40px]" />
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-sm text-[#f9d7b3] capitalize">{post?.data?.userId?.name}</span>
                                            <span className="text-xs text-gray-500">{format(post?.data?.createdAt)}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <button onClick={() => handleLikedBtn(post?.data?._id)} disabled={createLikeLoading}>  <FontAwesomeIcon icon={faThumbsUp} className="w-5 h-5 pr-2 cursor-pointer" /></button>
                                            <button onClick={() => handleSavedBtn(post?.data?._id)} disabled={createSavLoading}>    <FontAwesomeIcon icon={faBookmark} className="w-5 h-5 cursor-pointer" /></button>
                                        </div>
                                        <div className="flex gap-3">
                                            {/* <button className="text-sm font-medium cursor-pointer text-green-600">Edit</button> */}

                                            {post?.data?.userId?._id === currentUser?.data?._id && (


                                                <button onClick={() => handleDeleteOnePost(post?.data?._id)}
                                                    className="text-sm font-medium cursor-pointer text-red-500" disabled={deletePostLoading}>  {deletePostLoading ? <LazyLoadingBtn /> : "Delete"}</button>

                                            )}
                                            {/*  */}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-5"><FontAwesomeIcon icon={faEye} /> <span className="text-sm text-amber-500">({post?.data?.views})</span></div>

                                </div>
                                <div className="w-full">
                                    <Image src={`${globalService.postImg + post?.data?.postImg}`} width={100} height={100} alt="Landing-Img" className='w-[500px] h-[200px]  rounded shadow-lg md:h-[250px] md:w-[550px]' />
                                </div>
                            </>
                        ) : (<p>No Post Available !</p>)}
                    </div>
                    {/*  */}
                    <div className="items flex flex-col md:flex-row gap-12">
                        <Details post={post} detailedDesc={detailedDesc} />
                        <div className="item flex flex-col gap-12 md:w-[30%]">
                            <Popular />
                            <CategoryLayout />
                            <Related />
                        </div>
                    </div>
                    <Comment />
                </div>
            </section>
        </>
    )
}

export default PostPage
