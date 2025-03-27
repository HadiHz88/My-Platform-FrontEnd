"use client"

import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 md:px-6 text-center"
    >
      <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to collaborate?</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Get in touch
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  )
}

