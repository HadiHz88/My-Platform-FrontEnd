"use client"

import type React from "react"
import {useEffect, useState} from "react"
import Layout from "@/components/Layout"
import Hero from "@/components/Hero"
import Terminal from "@/components/Terminal"
import ProjectCard, {type Project} from "@/components/ProjectCard"
import CourseCard, {type Course} from "@/components/CourseCard"
import {Link} from "react-router-dom"
import {
    ArrowRight,
    Code,
    BookOpen,
    Briefcase,
    GraduationCap,
    Github,
    Linkedin,
    Mail,
    User,
    Calendar,
    MapPin,
} from "lucide-react"
import {useInView} from "react-intersection-observer"
import axiosInstance from "../utils/axiosInstance"

const TimelineItem = ({
                          icon,
                          date,
                          title,
                          organization,
                          location,
                          children,
                          delay = 0,
                      }: {
    icon: React.ReactNode
    date: string
    title: string
    organization: string
    location?: string
    children?: React.ReactNode
    delay?: number
}) => {
    const {ref, inView} = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <div
            ref={ref}
            className={`relative pl-8 pb-8 group transition-all duration-700 ${
                inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
            style={{transitionDelay: `${delay}ms`}}
        >
            {/* Timeline line */}
            <div className="absolute top-0 left-0 h-full w-px bg-border group-last:bg-transparent"></div>

            {/* Timeline icon */}
            <div
                className="absolute top-0 left-0 -translate-x-1/2 h-6 w-6 flex items-center justify-center rounded-full border bg-background">
                {icon}
            </div>

            {/* Content */}
            <div className="flex flex-col">
                <time className="text-sm text-muted-foreground mb-1 flex items-center">
                    <Calendar className="mr-1 h-3 w-3"/> {date}
                </time>
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span>{organization}</span>
                    {location && (
                        <>
                            <span>•</span>
                            <span className="flex items-center">
                <MapPin className="mr-1 h-3 w-3"/> {location}
              </span>
                        </>
                    )}
                </div>
                {children && <div className="mt-2 text-muted-foreground">{children}</div>}
            </div>
        </div>
    )
}

const StatCard = ({
                      icon,
                      title,
                      value,
                      color,
                  }: { icon: React.ReactNode; title: string; value: string; color: string }) => (
    <div className="flex items-center p-4 bg-card border rounded-lg">
        <div className={`p-2 rounded-full ${color}`}>{icon}</div>
        <div className="ml-4">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
)

const Home = () => {
    // Replace the multiple useEffect hooks with a single one that fetches all data
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
    const [stats, setStats] = useState({
        projectsCompleted: "0",
        technologiesUsed: "0",
        courseSummaries: "0",
        yearsOfStudy: "0",
    })
    const [education, setEducation] = useState<any[]>([])
    const [experience, setExperience] = useState<any[]>([])
    const [profileData, setProfileData] = useState({
        name: "",
        title: "",
        bio: "",
        github: "",
        linkedin: "",
        email: "",
        resumeUrl: "",
        profileImage: "/placeholder.svg",
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

    const {ref: skillsRef, inView: skillsInView} = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <Layout>
            <Hero/>

            {/* Profile Preview Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div
                            className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-4 border-background shadow-lg">
                            {loading ? (
                                <div className="w-full h-full bg-muted animate-pulse"></div>
                            ) : (
                                <img
                                    src={profileData.profileImage || "/placeholder.svg"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-2">Hadi Hijazi</h2>
                            <p className="text-muted-foreground mb-4">Full Stack Developer & CS Student</p>
                            <p className="mb-4 max-w-xl">
                                I'm a passionate software developer focusing on web technologies and software
                                engineering. Currently
                                pursuing a Computer Science degree while building projects with React, TypeScript, and
                                Laravel.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors splash-hover"
                                >
                                    <Github className="mr-1.5 h-4 w-4"/>
                                    GitHub
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors splash-hover"
                                >
                                    <Linkedin className="mr-1.5 h-4 w-4"/>
                                    LinkedIn
                                </a>
                                <a
                                    href="mailto:contact@example.com"
                                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors splash-hover"
                                >
                                    <Mail className="mr-1.5 h-4 w-4"/>
                                    Email
                                </a>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors splash-hover"
                                    rel="noreferrer"
                                >
                                    <User className="mr-1.5 h-4 w-4"/>
                                    Resume
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Component */}
                    <div className="mt-8">
                        <Terminal/>
                    </div>

                    {/* Skills section with animation */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-bold mb-4">Skills & Technologies</h3>
                        {loading ? (
                            <div className="flex flex-wrap gap-2">
                                {[...Array(10)].map((_, index) => (
                                    <div key={index}
                                         className="px-3 py-1 bg-muted rounded-full h-8 w-24 animate-pulse"></div>
                                ))}
                            </div>
                        ) : error ? (
                            <p className="text-destructive">Failed to load skills. Please try again later.</p>
                        ) : (
                            <div ref={skillsRef} className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <div className="splash-hover">
                                        <span
                                            key={skill.id}
                                            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-700 ease-out flex items-center gap-1.5"
                                            style={{
                                                transform: skillsInView ? "translateX(0)" : "translateX(-100px)",
                                                opacity: skillsInView ? 1 : 0,
                                                transitionDelay: `${index * 100}ms`,
                                                backgroundColor: `${skill.color}20`, // Using the color with 20% opacity
                                                color: skill.color,
                                                borderColor: `${skill.color}40`,
                                                borderWidth: "1px",
                                            }}
                                        >
                                        <i className={skill.icon}></i>
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            icon={<Code className="h-5 w-5 text-blue-600"/>}
                            title="Projects Completed"
                            value={featuredProjects.length.toString()}
                            color="bg-blue-100"
                        />
                        <StatCard
                            icon={<Briefcase className="h-5 w-5 text-purple-600"/>}
                            title="Technologies Used"
                            value={skills.length.toString()}
                            color="bg-purple-100"
                        />
                        <StatCard
                            icon={<BookOpen className="h-5 w-5 text-green-600"/>}
                            title="Course Summaries"
                            value={featuredCourses.length.toString()}
                            color="bg-green-100"
                        />
                        <StatCard
                            icon={<GraduationCap className="h-5 w-5 text-amber-600"/>}
                            title="Years of Study"
                            value="4"
                            color="bg-amber-100"
                        />
                    </div>
                </div>
            </section>

            {/* Education & Experience section with animations */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Education */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <GraduationCap className="mr-2 h-5 w-5"/>
                                Education
                            </h2>
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
                                    <p className="text-destructive">Failed to load education data. Please try again
                                        later.</p>
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
                                                icon={<GraduationCap className="h-3 w-3"/>}
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
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <Briefcase className="mr-2 h-5 w-5"/>
                                Experience
                            </h2>
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
                                    <p className="text-destructive">Failed to load experience data. Please try again
                                        later.</p>
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
                                                icon={<Briefcase className="h-3 w-3"/>}
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
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-16 bg-secondary/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
                            <p className="text-muted-foreground mt-2">A selection of my recent development work</p>
                        </div>
                        <Link
                            to="/projects"
                            className="hidden sm:flex items-center text-primary hover:text-primary/90 transition-colors"
                        >
                            View all projects
                            <ArrowRight className="ml-1 h-4 w-4"/>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            [...Array(3)].map((_, index) => (
                                <div key={index}
                                     className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
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
                            <div className="col-span-3 text-center text-destructive">
                                Failed to load projects. Please try again later.
                            </div>
                        ) : featuredProjects.length === 0 ? (
                            <div className="col-span-3 text-center text-muted-foreground">No projects found.</div>
                        ) : (
                            featuredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} className="animate-fade-up"/>
                            ))
                        )}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            to="/projects"
                            className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
                        >
                            View all projects
                            <ArrowRight className="ml-1 h-4 w-4"/>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Courses Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
                            <p className="text-muted-foreground mt-2">University courses with my personal summaries and
                                notes</p>
                        </div>
                        <Link
                            to="/courses"
                            className="hidden sm:flex items-center text-primary hover:text-primary/90 transition-colors"
                        >
                            View all courses
                            <ArrowRight className="ml-1 h-4 w-4"/>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            [...Array(3)].map((_, index) => (
                                <div key={index}
                                     className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
                                    <div className="p-6 space-y-4">
                                        <div className="h-6 bg-muted rounded w-3/4"></div>
                                        <div className="h-4 bg-muted rounded w-1/2"></div>
                                        <div className="h-20 bg-muted rounded"></div>
                                        <div className="flex gap-2">
                                            {[...Array(2)].map((_, i) => (
                                                <div key={i} className="h-6 bg-muted rounded w-16"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : error ? (
                            <div className="col-span-3 text-center text-destructive">
                                Failed to load courses. Please try again later.
                            </div>
                        ) : featuredCourses.length === 0 ? (
                            <div className="col-span-3 text-center text-muted-foreground">No courses found.</div>
                        ) : (
                            featuredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} className="animate-fade-up"/>
                            ))
                        )}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Link
                            to="/courses"
                            className="inline-flex items-center text-primary hover:text-primary/90 transition-colors"
                        >
                            View all courses
                            <ArrowRight className="ml-1 h-4 w-4"/>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-primary/5">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to collaborate?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                        vision.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center px-5 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        Get in touch
                        <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                </div>
            </section>
        </Layout>
    )
}

export default Home

