'use client'
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
    const ref = useRef<HTMLDivElement>(null)

    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)

    // Smooth out the mouse tracking with springs
    const x = useSpring(rawX, { stiffness: 100, damping: 20, mass: 0.5 })
    const y = useSpring(rawY, { stiffness: 100, damping: 20, mass: 0.5 })

    // Build the gradient string reactively
    const background = useTransform([x, y], ([latestX, latestY]) =>
        `radial-gradient(500px circle at ${latestX}px ${latestY}px, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, transparent 70%)`
    )

    const backgroundLight = useTransform([x, y], ([latestX, latestY]) =>
        `radial-gradient(500px circle at ${latestX}px ${latestY}px, rgba(82,82,82,0.40) 0%, rgba(64,64,64,0.35) 40%, transparent 70%)`
    )

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const bounds = ref.current?.getBoundingClientRect()
        if (!bounds) return
        rawX.set(e.clientX - bounds.left)
        rawY.set(e.clientY - bounds.top)
    }

    // const handleMouseLeave = () => {
    //     // Reset to center of element on leave for a graceful fade
    //     const bounds = ref.current?.getBoundingClientRect()
    //     if (!bounds) return
    //     rawX.set(bounds.width / 2)
    //     rawY.set(bounds.height / 2)
    // }

    return (
        <div className="h-screen px-4 mt-2 w-full text-neutral-950 items-center justify-center flex">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                // onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 2 } }}
                className="relative overflow-hidden dark:bg-linear-to-br dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950 dark:shadow-neutral-950 rounded-lg px-4 dark:border dark:border-dashed dark:border-neutral-400/40 py-10 flex flex-col-reverse md:flex-row justify-between items-center gap-10 md:gap-2 shadow-md shadow-neutral-600 w-full bg-linear-to-br from-neutral-50 via-neutral-200 to-neutral-50"
            >
                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-lg z-0 dark:hidden"
                    style={{ background: backgroundLight }}
                />

                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-lg z-0 hidden dark:block"
                    style={{ background }}
                />

                {/* Content */}
                <div className="relative w-full h-full space-y-3 z-10">
                    <h1 className="font-rubik md:text-6xl sm:text-5xl text-4xl md:text-left bg-linear-to-br from-orange-800 via-neutral-950 to-orange-800 dark:from-orange-200 dark:via-neutral-100 dark:to-orange-300 bg-clip-text text-transparent text-center">
                        Mohmmad Saif
                    </h1>
                    <p className="flex text-neutral-950/70 dark:text-neutral-50 text-lg flex-wrap items-center text-left tracking-tighter">
                        I&apos;m a full-stack developer passionate about building fast, scalable and user-focused digital products. I specialize in JavaScript and TypeScript ecosystems, delivering end-to-end solutions across web and mobile platforms.
                    </p>
                </div>

                <div className="relative w-full h-96 md:w-[650px] z-10">
                    <Image src="hero.svg" alt="nextjs" fill className="object-contain" />
                </div>
            </motion.div>
        </div>
    );
}
