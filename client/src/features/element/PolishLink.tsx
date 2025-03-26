import React from 'react'

function PolishLink({ content }: { content: string }) {
    return (
        <>
            <button className="w-fit z-0 rounded-lg cursor-pointer font-semibold overflow-hidden relative  border border-yellow-500 group px-4 py-1">
                <span className="relative z-10 text-yellow-500 group-hover:text-white text-xl duration-500">{content}</span>
                <span className="absolute w-full h-full bg-yellow-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                <span className="absolute w-full h-full bg-yellow-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
        </>
    )
}

export default PolishLink
