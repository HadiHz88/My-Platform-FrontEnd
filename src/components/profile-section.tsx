"use client"

import type React from "react"

import { Github, Linkedin, Mail, User } from "lucide-react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

interface ProfileSectionProps {
    profileImage: string
    loading: boolean
}

export function ProfileSection({ profileImage, loading }: ProfileSectionProps) {
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-4 border-background shadow-lg"
            >
                {loading ? (
                    <Skeleton className="w-full h-full rounded-full" />
                ) : (
                    <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 text-center md:text-left"
            >
                <h2 className="text-2xl font-bold mb-2">Hadi Hijazi</h2>
                <p className="text-muted-foreground mb-4">Full Stack Developer & CS Student</p>
                <p className="mb-4 max-w-xl">
                    I'm a passionate software developer focusing on web technologies and software engineering. Currently pursuing
                    a Computer Science degree while building projects with React, TypeScript, and Laravel.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <SocialLink href="https://github.com" icon={<Github className="mr-1.5 h-4 w-4" />} label="GitHub" />
                    <SocialLink href="https://linkedin.com" icon={<Linkedin className="mr-1.5 h-4 w-4" />} label="LinkedIn" />
                    <SocialLink href="mailto:contact@example.com" icon={<Mail className="mr-1.5 h-4 w-4" />} label="Email" />
                    <SocialLink href="/resume.pdf" icon={<User className="mr-1.5 h-4 w-4" />} label="Resume" />
                </div>
            </motion.div>
        </div>
    )
}

interface SocialLinkProps {
    href: string
    icon: React.ReactNode
    label: string
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
    return (
        <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors splash-hover"
        >
            {icon}
            {label}
        </motion.a>
    )
}

