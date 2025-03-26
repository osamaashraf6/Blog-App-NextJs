"use client"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/userslice/apiCalls";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";


function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const router = useRouter();
    const { isFetching, error } = useSelector((state: any) => state.user);
    const handleSubmitMethod = async (data: any) => {
        const res = await login(dispatch, data);
        if (res.payload) {
            toast.success("Signed in successfully! ");
            router.push("/");
        }
    }
    return (
        <section className="overflow-hidden relative md:pb-36">
            <BackgroundGradientAnimation>
                <div className="pt-14 pb-6 absolute z-30 inset-0   text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
                    <p className=" bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
                        Sign In !
                    </p>
                </div>
            </BackgroundGradientAnimation>
            <div className="absolute top-[57%] md:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                <form className="shadow-lg p-6  z-50  bg-black/65 backdrop-blur-sm signup h-[535px] overflow-y-auto w-[300px] md:w-[400px] rounded-l-4xl text-sm flex flex-col gap-6" onSubmit={handleSubmit(handleSubmitMethod)}>
                    <div className="text-center text-3xl text-white">Now !</div>
                    <p className="text-xs text-gray-400 text-center">Access your account to reeview trusted insights, manage your submissions, and engage with a community dedicated to transparency.</p>
                    <div className="formcontrol flex flex-col gap-3">
                        <label className="text-gray-400 ">Email</label>
                        <input type="email" className="border-gray-200  border placeholder:text-xs text-white hover:placeholder:text-amber-500 placeholder:text-gray-500 hover:border-amber-500  transition-all duration-200 outline-0 w-full p-2 rounded-3xl" placeholder="Ex: John@gmail.com" {...register("email", { required: "Email is required" })} />
                    </div>
                    {errors.email && typeof errors.email.message === 'string' && <p className="text-red-500">{errors.email.message}</p>}
                    <div className="formcontrol flex flex-col gap-3">
                        <label className="text-gray-400 ">Password</label>
                        <input type="password" className="border-gray-200  border placeholder:text-xs text-white hover:placeholder:text-amber-500 placeholder:text-gray-500 hover:border-amber-500  transition-all duration-200 outline-0 w-full p-2 rounded-3xl" placeholder="Ex: 4dsd5fd#$^56dfdk"  {...register("password", {
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
                    {error?.message && <p className="text-red-500">{error.message}</p>}
                    <div className="formcontrol text-right"><Link href="forgetpassword" className="underline text-white">Forget Password</Link></div>
                    <button type="submit" className="rounded-3xl px-2 py-2 bg-amber-500 cursor-pointer text-white" disabled={isFetching}> {isFetching ? <LazyLoadingBtn /> : "Sign In"}</button>
                    <div className="text-white">Don't have an account ? <Link href="/register" className="text-indigo-400 underline" >Sign Up Now.</Link></div>
                </form>
            </div>
        </section>

    )
}

export default LoginPage