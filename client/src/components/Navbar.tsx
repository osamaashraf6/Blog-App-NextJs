"use client"
import Link from 'next/link'
import { ThemeContext, ThemeContextType } from '@/context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser, faFile, faComment, faBoxArchive, faThumbsUp, faBookmark, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/userslice/apiCalls';
function Navbar() {
  const { toggle } = useContext<any>(ThemeContext)
  const themeVal = useContext(ThemeContext);
  const [mode, setMode] = useState<String>(themeVal!.theme)
  const [open, setOpen] = useState<boolean>(false)
  const [openUSer, setOpenUser] = useState<boolean>(false);
  // 
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    logout(dispatch);
  };

  const toggleUserSettings = () => {
    setOpenUser((prev) => !prev);
  };
 
  return (
    <>
      <header className=' py-4 shadow-[-1px_4px_100px_-15px_rgba(234,_179,_8,_0.5)] '>
        <div className="container">
          <div className="parnav flex justify-between items-center">
            <div className="social flex gap-2">
              <div id="#top" className="hidden"></div>
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
              <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
              <FontAwesomeIcon icon={faFile} className="w-5 h-5" />
            </div>            <div className="brand hidden lg:flex"><Link href="/" className='font-bold text-xl'>OsamaBlog</Link></div>
            <div onClick={() => setOpen(true)} className="bars flex lg:hidden text-xl cursor-pointer">☰</div>
            {/* DESKTOP Menu */}
            <nav className="hidden lg:flex">
              <ul className="flex items-center gap-4">
                <li onClick={() => {
                  toggle();
                  setMode(mode === "dark" ? "light" : "dark")
                }} className="cursor-pointer rounded-4xl bg-black w-11 h-6 flex justify-between items-center relative border-1">
                  <span>🌙</span>
                  <span>☀️</span>
                  <span className={` ${mode === "dark" ? "left-0  " : "left-6  "} transition-all duration-300 ease-in-out top-0.5  ball flex bg-white rounded-full w-5 h-5 absolute `}></span>
                </li>
                <li className=""><Link href="/">Home</Link></li>
                <li className=""><Link href="/contact" prefetch={false}>Contact</Link></li>
                <li className=""><Link href="/about">About</Link></li>
                <li className=""><Link href="/write">Write</Link></li>
                {currentUser?.data ? (<>

                  {/*  */}
                  <li className=""><button onClick={handleLogOut} className='cursor-pointer'>Logout</button></li>
                  <li className=""><Link  href="/userprofile" className='flex cursor-pointer text-sm font-bold bg-amber-300 text-white rounded-3xl p-1'>{currentUser?.data?.name}</Link></li>
                  {/* User settings */}
                  <div className="flex gap-5 items-center pr-10">
                    <div className="relative">
                      <div>
                        <button
                          onClick={toggleUserSettings}
                          className="pardropdown relative cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faUser} />
                          <span className="absolute top-[3px] left-[12px] flex justify-center items-center w-[16px] h-[16px] text-lg rounded-full bg-yellow-500">
                            <FontAwesomeIcon icon={faAngleDown} />
                          </span>
                        </button>
                      </div>

                      <div className={openUSer ? "flex" : "hidden"}>
                        <ul
                          className="
                 pardropdown_dropdown absolute top-[34px] left-[-5px] bg-white pt-3 shadow-md rounded w-[200px] border flex-col z-50
                  "
                        >
                          <li>
                            <Link
                              onClick={() => setOpenUser(false)}
                              href="/userprofile"
                              className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                            >
                              <FontAwesomeIcon icon={faUser} /> Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => setOpenUser(false)}
                              href="/comment"
                              className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                            >
                              <FontAwesomeIcon icon={faComment} /> Comments
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => setOpenUser(false)}
                              href="/like"
                              className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                            >
                              <FontAwesomeIcon icon={faThumbsUp} /> Likes
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => setOpenUser(false)}
                              href="/archive"
                              className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                            >
                              <FontAwesomeIcon icon={faBoxArchive} /> Archives
                            </Link>
                          </li>
                          <li>
                            <Link
                              onClick={() => setOpenUser(false)}
                              href="/saved"
                              className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                            >
                              <FontAwesomeIcon icon={faBookmark} /> Saveds
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* User settings */}
                </>) : (<li className=""><Link href="/login" prefetch={false}>Login</Link></li>
                )}
              </ul>
            </nav>
            {/* MOBILE Menu */}
            <nav className={`lg:hidden ${open ? "right-0 " : "right-[-310px] "}   transition-all duration-150 ease-in-out dark fixed z-50 top-0  h-full p-4  w-[310px] border-l-1 border-gray-700`}>
              <div className="flex flex-col justify-center">
                <div className="flex justify-between">
                  <div onClick={() => {
                    toggle();
                    setMode(mode === "dark" ? "light" : "dark")
                  }} className="border-b-2  cursor-pointer rounded-4xl bg-black w-11 h-6 flex justify-between items-center relative border-1">
                    <span>🌙</span>
                    <span>☀️</span>
                    <span className={` ${mode === "dark" ? "left-0  " : "left-6  "} transition-all duration-300 ease-in-out top-0.5  ball flex bg-white rounded-full w-5 h-5 absolute `}></span>
                  </div>
                  <div onClick={() => setOpen(false)} className="times text-xl cursor-pointer">×</div>
                </div>
                <ul className="pt-20 flex flex-col justify-center text-xl ">
                  <li onClick={() => setOpen(false)} className="border-y-1 flex py-4 "><Link href="/">Home</Link></li>
                  <li onClick={() => setOpen(false)} className="border-b-1 flex py-4 "><Link href="/contact">Contact</Link></li>
                  <li onClick={() => setOpen(false)} className="border-b-1 flex py-4 "><Link href="/about">About</Link></li>
                  <li onClick={() => setOpen(false)} className="border-b-1 flex py-4 "><Link href="/write">Write</Link></li>
                  {currentUser?.data ? (<>
                    {/*  */}
                    <li onClick={() => setOpenUser(false)} className=""><button onClick={handleLogOut} className='w-full border-b-1 flex py-4 cursor-pointer'>Logout</button></li>

                    {/* User settings */}
                    <div className="flex gap-5 items-center pr-10">
                      <div className="relative">
                        <div className='border-b w-[280px] py-4'>
                          <button
                            onClick={toggleUserSettings}
                            className="pardropdown relative cursor-pointer "
                          >
                            <FontAwesomeIcon icon={faUser} />
                            <span className="absolute top-[2px] left-[18px] flex justify-center items-center w-[16px] h-[16px] text-lg rounded-full bg-yellow-500">
                              <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                          </button>
                        </div>

                        <div className={openUSer ? "flex" : "hidden"}>
                          <ul
                            className=" overflow-y-auto h-[200px] py-16
                 pardropdown_dropdown absolute top-[40px] left-[-5px] bg-white pt-3 shadow-md rounded w-[280px] border flex-col z-50
                  "
                          >
                            <li>
                              <Link
                                onClick={() => setOpenUser(false)}
                                href="/userprofile"
                                className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                              >
                                <FontAwesomeIcon icon={faUser} /> Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={() => setOpenUser(false)}
                                href="/comment"
                                className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                              >
                                <FontAwesomeIcon icon={faComment} /> Comments
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={() => setOpenUser(false)}
                                href="/like"
                                className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                              >
                                <FontAwesomeIcon icon={faThumbsUp} /> Likes
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={() => setOpenUser(false)}
                                href="/archive"
                                className="hover:bg-slate-200 pt-3 border-b flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                              >
                                <FontAwesomeIcon icon={faBoxArchive} /> Archives
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={() => setOpenUser(false)}
                                href="/saved"
                                className="hover:bg-slate-200 pt-3  flex pb-2 px-3 w-full text-slate-500 gap-2 items-center text-sm font-medium"
                              >
                                <FontAwesomeIcon icon={faBookmark} /> Saveds
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* User settings */}
                  </>) : (
                    <li onClick={() => setOpen(false)} className="border-b-1 flex py-4 "><Link href="/login">Login</Link></li>

                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar
