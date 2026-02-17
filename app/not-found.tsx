"use client"

import { motion, Variants, useMotionValue, useSpring, useTransform } from "motion/react"
import Link from "next/link"
import { useEffect,  useRef, useState } from "react"

// // Floating particles
// const particles = Array.from({ length: 12 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 3 + 1,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     duration: Math.random() * 6 + 4,
//     delay: Math.random() * 3,
// }))

export default function NotFound() {
    const ref = useRef<HTMLDivElement>(null)
    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)
    const x = useSpring(rawX, { stiffness: 100, damping: 20, mass: 0.5 })
    const y = useSpring(rawY, { stiffness: 100, damping: 20, mass: 0.5 })
    const [particles, setParticles] = useState<
        {
            id: number
            size: number
            x: number
            y: number
            duration: number
            delay: number
        }[]
    >([])

    useEffect(() => {
        const generated = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            size: Math.random() * 3 + 1,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 6 + 4,
            delay: Math.random() * 3,
        }))
        setParticles(generated)
    }, [])
    const backgroundLight = useTransform([x, y], ([lx, ly]) =>
        `radial-gradient(500px circle at ${lx}px ${ly}px, rgba(82,82,82,0.1) 0%, rgba(64,64,64,0.04) 40%, transparent 70%)`
    )
    const backgroundDark = useTransform([x, y], ([lx, ly]) =>
        `radial-gradient(500px circle at ${lx}px ${ly}px, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)`
    )

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = ref.current?.getBoundingClientRect()
        if (!bounds) return
        rawX.set(e.clientX - bounds.left)
        rawY.set(e.clientY - bounds.top)
    }

    // Glitch animation for "404"
    const glitchVariants: Variants = {
        idle: { x: 0, textShadow: "none" },
        glitch: {
            x: [0, -4, 4, -2, 2, 0],
            textShadow: [
                "none",
                "-3px 0 rgba(82,82,82,0.6), 3px 0 rgba(150,150,150,0.4)",
                "3px 0 rgba(82,82,82,0.6), -3px 0 rgba(150,150,150,0.4)",
                "none",
            ],
            transition: {
                duration: 0.4,
                repeat: Infinity,
                repeatDelay: 3,
            },
        },
    }

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.3 },
        },
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 24 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen dark:bg-neutral-950 bg-neutral-50 flex items-center max-w-6xl w-full justify-center overflow-hidden"
        >
            {/* Mouse-tracking light — light mode */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 dark:hidden"
                style={{ background: backgroundLight }}
            />
            {/* Mouse-tracking light — dark mode */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 hidden dark:block"
                style={{ background: backgroundDark }}
            />

            {/* Floating background particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-neutral-400/20 dark:bg-neutral-600/20 pointer-events-none"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [-10, 10, -10],
                        opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Dashed border grid lines — decorative */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.06]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(82,82,82,1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(82,82,82,1) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Main content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-2xl mx-auto"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {/* 404 big number */}
                <motion.div variants={item}>
                    <motion.h1
                        className="font-rubik text-[10rem] sm:text-[14rem] font-bold leading-none tracking-tighter text-neutral-950 dark:text-neutral-100 select-none"
                        variants={glitchVariants}
                        initial="idle"
                        animate="glitch"
                    >
                        404
                    </motion.h1>
                </motion.div>

                {/* Divider */}
                <motion.div
                    variants={item}
                    className="h-px w-24 mx-auto bg-neutral-400/40 dark:bg-neutral-600/40 my-6"
                />

                {/* Title */}
                <motion.h2
                    variants={item}
                    className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 mb-4"
                >
                    Page not found
                </motion.h2>

                {/* Description */}
                <motion.p
                    variants={item}
                    className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-10"
                >
                    Looks like you wandered somewhere that doesn&apos;t exist.
                    <br />
                    Let&apos;s get you back on track.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={item}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/">
                        <motion.div
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="px-8 py-3 rounded-lg border border-dashed border-neutral-400 dark:border-neutral-600 bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 font-medium text-sm tracking-wide hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80 hover:border-neutral-500 dark:hover:border-neutral-500 transition-colors cursor-pointer"
                        >
                            ← Back to Home
                        </motion.div>
                    </Link>

                    <Link href="/about">
                        <motion.div
                            whileHover={{ y: -3, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="px-8 py-3 rounded-lg border border-dashed border-neutral-300/60 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-400 font-medium text-sm tracking-wide hover:bg-neutral-100/50 dark:hover:bg-neutral-900/50 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                        >
                            About Me
                        </motion.div>
                    </Link>
                </motion.div>

                {/* Bottom label */}
                <motion.p
                    variants={item}
                    className="mt-16 text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-600"
                >
                    Error 404 · Page not found
                </motion.p>
            </motion.div>
        </div>
    )
}
