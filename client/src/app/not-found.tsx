"use client"
import Lottie from "react-lottie";
import animationData from "@/assets/notfound.json";
import Link from 'next/link';
function NotFound() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center flex-col bg-black">
            <div className="w-72 h-72 md:w-96 md:h-96">
                <Lottie options={defaultOptions} />
            </div>

            <div>
                <div className="text-blue-400 font-medium pb-3">Page Not Found</div>
                <Link
                    href="/"
                    replace={true}
                    className="text-blue-600 font-medium text-2xl"
                >
                    Go back to home
                </Link>
            </div>
        </div>
    )
}

export default NotFound
