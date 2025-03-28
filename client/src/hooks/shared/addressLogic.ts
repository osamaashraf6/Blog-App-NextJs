"use client";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useAddress from "../addressHook";
const useAddressLogic = () => {
  const {
    createOneAddressMutation,
    getAllAddressOfUserQuery,
    deleteOneAddressMutation,
  } = useAddress();
  const { isPending: addressLoading, data: addresses } =
    getAllAddressOfUserQuery;
  const { isPending: createAddLoading } = createOneAddressMutation;

  const { isPending: deleteAddLoading } = deleteOneAddressMutation;
  const { currentUser } = useSelector((state: any) => state.user);
  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    reset: resetAddress,
    formState: { errors: errorsAddress },
  } = useForm();

  const handleDeleteAddress = (addressId: any) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      deleteOneAddressMutation.mutate(addressId, {
        onSuccess: (res: any) => {
          toast.success("Address Has Been Deleted Successfully");
        },
        onError: (res: any) => {},
      });
    }
  };
  const handleCreateAddress = (data: any) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      createOneAddressMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Address Has Been Created Successfully");
        },
        onError: (res: any) => {},
      });
      resetAddress();
    }
  };

  return {
    handleCreateAddress,
    handleDeleteAddress,
    errorsAddress,
    handleSubmitAddress,
    registerAddress,
    deleteAddLoading,
    createAddLoading,
    addressLoading,
    addresses,
  };
};
export default useAddressLogic;
