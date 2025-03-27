"use client"

import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import ProjectCard, { type Project } from "@/components/ProjectCard"
import CourseCard, { type Course } from "@/components/CourseCard"

interface FeaturedSectionProps {
  title: string
  description: string
  items: Project[] | Course[]
  loading: boolean
  error: boolean
  linkTo: string
  type: "projects" | "courses"
}

export function FeaturedSection({ title, description, items, loading, error, linkTo, type }: FeaturedSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-end mb-8"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>
        <Link to={linkTo} className="hidden sm:flex items-center text-primary hover:text-primary/90 transition-colors">
          View all {type}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {loading ? (
          [...Array(3)].map((_, index) => (
            <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
              <div className="p-6 space-y-4">
                <div className="h-40 bg-muted rounded"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-20 bg-muted rounded"></div>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-6 bg-muted rounded w-16"></div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-3 text-center text-destructive">Failed to load {type}. Please try again later.</div>
        ) : items.length === 0 ? (
          <div className="col-span-3 text-center text-muted-foreground">No {type} found.</div>
        ) : (
          items.map((item, index) => (
            <motion.div key={item.id} variants={item}>
              {type === "projects" ? (
                <ProjectCard project={item as Project} className="h-full" />
              ) : (
                <CourseCard course={item as Course} className="h-full" />
              )}
            </motion.div>
          ))
        )}
      </motion.div>

      <div className="mt-8 text-center sm:hidden">
        <Link to={linkTo} className="inline-flex items-center text-primary hover:text-primary/90 transition-colors">
          View all {type}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

