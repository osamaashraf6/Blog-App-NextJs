"use client"
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";
import useAuth from "@/hooks/authHook";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


function ResetCodeVerifyPage() {
    const { resetCodeVerifyMutation } = useAuth();
    const { error, isPending } = resetCodeVerifyMutation;
    const errorType: any = error
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSubmitMethod = async (data: any) => {
        resetCodeVerifyMutation.mutate(
            data,

            {
                onSuccess: (res) => {
                    toast.success(res?.message);
                    router.push("/resetpassword");
                },
            }
        );
    }
    return (
        <div className="h-[40rem] w-full    relative flex flex-col items-center justify-center antialiased">
            <div className="hidden md:flex absolute top-[151px] left-[141px]    rounded-full     shadow-[-1px_-5px_96px_50px_rgba(149,_157,_165,_0.2)]"></div>

            <div className="max-w-2xl mx-auto p-4">
                <h1 className="   text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600  text-center font-sans font-bold">
                    Reset Code ! Check Email Now
                </h1>
                <p className="pb-10 text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    We've sent a reset code to your registered email. Please check your inbox (and spam folder) and enter the code below to verify your identity and reset your password.                </p>
                <form className="flex items-center gap-2 mb-2" onSubmit={handleSubmit(handleSubmitMethod)}>
                    <input
                        type="text"
                        placeholder="Type Reset code..."
                        className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500    relative     placeholder:text-neutral-500"
                        {...register("resetCode", { required: "Code is required" })}

                    />
                    <button type="submit" className="px-2 py-1  cursor-pointer rounded-lg text-white bg-amber-500" disabled={isPending}>   {isPending ? <LazyLoadingBtn /> : "Send"}</button>
                </form>
                {errors.resetCode && typeof errors.resetCode.message === 'string' && <p className="text-red-500 text-sm">{errors.resetCode.message}</p>}
                {error && (
                    <p className="text-red-500 text-sm">
                        {errorType?.response?.data?.message || "Something went wrong!"}
                    </p>
                )}
            </div>

        </div>
    );
}

export default ResetCodeVerifyPage
