import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: {
        absolute: "Specific Contact"
    },
};
function SpecificContact() {
    return (
        <>


            <section className="  py-16 bg-[url('/dot-bg.png')] bg-cover bg-center flex justify-center items-center  shadow-lg pb-10">
                <div
                    className="container flex flex-col justify-center items-center"
                >
                    <h3 className="text-orange-400 text-xs font-semibold pb-5">
                        Hi Again Let's Talk With :
                    </h3>
                    <div className="flex relative">
                        <h2 className="text-2xl font-bold pb-14"></h2>


                    </div>
                    <form className="flex flex-col  gap-6 w-[60vw]">
                        <div className="form-control flex gap-3 w-full">
                            <input
                                type="text"
                                className="focus:border focus:border-gray-300 p-2 outline-0 placeholder:text-xs border border-gray-300 rounded w-2/4 shadow-lg placeholder:text-amber-600"
                                placeholder="Your Name"
                                name="name"
                            />
                            <input
                                type="email"
                                className="focus:border focus:border-gray-300 p-2 outline-0 placeholder:text-xs border border-gray-300 rounded w-2/4 shadow-lg placeholder:text-amber-600"
                                placeholder="Your Email"
                                name="email"
                            />
                        </div>
                        <div className="form-control flex gap-3 w-full">
                            <input
                                type="text"
                                className="focus:border focus:border-gray-300 p-2 outline-0 placeholder:text-xs border border-gray-300 rounded w-2/4 shadow-lg placeholder:text-amber-600"
                                placeholder="Your Phone"
                                name="phone"
                            />
                            <input
                                type="text"
                                className="focus:border focus:border-gray-300 p-2 outline-0 placeholder:text-xs border  border-gray-300 rounded w-2/4 shadow-lg placeholder:text-amber-500"
                                placeholder="Your Subject"
                                name="subject"
                            />
                        </div>
                        <div className="form-control w-full">
                            <textarea

                                placeholder="Your Message"
                                name="message"
                                className="focus:border focus:border-gray-300 p-2 outline-0 placeholder:text-xs border w-full border-gray-300 rounded shadow-lg placeholder:text-amber-500"
                            ></textarea>
                        </div>
                        <button className="bg-amber-500 rounded text-white text-xs font-bold px-5 py-3 w-fit mt-5">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>


        </>
    )
}

export default SpecificContact
