
"use client"

import { useState } from "react"
import { motion, Variants } from "motion/react"

export default function About() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const experiences = [
        {
            period: "Aug, 2024 - Oct, 2024",
            title: "Frontend Developer (React, React-Native)",
        },

        {
            period: "Nov, 2024 - April, 2025",
            title: "Backend Developer",
            description:
                "Created backend for a logistic mobile application, using Express, Prisma, Postgress, Implemented websockets and payment gateways.",
        },
        {
            period: "Aug, 2025 - Present",
            title: "Full Stack Developer",
            description:
                "Created user friendly website, for users to buy cars. Build using modern frameworks and libraries.",
        },
    ]

    const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "Web Design", "UI/UX"]

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    }

    return (
        <div className="min-h-screen dark:bg-background w-full text-neutral-950 dark:text-neutral-100">

            {/* Hero Section */}
            <motion.section
                className="px-6 py-20 sm:px-8 lg:px-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

                        {/* Left Column */}
                        <motion.div className="flex flex-col justify-center space-y-8" variants={container} initial="hidden" animate="show">
                            <motion.div variants={item} className="space-y-4">
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-neutral-950 dark:text-neutral-100">
                                    About Me
                                </h1>
                                <p className="text-xl leading-relaxed text-neutral-800 dark:text-neutral-300">
                                    Frontend Developer & Designer
                                </p>
                            </motion.div>

                            <motion.div variants={item} className="h-1 w-16 bg-neutral-600/30 dark:bg-neutral-400/30" />

                            <motion.div variants={item} className="space-y-4">
                                <p className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-300">
                                    I&apos;m passionate about crafting elegant, accessible digital experiences that combine thoughtful design
                                    with robust engineering. My journey in web development spans over years, working across diverse
                                    projects and teams.
                                </p>
                                <p className="text-lg leading-relaxed text-neutral-800 dark:text-neutral-300">
                                    I specialize in modern web technologies and believe in building products that are not just functional,
                                    but delightful to use.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Right Column - Stats */}
                        <motion.div className="flex flex-col space-y-12" variants={container} initial="hidden" animate="show">
                            <motion.div variants={item} className="space-y-2">
                                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-widest uppercase">
                                    Experience
                                </div>
                                <div className="text-5xl font-bold text-neutral-950 dark:text-neutral-100">2+</div>
                                <p className="text-neutral-700 dark:text-neutral-400">Years of professional development</p>
                            </motion.div>

                            <motion.div variants={item} className="space-y-2">
                                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-widest uppercase">
                                    Projects
                                </div>
                                <div className="text-5xl font-bold text-neutral-950 dark:text-neutral-100">3</div>
                                <p className="text-neutral-700 dark:text-neutral-400">Successfully completed projects</p>
                            </motion.div>

                            <motion.div variants={item} className="space-y-2">
                                <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 tracking-widest uppercase">
                                    Tech Stack
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skills.slice(0, 4).map((skill, index) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            className="px-4 py-2 rounded-full text-sm font-medium bg-linear-to-br from-neutral-200 via-neutral-300 to-neutral-500 cursor-pointer dark:bg-linear-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-950 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </motion.section>

            {/* Experience Section */}
            <motion.section
                className="px-6 py-20 sm:px-8 lg:px-12 border-t border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <div className="mx-auto max-w-7xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-12 tracking-tight text-neutral-950 dark:text-neutral-100"
                    >
                        Experience
                    </motion.h2>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className={`p-6 rounded-lg border  transition-all duration-300 cursor-pointer ${hoveredIndex === index
                                    ? "border-neutral-500/60 border-dashed bg-neutral-200/50 dark:bg-neutral-800/50"
                                    : "border-neutral-400 border-dashed bg-neutral-100/50 dark:bg-neutral-900/50 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40"
                                    }`}
                            >
                                <motion.div
                                    animate={{ x: hoveredIndex === index ? 8 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-3"
                                >
                                    <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                        {exp.period}
                                    </div>
                                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                        {exp.title}
                                    </h3>
                                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Skills Section */}
            <motion.section
                className="px-6 py-20 sm:px-8 lg:px-12 border-t border-border"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3 }}
            >
                <div className="mx-auto max-w-7xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-12 tracking-tight text-neutral-950 dark:text-neutral-100"
                    >
                        Skills & Technologies
                    </motion.h2>

                    <motion.div
                        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        {skills.map((skill) => (
                            <motion.div
                                key={skill}
                                variants={item}
                                whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.1 } }}
                                className="group p-6 rounded-lg border border-dashed border-neutral-400/40 bg-neutral-100/50 dark:bg-neutral-900/50 text-center transition-all duration-300 hover:border-neutral-500/40 hover:bg-neutral-100/20 dark:hover:bg-neutral-800/50"
                            >
                                <p className="font-medium text-neutral-800 dark:text-neutral-300 group-hover:text-neutral-950 dark:group-hover:text-neutral-100 transition-all">
                                    {skill}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section >

        </div >
    )
}

