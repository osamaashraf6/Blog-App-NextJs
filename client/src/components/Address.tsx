"use client";
import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLocationDot, faPenToSquare, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import useAddressLogic from '@/hooks/shared/addressLogic';
import LazyLoadingBtn from '@/features/loading/LazyLoadingBtn';
function Address() {
    const [open, setOpen] = useState<boolean>(false)
    const {
        handleCreateAddress,
        handleDeleteAddress,
        errorsAddress,
        handleSubmitAddress,
        registerAddress,
        deleteAddLoading,
        createAddLoading,
        addressLoading,
        addresses,
    } = useAddressLogic();
    return (
        <>
            <button onClick={() => setOpen(true)} className=" absolute top-[36px] right-[45px] md:right-[-77px] cursor-pointer"><FontAwesomeIcon icon={faPenToSquare} /></button>
            <h1 className="   text-2xl md:text-xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600  text-center font-sans font-bold">
                Osama's Address !
            </h1>
            <p className="pb-10 text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                Easily reset your password and regain access to your account. Enter your registered email, and we'll send you a secure link to create a new password. Stay connected with your trusted insights and community.
            </p>
            {addressLoading ? (<p>Loading...</p>) : addresses?.data?.length > 0 ? (addresses?.data?.map((item: any) => (

                <div key={item?._id} className="formcontrol flex flex-col gap-3 mb-4">
                    <label className="text-gray-400 ">Address</label>
                    <div className="">
                        <input
                            type="text"
                            placeholder={`${item?.street}-${item?.city}-${item?.state}-${item?.postalCode}`}
                            className="mb-2 mr-2  p-1 rounded-lg border w-full md:w-[82%] border-neutral-800  placeholder:text-xs hover:border-amber-500         placeholder:text-neutral-500"
                            disabled
                        />
                        <button onClick={() => handleDeleteAddress(item?._id)} type="submit" className="px-2 py-1.5 bg-amber-500 text-sm  rounded-lg cursor-pointer" disabled={deleteAddLoading}>  {deleteAddLoading ? <LazyLoadingBtn /> : "Remove"}</button>
                    </div>
                </div>
            ))) : (<p>No Address Available !</p>)}

            {/* Modal */}
            {/* <!-- Modal address create --> */}
            <div
                className={`
          ${open ? "flex" : "hidden"} 
             parmodal top-0 left-0 w-full h-full justify-center pt-[82px] bg-[#000000cc] z-50 fixed
          `}
            >
                <div className="parmodal_modal dark border w-[320px] rounded-2xl md:w-[400px] h-fit p-6">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setOpen(false)}
                            className="w-[30px] h-[30px] text-white bg-red-500 text-xs rounded-full"
                        >
                            ×
                        </button>
                    </div>
                    <h2 className="text-2xl text-gray-300 font-bold pb-6">
                        Create Address
                    </h2>
                    <form
                        onSubmit={handleSubmitAddress(handleCreateAddress)}
                        className="flex flex-col gap-4 pr-6"
                    >
                        <div className="flex flex-col">
                            <label className="text-gray-400 pb-4 text-xs font-medium">
                                Street
                            </label>
                            <input
                                type="text"
                                {...registerAddress("street", {
                                    required: "street is required",
                                })}
                                className="text-sm w-full border-0 border-b"
                            />
                        </div>
                        {errorsAddress.street && typeof errorsAddress.street.message === 'string' && <p className="text-red-500">{errorsAddress.street.message}</p>}

                        <div className="flex flex-col">
                            <label className="text-gray-400 pb-4 text-xs font-medium">
                                City
                            </label>
                            <input
                                type="text"
                                {...registerAddress("city", {
                                    required: "city is required",
                                })}
                                className="text-sm w-full border-0 border-b"
                            />
                        </div>
                        {errorsAddress.city && typeof errorsAddress.city.message === 'string' && <p className="text-red-500">{errorsAddress.city.message}</p>}

                        <div className="flex flex-col">
                            <label className="text-gray-400 pb-4 text-xs font-medium">
                                State
                            </label>
                            <input
                                type="text"
                                {...registerAddress("state", {
                                    required: "state is required",
                                })}
                                className="text-sm w-full border-0 border-b"
                            />
                        </div>
                        {errorsAddress.state && typeof errorsAddress.state.message === 'string' && <p className="text-red-500">{errorsAddress.state.message}</p>}

                        <div className="flex flex-col">
                            <label className="text-gray-400 pb-4 text-xs font-medium">
                                postalCode
                            </label>
                            <input
                                type="text"
                                {...registerAddress("postalCode", {
                                    required: "postalCode is required",
                                })}
                                className="text-sm w-full border-0 border-b"
                            />
                        </div>
                        {errorsAddress.postalCode && typeof errorsAddress.postalCode.message === 'string' && <p className="text-red-500">{errorsAddress.postalCode.message}</p>}

                        <button
                            type="submit"
                            className="p-1 bg-amber-500 text-white text-sm"
                            disabled={createAddLoading}
                        >
                            {createAddLoading ? <LazyLoadingBtn /> : "Create"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Address
