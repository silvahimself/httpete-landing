import Link from "next/link";
import * as dotenv from 'dotenv';
import Header from "~/components/landing/Header";
import Hero from "~/components/landing/Hero";
import Features from "~/components/landing/Features";
import ContactForm from "~/components/landing/ContactForm";
import FAQ from "~/components/landing/FAQ";
import Footer from "~/components/landing/Footer";
import Pricing from "~/components/landing/Pricing";

// Load environment variables from .env file
dotenv.config();

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-900 text-gray-100">
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
