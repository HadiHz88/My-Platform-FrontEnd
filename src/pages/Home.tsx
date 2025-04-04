"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/Layout"
import Hero from "@/components/Hero"
import Terminal from "@/components/Terminal"
import type { Project } from "@/components/ProjectCard"
import type { Course } from "@/components/CourseCard"
import axiosInstance from "../utils/axiosInstance"
import { ProfileSection } from "@/components/profile-section"
import { SkillsSection } from "@/components/skills-section"
import { StatsSection } from "@/components/stats-section"
import { TimelineSection } from "@/components/timeline-section"
import { FeaturedSection } from "@/components/featured-section"
import { CTASection } from "@/components/cta-section"
import { motion } from "framer-motion"

const Home = () => {
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
    const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
    const [skills, setSkills] = useState<
        {
            id: number
            name: string
            is_skill: number
            color: string
            icon: string
            category: string
        }[]
    >([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [education, setEducation] = useState<any[]>([])
    const [experience, setExperience] = useState<any[]>([])
    const [profileInfo, setProfileInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        image_url: "",
        facebook_url: "",
        instagram_url: "",
        linkedin_url: "",
        github_url: "",
        youtube_url: "",
        bio: "",
        info: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/home")

                // Extract skills from the response
                setSkills(response.data.skills)

                // Set projects
                setFeaturedProjects(response.data.latestProjects)

                // Set courses
                setFeaturedCourses(response.data.latestCourses)

                // Set education and experience
                setEducation(response.data.educations)
                setExperience(response.data.experiences)

                setProfileInfo(response.data.profileInfo)


                // TODO: Set the Icon

                // Set loading to false
                setLoading(false)
            } catch (err) {
                console.error("Error fetching data:", err)
                setError(true)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <Layout>
            <Hero />

            {/* Profile Preview Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-16 bg-background"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <ProfileSection profileInfo={profileInfo} loading={loading} />

                    {/* Terminal Component */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-8"
                    >
                        <Terminal />
                    </motion.div>

                    {/* Skills section with animation */}
                    <SkillsSection skills={skills} loading={loading} error={error} />
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="py-16 bg-secondary/30"
            >
                <div className="container mx-auto px-4 md:px-6">
                    <StatsSection
                        projectsCount={featuredProjects.length}
                        skillsCount={skills.length}
                        coursesCount={featuredCourses.length}
                    />
                </div>
            </motion.section>

            {/* Education & Experience section with animations */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <TimelineSection education={education} experience={experience} loading={loading} error={error} />
                </div>
            </section>

            {/* Featured Projects Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="py-16 bg-secondary/30"
            >
                <FeaturedSection
                    title="Featured Projects"
                    description="A selection of my recent development work"
                    items={featuredProjects}
                    loading={loading}
                    error={error}
                    linkTo="/projects"
                    type="projects"
                />
            </motion.section>

            {/* Featured Courses Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="py-16 bg-background"
            >
                <FeaturedSection
                    title="Featured Courses"
                    description="University courses with my personal summaries and notes"
                    items={featuredCourses}
                    loading={loading}
                    error={error}
                    linkTo="/courses"
                    type="courses"
                />
            </motion.section>

            {/* CTA Section */}
            <section className="py-16 bg-primary/5">
                <CTASection />
            </section>
        </Layout>
    )
}

export default Home

