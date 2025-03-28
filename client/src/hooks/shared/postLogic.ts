"use client";
import { useRouter } from "next/navigation";
import usePost from "../postHook";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const usePostLogic = (id: any) => {
  const { currentUser } = useSelector((state: any) => state.user);
  //   const { id } = useParams();
  const { useGetOnePostQuery, deleteOnePostMutation } = usePost();
  const { isPending, data: post } = useGetOnePostQuery(id);
  const { isPending: deletePostLoading } = deleteOnePostMutation;
  const router = useRouter();

  const handleDeleteOnePost = (id: any) => {
    if (!currentUser) {
      toast.error("You have to sign in first !");
    } else {
      deleteOnePostMutation.mutate(
        id,

        {
          onSuccess: (res) => {
            toast.success(res);
            router.push("/");
          },
          onError: (res: any) => {
            toast.error(
              `${res?.response?.data?.error?.message}, Sign in again`
            );
          },
        }
      );
    }
  };

  return {
    post,
    isPending,
    handleDeleteOnePost,
    deletePostLoading,
  };
};
export default usePostLogic;
