"use client"

import { GraduationCap, Briefcase } from "lucide-react"
import { TimelineItem } from "./timeline-item.tsx"
import { motion } from "framer-motion"

interface TimelineData {
  id: number
  title: string
  description: string
  organization: string
  location: string
  start_date: string
  end_date: string
  current: number
}

interface TimelineSectionProps {
  education: TimelineData[]
  experience: TimelineData[]
  loading: boolean
  error: boolean
}

export function TimelineSection({ education, experience, loading, error }: TimelineSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Education */}
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4 flex items-center"
        >
          <GraduationCap className="mr-2 h-5 w-5" />
          Education
        </motion.h2>
        <div className="mt-4 space-y-2">
          {loading ? (
            [...Array(2)].map((_, index) => (
              <div key={index} className="pl-8 pb-8 animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                <div className="h-6 bg-muted rounded w-64 mb-2"></div>
                <div className="h-4 bg-muted rounded w-48"></div>
              </div>
            ))
          ) : error ? (
            <p className="text-destructive">Failed to load education data. Please try again later.</p>
          ) : education.length === 0 ? (
            <p className="text-muted-foreground">No education data available.</p>
          ) : (
            education.map((item, index) => {
              const startDate = new Date(item.start_date).getFullYear()
              const endDate = item.current ? "Present" : new Date(item.end_date).getFullYear()
              const dateString = `${startDate} - ${endDate}`

              return (
                <TimelineItem
                  key={item.id}
                  icon={<GraduationCap className="h-3 w-3" />}
                  date={dateString}
                  title={item.title}
                  organization={item.organization}
                  location={item.location}
                  delay={index * 200}
                >
                  {item.description && <p>{item.description}</p>}
                </TimelineItem>
              )
            })
          )}
        </div>
      </div>

      {/* Experience */}
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-bold mb-4 flex items-center"
        >
          <Briefcase className="mr-2 h-5 w-5" />
          Experience
        </motion.h2>
        <div className="mt-4 space-y-2">
          {loading ? (
            [...Array(2)].map((_, index) => (
              <div key={index} className="pl-8 pb-8 animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                <div className="h-6 bg-muted rounded w-64 mb-2"></div>
                <div className="h-4 bg-muted rounded w-48"></div>
              </div>
            ))
          ) : error ? (
            <p className="text-destructive">Failed to load experience data. Please try again later.</p>
          ) : experience.length === 0 ? (
            <p className="text-muted-foreground">No experience data available.</p>
          ) : (
            experience.map((item, index) => {
              const startDate = new Date(item.start_date).getFullYear()
              const endDate = item.current ? "Present" : new Date(item.end_date).getFullYear()
              const dateString = `${startDate} - ${endDate}`

              return (
                <TimelineItem
                  key={item.id}
                  icon={<Briefcase className="h-3 w-3" />}
                  date={dateString}
                  title={item.title}
                  organization={item.organization}
                  location={item.location}
                  delay={index * 200}
                >
                  {item.description && <p>{item.description}</p>}
                </TimelineItem>
              )
            })
          )}
        </div>
      </div>
    </motion.div>
  )
}

