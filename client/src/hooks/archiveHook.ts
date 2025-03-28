"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOneArchive,
  deleteOneArchive,
  getAllArchiveOfUser,
} from "@/services/archiveService";
const useArchive = () => {
  const queryClient = useQueryClient();

  // ! createOne
  const createOneArchiveMutation = useMutation({
    mutationFn: createOneArchive,
    onSuccess: () => {
      queryClient.invalidateQueries(<any>["archives"]);
    },
  });
  // ! getAll without filter
  const getAllArchiveQuery = useQuery({
    queryKey: ["archives"],
    queryFn: getAllArchiveOfUser,
  });
  // ! deleteOne
  const deleteOneArchiveMutation = useMutation({
    mutationFn: deleteOneArchive,
    onSuccess: () => {
      queryClient.invalidateQueries(<any>["archives"]);
    },
  });

  return {
    createOneArchiveMutation,
    getAllArchiveQuery,
    deleteOneArchiveMutation,
  };
};

export default useArchive;
