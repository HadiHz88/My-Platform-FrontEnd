"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"

interface Skill {
  id: number
  name: string
  is_skill: number
  color: string
  icon: string
  category: string
}

interface SkillsSectionProps {
  skills: Skill[]
  loading: boolean
  error: boolean
}

export function SkillsSection({ skills, loading, error }: SkillsSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-4">Skills & Technologies</h3>
      {loading ? (
        <div className="flex flex-wrap gap-2">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="px-3 py-1 bg-muted rounded-full h-8 w-24 animate-pulse"></div>
          ))}
        </div>
      ) : error ? (
        <p className="text-destructive">Failed to load skills. Please try again later.</p>
      ) : (
        <div ref={ref} className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="space-y-2"
            >
              <h4 className="text-sm font-medium text-muted-foreground">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + categoryIndex * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="splash-hover"
                  >
                    <span
                      className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${skill.color}20`,
                        color: skill.color,
                        borderColor: `${skill.color}40`,
                        borderWidth: "1px",
                        boxShadow: `0 2px 10px ${skill.color}10`,
                      }}
                    >
                      <i className={skill.icon}></i>
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

