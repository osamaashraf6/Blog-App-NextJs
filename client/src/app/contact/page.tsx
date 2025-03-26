import React from 'react'
import ChooseContact from '@/components/ChooseContact'
import FormContact from '@/components/FormContact'
import InfoContact from '@/components/InfoContact'
import LandingContact from '@/components/LandingContact'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: {
    absolute: "Contact"
  },
};
function Contact() {
  return (
    <>
      <LandingContact />
      <FormContact />
      <ChooseContact />
      <InfoContact />
    </>
  )
}

export default Contact
