import React from 'react'
import FilterPage from '@/padges/Filter'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: {
        absolute: "Filter"
    },
};
function Filter() {
    return (
        <>
            <FilterPage />
        </>
    )
}

export default Filter
