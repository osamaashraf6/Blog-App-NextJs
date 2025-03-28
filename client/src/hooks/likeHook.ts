"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOneLike,
  deleteOneLike,
  getAllLikeOfUser,
} from "@/services/likeService";
const useLike = () => {
  const queryClient = useQueryClient();

  // ! createOne
  const createOneLikeMutation = useMutation({
    mutationFn: createOneLike,
    onSuccess: () => {
      queryClient.invalidateQueries(<any>["likes"]);
    },
  });
  // ! getAll without filter
  // const getAllLikeQuery = useQuery({
  //   queryKey: ["likes"],
  //   queryFn: getAllLikeOfUser,
  // });
  // ! getAllLikeOfUser with filter

  const useGetAllLikeOfUserQuery = ({
    limit,
    page,
    sort,
    search,
    category,
    tags,
  }: any) => {
    return useQuery({
      queryKey: ["likes", limit, page, sort, search, category, tags],
      queryFn: () =>
        getAllLikeOfUser(limit, page, sort, search, category, tags),
      //   keepPreviousData: true,
    });
  };
  // ! deleteOne
  const deleteOneLikeMutation = useMutation({
    mutationFn: deleteOneLike,
    onSuccess: () => {
      queryClient.invalidateQueries(<any>["likes"]);
    },
  });

  return {
    createOneLikeMutation,
    // getAllLikeQuery,
    useGetAllLikeOfUserQuery,
    deleteOneLikeMutation,
  };
};

export default useLike;
