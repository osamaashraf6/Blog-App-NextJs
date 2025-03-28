"use client";

// src/hooks/useTodo.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfileByHimSelf,
  updateUserProfileByUserHimSelf,
  changeUserPasswordByUserHimSelf,
  deleteUserAccountByUserHimSelf,
} from "@/services/userService";

const useUser = () => {
  const queryClient = useQueryClient();

  // !  getOne
  const useGetUserProfileByHimSelfQuery = () => {
    return useQuery({
      queryKey: ["user"],
      queryFn: getUserProfileByHimSelf,
    });
  };
  // !  updateOne
  const updateUserProfileByUserHimSelfMutation = useMutation({
    mutationFn: updateUserProfileByUserHimSelf,
    onSuccess: () => {
      queryClient.invalidateQueries(<any>["user"]);
    },
  });
  // !  updateOne
  const changeUserPasswordByUserHimSelfMutation = useMutation({
    mutationFn: changeUserPasswordByUserHimSelf,
    onSuccess: () => {
      queryClient.invalidateQueries(<any>["user"]);
    },
  });
  // !  deleteOne
  const deleteUserAccountByUserHimSelfMutation = useMutation({
    mutationFn: deleteUserAccountByUserHimSelf,
    onSuccess: () => {
      queryClient.invalidateQueries(<any>["user"]);
    },
  });

  return {
    useGetUserProfileByHimSelfQuery,
    updateUserProfileByUserHimSelfMutation,
    changeUserPasswordByUserHimSelfMutation,
    deleteUserAccountByUserHimSelfMutation,
  };
};

export default useUser;
