"use client"
import { TInfoContact } from "@/types/Data";
import { infoContactList } from "@/utils/data";
import React, { useEffect, useState } from "react";
 
function InfoContact() {
    const [infoContact, setInfoContact] = useState<TInfoContact[]>([]);
    useEffect(() => {
        setInfoContact(infoContactList);
    }, []);
    return (
        <>
            <section className="   py-32 ">
                <div className="container text-center">
                    <h3 className="text-orange-400 text-xs font-semibold mb-3">
                        FIND US
                    </h3>
                    <h2 className="text-2xl font-bold mb-10">Contact Info</h2>
                    <div className="infoContact flex flex-col md:flex-row flex-wrap gap-5">
                        {infoContact.map((item) => (
                            <div
                                className="item border   border-gray-300 rounded w-full md:w-[30.5%] p-6 flex flex-col  gap-4 hover:translate-y-[-10px] transition ease duration-300"
                                key={item.id}
                            >
                                <h2 className="text-sm font-bold">{item.title}</h2>
                                <p className="  text-xs leading-6">{item.desc}</p>
                                <p className="text-xs text-orange-500 ">{item.phone}</p>
                                <span className="text-xs">{item.email}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default InfoContact
