"use client"
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { register as registerr } from "@/redux/userslice/apiCalls";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";
function RegisterPage() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const router = useRouter();
    const { isFetching, error } = useSelector((state: any) => state.user);
    const handleSubmitMethod = async (data: any) => {
        const res = await registerr(dispatch, data);
        if (res.payload) {
            toast.success("Signed up successfully! ");
            router.push("/login");
        }
    }
    return (
        <div className="grid place-items-center py-16 relative">
            <div className="hidden md:flex absolute bottom-[151px] left-[141px]    rounded-full   shadow-[-1px_4px_29px_50px_rgba(147,_51,_234,_0.5)]"></div>
            <div className="hidden md:flex absolute top-[151px] right-[141px]    rounded-full    shadow-[-1px_-5px_29px_50px_rgba(234,_179,_8,_0.5)]"></div>
            <div className="pb-6 text-4xl font-bold">
                Sign Up
            </div>
            <div className="relative w-full max-w-sm ">
                <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
                <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-[#0a0a0a] px-4 py-8 shadow-xl">
                    <div className="signup h-[450px] overflow-y-auto p-2">

                        <div className="text-center text-3xl text-white">New !</div>
                        <p className="text-xs text-gray-400 text-center pb-4">Create an account to gain trusted insights, submit your contributions, and engage with a community committed to transparency.</p>

                        <form className=" text-sm flex flex-col gap-6" onSubmit={handleSubmit(handleSubmitMethod)}>
                            <div className="formcontrol flex flex-col gap-3 mb-4">
                                <label className="text-gray-400 ">Name</label>
                                <input type="text" className="border-gray-200  border placeholder:text-xs text-white hover:placeholder:text-amber-500 placeholder:text-gray-500 hover:border-amber-500  transition-all duration-200 outline-0 w-full p-2 rounded-3xl" placeholder="Ex: John@gmail.com"  {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name must be at least 3 characters",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Name cannot exceed 10 characters",
                                    },
                                })} />
                            </div>
                            {errors.name && typeof errors.name.message === 'string' && <p className="text-red-500">{errors.name.message}</p>}

                            <div className="formcontrol flex flex-col gap-3 mb-4">
                                <label className="text-gray-400 ">Last Name</label>
                                <input type="text" className="border-gray-200  border placeholder:text-xs text-white hover:placeholder:text-amber-500 placeholder:text-gray-500 hover:border-amber-500  transition-all duration-200 outline-0 w-full p-2 rounded-3xl" placeholder="Ex: 4dsd5fd#$^56dfdk"  {...register("lastname", {
                                    required: "Lastname is required",
                                    minLength: {
                                        value: 3,
                                        message: "Lastname must be at least 3 characters",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Lastname cannot exceed 10 characters",
                                    },
                                })} />
                            </div>
                            {errors.lastname && typeof errors.lastname.message === 'string' && <p className="text-red-500">{errors.lastname.message}</p>}

                            <div className="formcontrol flex flex-col gap-3 mb-4">
                                <label className="text-gray-400 ">Phone</label>
                                <input type="text" className="border-gray-200  border placeholder:text-xs text-white hover:placeholder:text-amber-500 placeholder:text-gray-500 hover:border-amber-500  transition-all duration-200 outline-0 w-full p-2 rounded-3xl" placeholder="Ex: 4dsd5fd#$^56dfdk"    {...register("phone", {
                                    required: "phone is required",
                                })} />
                            </div>
                            {errors.phone && typeof errors.phone.message === 'string' && <p className="text-red-500">{errors.phone.message}</p>}

                            <div className="formcontrol flex flex-col gap-3 mb-4">
                                <label className="text-gray-400 ">Email</label>
                                <input type="email" className="border-gray-200  border placeholder:text-xs text-white hover:placeholder:text-amber-500 placeholder:text-gray-500 hover:border-amber-500  transition-all duration-200 outline-0 w-full p-2 rounded-3xl" placeholder="Ex: 4dsd5fd#$^56dfdk"  {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Enter a valid email address",
                                    },
                                })} />
                            </div>
                            {errors.email && typeof errors.email.message === 'string' && <p className="text-red-500">{errors.email.message}</p>}

                            <div className="formcontrol flex flex-col gap-3 mb-4">
                                <label className="text-gray-400 ">Password</label>
                                <input type="password" className="border-gray-200  border placeholder:text-xs text-white hover:placeholder:text-amber-500 placeholder:text-gray-500 hover:border-amber-500  transition-all duration-200 outline-0 w-full p-2 rounded-3xl" placeholder="Ex: 4dsd5fd#$^56dfdk"   {...register("password", {
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
                                })} />
                            </div>
                            {errors.password && typeof errors.password.message === 'string' && <p className="text-red-500">{errors.password.message}</p>}
                            <div className="formcontrol flex flex-col gap-3 mb-4">
                                <label className="text-gray-400 ">Confirm Password</label>
                                <input type="password" className="border-gray-200  border placeholder:text-xs text-white hover:placeholder:text-amber-500 placeholder:text-gray-500 hover:border-amber-500  transition-all duration-200 outline-0 w-full p-2 rounded-3xl" placeholder="Ex: 4dsd5fd#$^56dfdk"
                                    {...register("confirmPassword", {
                                        required: "Confirm Password is required",
                                        validate: (value) =>
                                            value === watch("password") || "Passwords do not match",
                                    })} />
                            </div>
                            {errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                            {error?.msg && <p className="text-red-500">{error.msg}</p>}
                            <button type="submit" className="rounded-3xl px-2 py-2 bg-amber-500 cursor-pointer text-white" disabled={isFetching}>   {isFetching ? <LazyLoadingBtn /> : "Sign Up"}</button>
                            <div className="text-white">Have an account ? <Link href="/login" className="text-indigo-400 underline">Sign In Now.</Link></div>
                        </form>
                    </div>
                    {/* Meaty part - Meteor effect */}
                    <Meteors number={20} />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage
