"use client"
import CategoryLayout from "@/components/CategoryLayout";
import Popular from "@/components/Popular";
import Recent from "@/components/Recent";
import { useSearchParams } from "next/navigation";


function FilterPage() {
    const searchParams = useSearchParams();
    const category = searchParams!.get("category");
    return (
        <>
            <section className="pt-4 pb-16">
                <div className="container">
                    <div className="font-bold text-xl py-2 text-center bg-[#f57a4e] mb-6 capitalize">{category}</div>
                    <div className="items flex flex-col md:flex-row gap-12">
                        <Recent />
                        <div className="item flex flex-col gap-12 md:w-[25%]">
                            <Popular />
                            <CategoryLayout />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FilterPage
