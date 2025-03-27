"use client"

import type React from "react"

import { Code, BookOpen, Briefcase, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  color: string
  delay?: number
}

function StatCard({ icon, title, value, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="flex items-center p-4 bg-card border rounded-lg transition-all duration-300"
    >
      <div className={`p-2 rounded-full ${color}`}>{icon}</div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </motion.div>
  )
}

interface StatsSectionProps {
  projectsCount: number
  skillsCount: number
  coursesCount: number
}

export function StatsSection({ projectsCount, skillsCount, coursesCount }: StatsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={<Code className="h-5 w-5 text-blue-600" />}
        title="Projects Completed"
        value={projectsCount.toString()}
        color="bg-blue-100"
        delay={0.1}
      />
      <StatCard
        icon={<Briefcase className="h-5 w-5 text-purple-600" />}
        title="Technologies Used"
        value={skillsCount.toString()}
        color="bg-purple-100"
        delay={0.2}
      />
      <StatCard
        icon={<BookOpen className="h-5 w-5 text-green-600" />}
        title="Course Summaries"
        value={coursesCount.toString()}
        color="bg-green-100"
        delay={0.3}
      />
      <StatCard
        icon={<GraduationCap className="h-5 w-5 text-amber-600" />}
        title="Years of Study"
        value="4"
        color="bg-amber-100"
        delay={0.4}
      />
    </div>
  )
}

