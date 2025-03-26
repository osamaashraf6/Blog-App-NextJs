import Link from 'next/link'
import React from 'react'

function LandingContact() {
    return (
        <>
            <section className="relative   bg-[url('/page-title-bg.jpg')] bg-cover bg-center py-42">
                <div className="w-full h-full top-0 left-0 absolute  bg-black/40 flex flex-col gap-5 justify-center items-center">
                    <h1 className="text-white text-2xl font-bold">Contact</h1>
                    <p className="text-white text-xs flex items-center font-semibold gap-2">
                        <Link
                            href="/"
                            className="hover:text-amber-500 transition ease-in-out"
                        >
                            Home
                        </Link>
                        <span className="block bg-white w-1.5 h-1.5 rounded-full"></span>
                        Contact
                    </p>
                </div>
            </section>
        </>
    )
}

export default LandingContact
