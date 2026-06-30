import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Industries from '../components/Industries'
import TechnologyStack from '../components/TechnologyStack'
import DevelopmentProcess from '../components/DevelopmentProcess'
import Portfolio from '../components/Portfolio'
import CallToAction from '../components/CallToAction'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Industries />
        <TechnologyStack />
        <DevelopmentProcess />
        <Portfolio preview={true} />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
