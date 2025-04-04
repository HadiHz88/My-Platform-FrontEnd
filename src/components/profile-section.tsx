"use client"

import type React from "react"

import { Github, Linkedin, Mail, User, Facebook, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import AnimatedBackground from "./AnimatedBackground"

interface ProfileSectionProps {
    profileInfo: {
        name: string
        email: string
        phone: string
        address: string
        image_url: string
        facebook_url: string
        instagram_url: string
        linkedin_url: string
        github_url: string
        youtube_url: string
        bio: string
        info: string
    }
    loading: boolean
}

export function ProfileSection({ profileInfo, loading }: ProfileSectionProps) {
    return (
        <div className="flex flex-col md:flex-row gap-8 items-center">
            <AnimatedBackground variant="gradient" />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-4 border-background shadow-lg"
            >
                {loading ? (
                    <Skeleton className="w-full h-full rounded-full" />
                ) : (
                    <img src={profileInfo.image_url || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 text-center md:text-left"
            >
                <h2 className="text-2xl font-bold mb-2">{profileInfo.name}</h2>
                <p className="text-muted-foreground mb-4">{profileInfo.info}</p>
                <p className="mb-4 max-w-xl">{profileInfo.bio}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    {profileInfo.github_url && (
                        <SocialLink href={profileInfo.github_url} icon={<Github className="mr-1.5 h-4 w-4" />} label="GitHub" />
                    )}
                    {profileInfo.linkedin_url && (
                        <SocialLink href={profileInfo.linkedin_url} icon={<Linkedin className="mr-1.5 h-4 w-4" />} label="LinkedIn" />
                    )}
                    {profileInfo.email && (
                        <SocialLink href={`mailto:${profileInfo.email}`} icon={<Mail className="mr-1.5 h-4 w-4" />} label="Email" />
                    )}
                    {profileInfo.facebook_url && (
                        <SocialLink href={profileInfo.facebook_url} icon={<Facebook className="mr-1.5 h-4 w-4" />} label="Facebook" />
                    )}
                    {profileInfo.instagram_url && (
                        <SocialLink href={profileInfo.instagram_url} icon={<Instagram className="mr-1.5 h-4 w-4" />} label="Instagram" />
                    )}
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

