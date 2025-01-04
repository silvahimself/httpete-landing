'use client'

import { useState } from "react";
import ContactForm from "./ContactForm";
import FAQ from "./FAQ";
import Features from "./Features";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Pete from "./Pete";
import Pricing from "./Pricing";

const Landing = () => {
    const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);

    return (
        <>
      <Header />
      <main className="min-h-screen bg-gray-900 text-gray-100">
        <Hero openWaitlistModal={() => setWaitlistModalOpen(true)} />
        <Features />
        <Pricing openWaitlistModal={() => setWaitlistModalOpen(true)} />
        <Pete />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
    )
}

export default Landing;