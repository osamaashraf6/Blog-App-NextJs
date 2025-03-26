"use client"
import { useState } from "react"

function Announcement() {
  const [hidden, setHidden] = useState(false)
  return (
    <>
      <div className={`${hidden ? "hidden" : "flex"} transition-all duration-300 ease-in-out py-3 bg-amber-500 text-amber-50 `}>
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="font-bold">Hoowdy! Check now The Recent Posts.</div>
            <div onClick={() => setHidden(true)} className="times text-2xl cursor-pointer font-bold">×</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Announcement
