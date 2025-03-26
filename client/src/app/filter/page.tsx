import React from 'react'
import FilterPage from '@/pages/Filter'
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
