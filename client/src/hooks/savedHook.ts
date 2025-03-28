"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOneSaved,
  deleteOneSaved,
  getAllSavedOfUser,
} from "@/services/savedService";
const useSaved = () => {
  const queryClient = useQueryClient();

  // ! createOne
  const createOneSavedMutation = useMutation({
    mutationFn: createOneSaved,
    onSuccess: () => {
      queryClient.invalidateQueries(<any>["saveds"]);
    },
  });
  // ! getAll without filter
  const getAllSavedQuery = useQuery({
    queryKey: ["saveds"],
    queryFn: getAllSavedOfUser,
  });
  // ! deleteOne
  const deleteOneSavedMutation = useMutation({
    mutationFn: deleteOneSaved,
    onSuccess: () => {
      queryClient.invalidateQueries(<any>["saveds"]);
    },
  });

  return {
    createOneSavedMutation,
    getAllSavedQuery,
    deleteOneSavedMutation,
  };
};

export default useSaved;
