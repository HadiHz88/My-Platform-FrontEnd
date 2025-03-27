"use client"

import type React from "react"

import { Calendar, MapPin } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

interface TimelineItemProps {
  icon: React.ReactNode
  date: string
  title: string
  organization: string
  location?: string
  children?: React.ReactNode
  delay?: number
}

export function TimelineItem({ icon, date, title, organization, location, children, delay = 0 }: TimelineItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="relative pl-8 pb-8 group"
    >
      {/* Timeline line */}
      <div className="absolute top-0 left-0 h-full w-px bg-border group-last:bg-transparent"></div>

      {/* Timeline icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: delay / 1000 + 0.2 }}
        className="absolute top-0 left-0 -translate-x-1/2 h-6 w-6 flex items-center justify-center rounded-full border bg-background"
      >
        {icon}
      </motion.div>

      {/* Content */}
      <div className="flex flex-col">
        <time className="text-sm text-muted-foreground mb-1 flex items-center">
          <Calendar className="mr-1 h-3 w-3" /> {date}
        </time>
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{organization}</span>
          {location && (
            <>
              <span>•</span>
              <span className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" /> {location}
              </span>
            </>
          )}
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3, delay: delay / 1000 + 0.4 }}
            className="mt-2 text-muted-foreground"
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

