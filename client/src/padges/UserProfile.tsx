"use client"
import AuthGuard from "@/guards/AuthGuard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faKey, faLocationDot, faPenToSquare, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Image from "next/image";
import Address from "@/components/Address";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/userslice/apiCalls";
import useUserLogic from "@/hooks/shared/userLogic";
import globalService from "@/services/globalService";
import ChangePassword from "@/components/ChangePassword";
import LazyLoadingBtn from "@/features/loading/LazyLoadingBtn";
import useCheckToken from "@/hooks/shared/checkToken";

function UserProfilePage() {
    useCheckToken();

    const [tab, setTab] = useState<string>("profile")
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useDispatch();
    const handleLogOut = () => {
        logout(dispatch);
    };
    const {
        handleUpdateUserProfile,
        errorsProfile,
        updateProLoading,
        deleteProLoading,
        isPending,
        user,
        handleSubmitProfile,
        registerProfile,
    } = useUserLogic();
    const filterTabs = (tab: string) => {
        setTab(tab)
    }
    return (
        <AuthGuard>
            <>
                <section className="bg-gradient-to-tr from-black via-neutral-950 to-neutral-800 py-16 grid place-items-center">
                    <div className="cont w-[90%] md:w-[65%] m-auto">
                        <div className="text-center">
                            <h1 className="  pb-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600  text-center font-sans font-bold">
                                User Profile
                            </h1>
                        </div>
                        <div className="wrap dark rounded-3xl  shadow-[0px_0px_100px_-40px_rgba(234,_179,_8,_0.5)]">
                            <div className="asides flex  border rounded-3xl">
                                <aside className="aside-lefts w-[18%] md:w-[20%]    border-r  py-16 ">
                                    {/* Desktop Menu */}
                                    <div className="hidden md:flex flex-col gap-10 justify-center items-center">
                                        <div className="w-[50px] h-[50px] rounded-full shadow text-blue-950 bg-white grid place-items-center">
                                            O
                                        </div>
                                        <ul className="flex flex-col gap-6 w-full pl-[10%]">
                                            <li onClick={() => filterTabs("profile")} className="font-bold cursor-pointer  w-full  transition-all duration-150 ease-in-out hover:border-r-5 border-amber-500 py-5 "><FontAwesomeIcon icon={faUser} /> My Profile</li>
                                            <li onClick={() => filterTabs("password")} className="font-bold cursor-pointer  w-full  transition-all duration-150 ease-in-out hover:border-r-5 border-amber-500 py-5 "><FontAwesomeIcon icon={faKey} /> Change Password</li>
                                            <li onClick={() => filterTabs("address")} className="font-bold cursor-pointer  w-full  transition-all duration-150 ease-in-out hover:border-r-5 border-amber-500 py-5 "><FontAwesomeIcon icon={faLocationDot} /> My Address</li>
                                            <li className="font-bold cursor-pointer  w-full  transition-all duration-150 ease-in-out hover:border-r-5 border-amber-500 py-5 "><button className="cursor-pointer" onClick={handleLogOut}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button></li>

                                        </ul>

                                    </div>
                                    {/* Mobile Menu */}
                                    <div className="md:hidden flex flex-col gap-10 justify-center items-center">
                                        <div className="w-[45px] h-[45px] rounded-full shadow text-blue-950 bg-white grid place-items-center">
                                            O
                                        </div>


                                        <ul className="flex flex-col gap-6 w-full text-center">
                                            <li onClick={() => filterTabs("profile")} className="font-bold cursor-pointer  w-full  transition-all duration-150 ease-in-out hover:border-r-5 border-amber-500 py-5"><FontAwesomeIcon icon={faUser} />
                                            </li>
                                            <li onClick={() => filterTabs("password")} className="font-bold cursor-pointer  w-full  transition-all duration-150 ease-in-out hover:border-r-5 border-amber-500 py-5 "><FontAwesomeIcon icon={faKey} /></li>
                                            <li onClick={() => filterTabs("address")} className="font-bold cursor-pointer  w-full  transition-all duration-150 ease-in-out border-b hover:border-r-5 border-amber-500 py-5 "><FontAwesomeIcon icon={faLocationDot} /></li>
                                            <li className="font-bold cursor-pointer  w-full  transition-all duration-150 ease-in-out hover:border-r-5 border-amber-500 py-5 "><button className="cursor-pointer" onClick={handleLogOut}><FontAwesomeIcon icon={faRightFromBracket} /></button></li>
                                        </ul>

                                    </div>


                                </aside>
                                <aside className="aside-rights w-[82%] md:w-[80%]  ">
                                    <div className="tabs grid place-items-center">
                                        {/*  */}
                                        {isPending ? (<p>Laoding...</p>) : user?.data ? (

                                            <div key={user?.data?._id} className={`${tab === "profile" ? "flex" : "hidden"} relative w-full  py-16 flex-col gap-5 items-center justify-center px-4`}>
                                                <button onClick={() => setOpen(true)} className=" absolute top-[36px] right-[42px] cursor-pointer"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                <div className="">
                                                    <Image src={`${user?.data?.profileImg ? globalService.userImg + user?.data?.profileImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLNskLysx-bhYLWXuebdAbB4rjz9u8sNTkR4o4w484CkY8Fp0tdAfMbncOvg4I9eZMtpg&usqp=CAU"}`}
                                                        alt={user?.data?.name}
                                                        width={50} height={50} className="rounded-full w-[120px] h-[120px]" />
                                                </div>
                                                <div className="w-full md:px-16 text-sm text-gray-400 flex flex-col gap-2">


                                                    <div className="formcontrol flex flex-col gap-3 mb-4">
                                                        <label className="text-gray-400 ">Name</label>
                                                        <input
                                                            type="text"
                                                            placeholder={user?.data?.name}
                                                            className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500         placeholder:text-neutral-500"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="formcontrol flex flex-col gap-3 mb-4">
                                                        <label className="text-gray-400 ">LastName</label>
                                                        <input
                                                            type="text"
                                                            placeholder={user?.data?.lastname}
                                                            className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500         placeholder:text-neutral-500"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="formcontrol flex flex-col gap-3 mb-4">
                                                        <label className="text-gray-400 ">Email</label>
                                                        <input
                                                            type="text"
                                                            placeholder={user?.data?.email}
                                                            className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500         placeholder:text-neutral-500"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="formcontrol flex flex-col gap-3 mb-4">
                                                        <label className="text-gray-400 ">Phone</label>
                                                        <input
                                                            type="text"
                                                            placeholder={user?.data?.phone}
                                                            className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500         placeholder:text-neutral-500"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="formcontrol flex flex-col gap-3 mb-4">
                                                        <label className="text-gray-400 ">Address</label>
                                                        <input
                                                            type="text"
                                                            placeholder={`Address: ${user?.data?.address?.length > 0 ? `${user?.data?.address[0]?.street}-${user?.data?.address[0]?.city}-${user?.data?.address[0]?.state}-${user?.data?.address[0]?.postalCode}` : "No Address"}`}
                                                            className=" p-1 rounded-lg border w-full border-neutral-800  placeholder:text-xs hover:border-amber-500         placeholder:text-neutral-500"
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="social"></div>
                                                </div>
                                            </div>
                                        ) : (<p>User Not Found</p>)}
                                        {/*  */}
                                        <div className={`${tab === "password" ? "flex" : "hidden"} flex flex-col gap-3 py-16 px-4`}>
                                            {/*  */}
                                            <ChangePassword />
                                            {/*  */}
                                        </div>
                                        <div className={`${tab === "address" ? "flex" : "hidden"} relative flex flex-col gap-3 py-16 px-4`}>
                                            {/*  */}
                                            <Address />
                                            {/*  */}
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Modal User --> */}
                <div
                    className={`
          ${open ? "flex" : "hidden"} 
           parmodal top-0 left-0 w-full h-full justify-center pt-[82px] bg-[#000000cc] z-50 fixed
        `}
                >
                    <div className="parmodal_modal   dark border w-[320px] rounded-2xl md:w-[400px] h-fit p-6">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setOpen(false)}
                                className="w-[30px] h-[30px] text-white bg-red-500 text-xs rounded-full"
                            >
                                ×
                            </button>
                        </div>
                        <h2 className="text-2xl text-gray-300 font-bold pb-6">
                            Upade Your Profile
                        </h2>
                        <form
                            onSubmit={handleSubmitProfile(handleUpdateUserProfile)}
                            className="flex flex-col gap-4"
                        >
                            <div className="imgs flex gap-11">
                                <div className="">
                                    <h3 className="text-gray-500 text-sm font-medium pb-2">
                                        profile picture
                                    </h3>
                                    <div className="">

                                        <label className="" htmlFor="file">Choose file <FontAwesomeIcon icon={faCloudArrowUp} /></label>
                                        <input type="file" className="hidden" id="file" accept="image/*"
                                            {...registerProfile("profileImg")}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-gray-400 pb-4 text-xs font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    {...registerProfile("name", {
                                        minLength: {
                                            value: 3,
                                            message: "name must be at least 3 characters",
                                        },
                                        maxLength: {
                                            value: 20,
                                            message: "name cannot exceed 20 characters",
                                        },
                                    })}
                                    className="text-sm w-full border-0 border-b"
                                />
                            </div>
                            {errorsProfile.name && typeof errorsProfile.name.message === 'string' && <p className="text-red-500">{errorsProfile.name.message}</p>}


                            <div className="flex flex-col">
                                <label className="text-gray-400 pb-4 text-xs font-medium">
                                    Phone
                                </label>
                                <input
                                    {...registerProfile("phone")}
                                    type="text"
                                    className="text-sm w-full border-0 border-b"
                                />
                            </div>

                            <button
                                type="submit"
                                className="p-1 bg-amber-500 text-white text-sm"
                                disabled={updateProLoading}
                            >
                                {updateProLoading ? <LazyLoadingBtn /> : "Update"}
                            </button>
                        </form>
                    </div>
                </div>            </>
        </AuthGuard>
    )
}

export default UserProfilePage
