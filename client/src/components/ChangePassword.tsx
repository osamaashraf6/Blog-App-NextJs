"use client";
import LazyLoadingBtn from '@/features/loading/LazyLoadingBtn';
import useUserLogic from '@/hooks/shared/userLogic';
import React from 'react'
import { format } from "timeago.js"
function ChangePassword() {
    const {
        handleChangePassword,
        registerPassword,
        handleSubmitPassword,
        watch,
        errorsPassword,
        changePassLoading,
        user,
    } = useUserLogic();
    return (
        <div>
            <h1 className="   text-2xl md:text-xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600  text-center font-sans font-bold">
                Change Password !
            </h1>
            <p className="pb-10 text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                Easily reset your password and regain access to your account. Enter your registered email, and we'll send you a secure link to create a new password. Stay connected with your trusted insights and community.
            </p>
            <form className="" onSubmit={handleSubmitPassword(handleChangePassword)}>
                <div className="formcontrol flex flex-col gap-3 mb-4">
                    <label className="text-gray-400 ">Current Password</label>
                    <input
                        type="password"
                        placeholder="Ex: 12sadsd$%dkfjnf"
                        className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500         placeholder:text-neutral-500"
                        {...registerPassword("currentPassword", {
                            required: "Current Password is required",
                            minLength: {
                                value: 6,
                                message: "Current Password must be at least 6 characters",
                            },
                            maxLength: {
                                value: 20,
                                message: "Current Password cannot exceed 20 characters",
                            },
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                                message:
                                    "Current Password must contain at least one letter and one number",
                            },
                        })}
                    />
                </div>
                {errorsPassword.currentPassword && typeof errorsPassword.currentPassword.message === 'string' && <p className="text-red-500">{errorsPassword.currentPassword.message}</p>}

                <div className="formcontrol flex flex-col gap-3 mb-4">
                    <label className="text-gray-400 ">New Password</label>
                    <input
                        type="password"
                        placeholder="Ex: 12sadsd$%dkfjnf"
                        className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500         placeholder:text-neutral-500"
                        {...registerPassword("password", {
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
                </div>
                {errorsPassword.password && typeof errorsPassword.password.message === 'string' && <p className="text-red-500">{errorsPassword.password.message}</p>}

                <div className="formcontrol flex flex-col gap-3 ">
                    <label className="text-gray-400 ">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Ex: 12sadsd$%dkfjnf"
                        className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500         placeholder:text-neutral-500"
                        {...registerPassword("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === watch("password") || "Passwords do not match",
                        })}
                    />
                </div>
                {errorsPassword.confirmPassword && typeof errorsPassword.confirmPassword.message === 'string' && <p className="text-red-500 pt-4">{errorsPassword.confirmPassword.message}</p>}

                {user?.data?.passwordChangedAt && (
                    <p className="text-gray-500 text-sm py-4">Password changedAt: {format(user?.data?.passwordChangedAt)}</p>
                )}
                <button type="submit" className="px-2 py-1 bg-amber-500  rounded-lg cursor-pointer" disabled={changePassLoading}> {changePassLoading ? <LazyLoadingBtn /> : "Change Password"} </button>
            </form>
        </div>
    )
}

export default ChangePassword
