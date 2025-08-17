"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Code, Database, Globe, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex fixed top-0 py-5 left-0 right-0 bg-black/80 backdrop-blur-lg z-30 items-center justify-between p-3 border-b border-gray-800"
      >
        <h2 className="sm:text-sm text-xs md:text-xl font-bold cursor-pointer">
          PORTFOLIO <span className="text-orange-600">HELPER</span>
        </h2>
        <p className="font-semibold text-xs md:text-sm">
          Create API/Backend{" "}
          <Link
            href="/login"
            className="text-orange-600 hover:underline transition"
          >
            Now, For Portfolio
          </Link>
        </p>
      </motion.div>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 px-6 md:px-12 lg:px-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold leading-tight"
        >
          Build <span className="text-orange-600">Powerful APIs</span> <br /> For
          Your Portfolio in Minutes ⚡
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-gray-300 max-w-2xl mx-auto"
        >
          Forget long setups. With <b>Portfolio Helper</b>, create production
          ready APIs & backends for your portfolio projects instantly. Designed
          for developers who want to <b>show skills</b>, not spend weeks on
          boilerplate.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Image
            src="/home.png" // replace with a demo screenshot
            alt="Portfolio API Demo"
            width={800}
            height={400}
            className="rounded-2xl shadow-lg mx-auto border border-gray-800"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-center mb-12"
        >
          🚀 Why Choose <span className="text-orange-600">Portfolio Helper?</span>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Code className="w-10 h-10 text-orange-600" />,
              title: "Instant APIs",
              desc: "Skip setup — generate fully working APIs in seconds.",
            },
            {
              icon: <Database className="w-10 h-10 text-orange-600" />,
              title: "Neon DB Ready",
              desc: "Connect seamlessly with modern databases like Neon.",
            },
            {
              icon: <Globe className="w-10 h-10 text-orange-600" />,
              title: "CORS-Free Access",
              desc: "Call your APIs from any frontend app or plain HTML.",
            },
            {
              icon: <Shield className="w-10 h-10 text-orange-600" />,
              title: "Secure by Default",
              desc: "JWT authentication & password checks built-in.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-black/40 p-6 rounded-2xl shadow-lg border border-gray-800"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-black/50 border-t border-gray-800 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold mb-8"
        >
          👨‍💻 About the Developer
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto bg-black/40 rounded-2xl shadow-lg p-6 border border-gray-800"
        >
          <Image
            src="/HomeImage.jpg" // add your own photo
            alt="Developer"
            width={120}
            height={120}
            className="rounded-full mx-auto mb-4 border-2 border-orange-600"
          />
          <h3 className="text-xl font-semibold">Prajwal Neupane</h3>
          <p className="text-gray-400 text-sm mt-2">
            Fullstack Web Developer specialized in <b>Next.js</b>,{" "}
            <b>NestJS</b>, and <b>modern APIs</b>. I build clean, scalable, and
            production-grade solutions with a focus on developer experience.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              href="https://github.com/prajwal003-web-developer"
              className="text-gray-400 hover:text-white"
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/prajwal003/"
              className="text-gray-400 hover:text-white"
            >
              LinkedIn
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Portfolio Helper — Built  by{" "}
        <span className="text-orange-600 font-semibold">Prajwal</span>
      </footer>
    </div>
  );
}
