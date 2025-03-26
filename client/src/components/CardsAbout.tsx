"use client";
import { TCardsList } from "@/types/Data";
import { cardsList } from "@/utils/data";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function CardsAbout() {
    const [cards, setCards] = useState<TCardsList[]>([]);
    useEffect(() => {
        setCards(cardsList);
    }, []);
    return (
        <>
            <section className="  py-20">
                <div className="container">
                    <div className="cards flex flex-col md:flex-row gap-5">
                        {cards.map((card) => (
                            <div
                                className="card border border-gray-300 rounded w-full md:w-[33%] p-6 flex flex-col justify-center items-center gap-4 hover:translate-y-[-10px] transition ease duration-300"
                                key={card.id}
                            >
                                <Image src="/cards-about.jpeg" width={50} height={50} alt="Osama-Img" className="rounded-full w-[100px] h-[100px]" />

                                <h2 className="text-sm font-bold">{card.title}</h2>
                                <p className=" text-center text-xs leading-6">{card.desc}</p>
                                <Link
                                    href=""
                                    className="flex items-center text-xs text-amber-500 font-semibold gap-2"
                                >
                                    <FontAwesomeIcon icon={faArrowRightLong} className="w-3" />
                                    Learn More
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default CardsAbout
