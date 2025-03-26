import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Category() {
    return (
        <>
            <section className="pb-14 border-b-1 border-amber-400">
                <div className="container">
                    <h2 className='font-bold pb-6 text-xl'>Popular Categories</h2>
                    <div className="items flex flex-col gap-4 md:flex-row md:flex-wrap xl:flex-nowrap">
                        <Link href="/filter?category=fashion" className="rounded hover:scale-110 duration-500 ease-in-out bg-[#f7e8f4] p-4 flex items-center gap-3 w-full shadow md:w-[30%] ">
                            <Image src="/fashion.jpg" width={100} height={100} alt="Landing-Img" className='w-[30px] h-[30px]  rounded-full shadow-lg  ' />
                            <span className='text-xs text-gray-600 font-medium'>Fashion</span>
                        </Link>
                        <Link href="/filter?category=art" className="rounded hover:scale-110 duration-500 ease-in-out bg-[#e2ede2] p-4 flex items-center gap-3 w-full shadow md:w-[30%] ">
                            <Image src="/fashion.jpg" width={100} height={100} alt="Landing-Img" className='w-[30px] h-[30px]  rounded-full shadow-lg  ' />
                            <span className='text-xs text-gray-600 font-medium'>Art</span>
                        </Link>
                        <Link href="/filter?category=design" className="rounded hover:scale-110 duration-500 ease-in-out bg-[#deddfd] p-4 flex items-center gap-3 w-full shadow md:w-[30%] ">
                            <Image src="/fashion.jpg" width={100} height={100} alt="Landing-Img" className='w-[30px] h-[30px]  rounded-full shadow-lg  ' />
                            <span className='text-xs text-gray-600 font-medium'>Design</span>
                        </Link>
                        <Link href="/filter?category=food" className="rounded hover:scale-110 duration-500 ease-in-out bg-[#e3f2fe] p-4 flex items-center gap-3 w-full shadow md:w-[30%] ">
                            <Image src="/fashion.jpg" width={100} height={100} alt="Landing-Img" className='w-[30px] h-[30px]  rounded-full shadow-lg  ' />
                            <span className='text-xs text-gray-600 font-medium'>Food</span>
                        </Link>
                        <Link href="/filter?category=technology" className="rounded hover:scale-110 duration-500 ease-in-out bg-[#fde1da] p-4 flex items-center gap-3 w-full shadow md:w-[30%] ">
                            <Image src="/fashion.jpg" width={100} height={100} alt="Landing-Img" className='w-[30px] h-[30px]  rounded-full shadow-lg  ' />
                            <span className='text-xs text-gray-600 font-medium'>Technology</span>
                        </Link>
                        <Link href="/filter?category=science" className="rounded hover:scale-110 duration-500 ease-in-out bg-[#fce9d4] p-4 flex items-center gap-3 w-full shadow md:w-[30%] ">
                            <Image src="/fashion.jpg" width={100} height={100} alt="Landing-Img" className='w-[30px] h-[30px]  rounded-full shadow-lg  ' />
                            <span className='text-xs text-gray-600 font-medium'>Science</span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Category
