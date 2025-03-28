"use client"
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";
import useAuth from "@/hooks/authHook";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


function ResetPasswordPage() {
    const { resetPasswordMutation } = useAuth();
    const { error, isPending } = resetPasswordMutation;
    const errorType: any = error
    const router = useRouter();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSubmitMethod = async (data: any) => {
        resetPasswordMutation.mutate(
            data,

            {
                onSuccess: (res) => {
                    toast.success(res?.message);
                    router.push("/login");
                },
            }
        );
    }
    return (
        <div className="h-[40rem] w-full    relative flex flex-col items-center justify-center antialiased">
            <div className="hidden md:flex absolute top-[151px] left-[141px]    rounded-full     shadow-[-1px_-5px_96px_50px_rgba(149,_157,_165,_0.2)]"></div>

            <div className="max-w-2xl mx-auto p-4">
                <h1 className="   text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600  text-center font-sans font-bold">
                    Reset Password ! Let's Change Password
                </h1>
                <p className="pb-10 text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Create a new password to regain access to your account. Make sure it's strong and unique to keep your account secure.                                </p>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSubmitMethod)}>
                    <div>
                        <input
                            type="password"
                            placeholder="Type Password..."
                            className="mb-4 p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500    relative     placeholder:text-neutral-500"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Password cannot exceed 20 characters",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                                    message:
                                        "Password must contain at least one letter and one number",
                                },
                            })}
                        />
                        {errors.password && typeof errors.password.message === 'string' && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Type Confirm Password..."
                            className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500    relative     placeholder:text-neutral-500"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
                                validate: (value: string) =>
                                    value === watch("password") || "Passwords do not match",
                            })}
                        />
                    </div>
                    {errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                    <button type="submit" className="px-2 py-1  cursor-pointer  rounded-lg text-white bg-amber-500" disabled={isPending}>    {isPending ? <LazyLoadingBtn /> : "Send"}</button>
                </form>
                {error && (
                    <p className="text-red-500 text-sm">
                        {errorType?.response?.data?.message || "Something went wrong!"}
                    </p>
                )}
            </div>

        </div>
    );
}

export default ResetPasswordPage
