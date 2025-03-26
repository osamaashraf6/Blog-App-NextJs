import React from 'react'

function FormContact() {
  return (
      <>
          <section className="  bg-[url('/dot-bg.png')] bg-cover bg-center flex justify-center items-center shadow-lg py-10">
              <div className="container flex flex-col justify-center items-center">
                  <h3 className="text-orange-400 text-xs font-semibold pb-5">
                      LET'S TALK
                  </h3>
                  <h2 className="text-2xl font-bold pb-14">Contact Us </h2>
                  <form className="flex  flex-col  gap-6 w-[60vw]">
                      <div className="form-control flex gap-3 w-full">
                          <input
                              type="text"
                              className="focus:border focus:border-gray-300 p-2 outline-0 placeholder:text-xs border border-gray-300 rounded w-2/4 shadow-lg placeholder:text-amber-500"
                              placeholder="Your Name"
                          />
                          <input
                              type="email"
                              className="focus:border focus:border-gray-300 p-2 outline-0 placeholder:text-xs border border-gray-300 rounded w-2/4 shadow-lg placeholder:text-amber-500"
                              placeholder="Your Email"
                          />
                      </div>
                      <div className="form-control flex gap-3 w-full">
                          <input
                              type="text"
                              className="focus:border focus:border-gray-300 p-2 outline-0 placeholder:text-xs border border-gray-300 rounded w-2/4 shadow-lg placeholder:text-amber-500"
                              placeholder="Your Phone"
                          />
                          <input
                              type="text"
                              className="focus:border focus:border-gray-300 p-2 outline-0 placeholder:text-xs border border-gray-300 rounded w-2/4 shadow-lg placeholder:text-amber-500"
                              placeholder="Your Subject"
                          />
                      </div>
                      <div className="form-control w-full">
                          <textarea
                            
                              placeholder="Your Message"
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

export default FormContact
