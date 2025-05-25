'use client';

import { motion } from "framer-motion";
import Cta from "../components/Cta";
import Feature from "../components/Feature";
import Hero from "../components/Hero";


const scrollVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut"
    }
  }
};

export default function ShadcnLandingPage() {
  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
      >
        <Feature />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={scrollVariants}
      >
        <Cta />
      </motion.div>
    </>
  );
}
