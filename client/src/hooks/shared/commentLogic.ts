"use client";

import { useState } from "react";
import useComment from "../commentHook";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
import usePost from "../postHook";
import { useParams } from "next/navigation";

const useCommentLogic = () => {
  const [commentId, setCommentId] = useState(null);
  const [page, setPage] = useState(1);
  const { currentUser } = useSelector((state: any) => state.user);
  const params = useParams();
  const postId: any = params?.postId;
  const { useGetOnePostQuery } = usePost();
  const { data: post } = useGetOnePostQuery(postId);

  const {
    useGetAllCommentOfUserQuery,
    useGetAllCommentOfPostQuery,
    createOneCommentMutation,
    updateOneCommentMutation,
    deleteOneCommentMutation,
  } = useComment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { isPending, data: usercomments } = useGetAllCommentOfUserQuery({
    limit: 5,
    page,
    sort: "-createdAt",
  });
  const { isPending: commentLoading, data: comments } =
    useGetAllCommentOfPostQuery({
      postId: post?.data?._id,
      limit: 5,
      page,
      sort: "-createdAt",
    });
  const { isPending: updateComLoading } = updateOneCommentMutation;
  const { isPending: deleteComLoading } = deleteOneCommentMutation;
  const { isPending: createComLoading } = createOneCommentMutation;
  const {
    register: registerUpdateComment,
    handleSubmit: handleSubmitUpdateComment,
    reset: resetUpdateComment,
    formState: { errors: errorsUpdateComment },
  } = useForm();
  const changePage = (page: any) => {
    setPage(page);
  };
  const handleDeleteComment = (id: any) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      setCommentId(id);
      deleteOneCommentMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Comment deleted successfully");
        },
        onError: () => {},
      });
    }
  };
  const handleCreateOneComment = (postId: any, data: any) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      createOneCommentMutation.mutate(
        { postId, formData: data },
        {
          onSuccess: () => {
            toast.success("Comment Has Been Added Successfully");
          },
          onError: () => {
            toast.error("Something went wrong !");
          },
        }
      );
      reset();
    }
  };
  const handleUpdateOneComment = (commentId: any, data: any) => {
    if (!data.comment) {
      toast.error("Can not submit empty form");
      return;
    }
    if (!currentUser) {
      toast.error("Please login to update a comment");
    } else {
      setCommentId(commentId);
      const updatedData = {
        comment: data.comment || undefined,
      };
      updateOneCommentMutation.mutate(
        { id: commentId, formData: updatedData },
        {
          onSuccess: () => {
            toast.success("Comment updated successfully");
          },
          onError: (res) => {
            console.log(res);
            toast.error("Comment update failed");
          },
        }
      );
      resetUpdateComment();
    }
  };
  return {
    isPending,
    usercomments,
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
    post,
  };
};
export default useCommentLogic;
