import AboutPage from '@/pages/About'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: {
        absolute: "About"
    },
};
function About() {
    return (
        <>
            <AboutPage />
        </>
    )
}

export default About
