import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProgressAbout() {
    return (
        <>
            <section className="pb-20 pt-5">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center gap-14 md:gap-7">
                        <div className="w-full md:w-[50%] flex flex-col gap-3">
                            <h3 className="text-orange-400 text-xs font-semibold">
                                ABOUT OUR COMPANY
                            </h3>
                            <h2 className="text-2xl font-bold ">
                                Providing Your Business With A Quality IT Service is Our Passion
                            </h2>
                            <p className="text-xs text-gray-600 leading-6 mb-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua enim
                                ad minim
                            </p>
                            <div className="progress-container flex flex-col gap-5">
                                <div className="progress-bar">
                                    <div className="progress-head flex justify-between mb-1">
                                        <span className="font-semibold text-xs">IT Consulting</span>
                                        <span className="font-semibold text-xs">90%</span>
                                    </div>
                                    <div className="sup-progress relative bg-gray-200 w-full h-1 rounded">
                                        <div className="sub-progress absolute top-0 left-0 w-[90%] h-full rounded bg-amber-500"></div>
                                    </div>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-head flex justify-between mb-1">
                                        <span className="font-semibold text-xs">
                                            Cloud Solutions
                                        </span>
                                        <span className="font-semibold text-xs">75%</span>
                                    </div>
                                    <div className="sup-progress relative bg-gray-200 w-full h-1 rounded">
                                        <div className="sub-progress absolute top-0 left-0 w-[75%] h-full rounded bg-amber-500"></div>
                                    </div>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-head flex justify-between mb-1">
                                        <span className="font-semibold text-xs">Managed IT Service</span>
                                        <span className="font-semibold text-xs">85%</span>
                                    </div>
                                    <div className="sup-progress relative bg-gray-200 w-full h-1 rounded">
                                        <div className="sub-progress absolute top-0 left-0 w-[85%] h-full rounded bg-amber-500"></div>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href=""
                                className="bg-amber-500 rounded text-white text-xs font-bold px-5 py-3 w-fit mt-5"
                            >
                                Learn More
                            </Link>
                        </div>
                        <div className="w-full md:w-[50%] relative">
                            <div className="experience-responsive">
                                <Image
                                    src="/about.jpg"
                                    width={470}
                                    height={400}
                                    alt="experienceImg"
                                    className="rounded"
                                />
                            </div>
                            <div className="absolute bottom-0 left-[50%] gap-2 bg-gray-50 translate-x-[-50%] translate-y-[-10%] w-[190px] h-[105px] border-b-2 border-orange-500 rounded flex justify-center items-center flex-col">
                                <h2 className="text-4xl font-bold text-orange-800">23</h2>
                                <span className="text-xs font-semibold text-orange-500">
                                    YEARS OF EXPERIENCE
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProgressAbout
