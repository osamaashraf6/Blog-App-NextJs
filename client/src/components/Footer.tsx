import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser, faFile } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <>
      <footer className="pt-16 py-6 border-y-1 border-gray-600">
        <div className="container">
          <div className="parfoot flex flex-col md:flex-row gap-16 mb-8">
            <div className="foot w-full flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Image src="/osama.jpg" width={50} height={50} alt="Osama-Img" className="rounded-full w-[60px] h-[60px]" />
                <h2 className="text-gray-400 font-medium text-xl">Osamablog</h2>
              </div>
              <p className="text-sm text-gray-500 leading-7 md:pr-6">Passionate Frontend Developer with expertise in building and optimizing Mern-stack web applications. Proven skills
                in problem-solving, teamwork, and communication.</p>
              <div className="social flex gap-2">
                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                <FontAwesomeIcon icon={faFile} className="w-5 h-5" />
              </div>
            </div>
            <div className="foot w-full flex justify-between">
              <div className="">
                <h2 className="underline   font-medium pb-3">Links</h2>
                <ul className="flex flex-col gap-2 text-xs text-gray-500">
                  <Link href="/">Home</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                  <Link href="/login">Login</Link>
                </ul>
              </div>
              <div className="">
                <h2 className="underline  font-medium pb-3">Category</h2>
                <ul className="flex flex-col gap-2 text-xs text-gray-500">
                  <Link href="/filter?category=fashion">Fashion</Link>
                  <Link href="/filter?category=art">Art</Link>
                  <Link href="/filter?category=design">Design</Link>
                  <Link href="/filter?category=food">Food</Link>
                  <Link href="/filter?category=technology">Technology</Link>
                  <Link href="/filter?category=science">Science</Link>
                </ul>

              </div>
              <div className="">
                <h2 className="underline  font-medium pb-3">Social</h2>
                <ul className="flex flex-col gap-2 text-xs text-gray-500">
                  <Link href="https://www.linkedin.com/in/osamaashraf6/">LinkedIn</Link>
                  <Link href="https://twitter.com/OsamaAshraf578">X</Link>
                  <Link href="https://github.com/osamaashraf6">GitHub</Link>
                  <Link href="https://new-portfolio-eight-dun.vercel.app/">Portfolio</Link>
                  <Link href="https://drive.google.com/file/d/1GGTknqJNukGTGUPPwisgAFhks0fZWlJy/view?usp=drive_link">Resume</Link>
                </ul>

              </div>
            </div>
          </div>
          {/* Reserved */}
          <div className="text-sm py-2 md:py-4 border-y-1 border-gray-300 flex justify-between items-center">
            <div className="">All Rights Are &copy; Reserved.</div>
            <div className="">Powered By Osama & 💓</div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
