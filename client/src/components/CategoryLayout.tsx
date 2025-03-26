import Link from 'next/link'
import React from 'react'

const CategoryLayout = () => {
    return (
        <div>
            <div>
                <span className="text-gray-500 text-sm">Discover By Topic</span>
                <h2 className='font-bold pb-4 text-xl'>Categories:</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
                <Link href="/filter?category=fashion" className="hover:scale-110 duration-500 ease-in-out flex rounded-lg bg-[#f7e8f4] w-fit text-gray-800 text-xs px-4 py-1 ">Fashion</Link>
                <Link href="/filter?category=art" className="hover:scale-110 duration-500 ease-in-out flex rounded-lg bg-[#e2ede2] w-fit text-gray-800 text-xs px-4 py-1 ">Art</Link>
                <Link href="/filter?category=design" className="hover:scale-110 duration-500 ease-in-out flex rounded-lg bg-[#deddfd] w-fit text-gray-800 text-xs px-4 py-1 ">Design</Link>
                <Link href="/filter?category=food" className="hover:scale-110 duration-500 ease-in-out flex rounded-lg bg-[#e3f2fe] w-fit text-gray-800 text-xs px-4 py-1 ">Food</Link>
                <Link href="/filter?category=technology" className="hover:scale-110 duration-500 ease-in-out flex rounded-lg bg-[#fde1da] w-fit text-gray-800 text-xs px-4 py-1 ">Technology</Link>
                <Link href="/filter?category=science" className="hover:scale-110 duration-500 ease-in-out flex rounded-lg bg-[#fce9d4] w-fit text-gray-800 text-xs px-4 py-1 ">Science</Link>
            </div>
            {/*  */}

        </div>
    )
}

export default CategoryLayout
