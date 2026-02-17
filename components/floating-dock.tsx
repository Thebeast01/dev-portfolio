'use client'
import { AnimatePresence, motion, MotionValue, useMotionValue, useSpring, useTransform } from "motion/react"
import { ContactRoundIcon, FileUser, FolderOpenDot, Home, LucideIcon, NotepadText } from "lucide-react"
import { useRef, useState } from "react"
import Link from "next/link"

export const FloatingDock = () => {
    const navlink = [
        { link: '/', label: "Home", Icon: Home },
        { link: '/about', label: "About", Icon: NotepadText },
        { link: '/contact', label: "Contact", Icon: ContactRoundIcon },
        { link: '/projects', label: "Projects", Icon: FolderOpenDot },
        { link: '/resume', label: "Resume", Icon: FileUser },
    ]

    const mouseY = useMotionValue(Infinity)

    return (
        <motion.div
            onMouseMove={(e) => mouseY.set(e.pageY)}
            onMouseLeave={() => mouseY.set(Infinity)}
            className="fixed hidden lg:flex flex-col left-6 top-1/2 -translate-y-1/2 w-fit backdrop-blur-sm rounded-2xl items-center gap-4 justify-center p-4 ring-[0.6px] dark:ring-neutral-700 ring-neutral-300"
        >
            {navlink.map((el, idx) => (
                <IconContainer el={el} key={idx} mouseY={mouseY} />
            ))}
        </motion.div>
    )
}

type NavLink = {
    link: string;
    label: string;
    Icon: LucideIcon
}

const IconContainer = ({ el, mouseY }: { el: NavLink, mouseY: MotionValue<number> }) => {
    const ref = useRef<HTMLDivElement>(null)

    const distance = useTransform(mouseY, (val) => {
        const bounds = ref?.current?.getBoundingClientRect() ?? { y: 0, height: 0 }
        return val - bounds.y - bounds.height / 2
    })

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40])
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40])
    const widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 35, 20])
    const heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 35, 20])

    const springConfig = { mass: 0.1, stiffness: 150, damping: 12 }

    const width = useSpring(widthTransform, springConfig)
    const height = useSpring(heightTransform, springConfig)
    const widthIcon = useSpring(widthIconTransform, springConfig)
    const heightIcon = useSpring(heightIconTransform, springConfig)

    const [hovered, setHovered] = useState(false)

    return (
        <Link
            href={el.link}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                ref={ref}
                style={{ width, height }}
                className="flex relative items-center justify-center rounded-full shadow-sm shadow-neutral-500 dark:shadow-neutral-700"
            >
                {/* Tooltip — appears to the RIGHT */}
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-0.5 whitespace-nowrap text-neutral-700 dark:text-neutral-50 text-xs bg-neutral-100 dark:bg-neutral-700 rounded-md pointer-events-none"
                        >
                            {el.label}
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center"
                >
                    <el.Icon className="w-full h-full text-neutral-800 dark:text-neutral-200" />
                </motion.div>
            </motion.div>
        </Link>
    )
}
// =====> Bottom Dock Uncomment this if you want dock to be at the bottom <=======
// 'use client'
// import { AnimatePresence, motion, MotionValue, useMotionValue, useSpring, useTransform } from "motion/react"
// import { ContactRoundIcon, FileUser, FolderOpenDot, Home, LucideIcon, NotepadText } from "lucide-react"
// import { useRef, useState } from "react"
// import Link from "next/link"
//
// export const FloatingDock = () => {
//   const navlink = [
//     { link: '/', label: "Home", Icon: Home },
//     { link: '/about', label: "About", Icon: NotepadText },
//     { link: '/contact', label: "Contact", Icon: ContactRoundIcon },
//     { link: '/projects', label: "Projects", Icon: FolderOpenDot },
//     { link: '/resume', label: "Resume", Icon: FileUser },
//   ]
//   const mouseX = useMotionValue(Infinity)
//   return (
//     <motion.div
//       onMouseMove={(e) => mouseX.set(e.pageX)}
//       onMouseLeave={() => mouseX.set(Infinity)}
//       className="fixed lg:flex bottom-10 inset-x-0 w-fit mx-auto hidden   backdrop-blur-sm rounded-2xl  items-center gap-8 justify-center p-4 h-16 ring-[0.6px]  dark:ring-neutral-700">
//       {
//         navlink.map((el, idx) => (
//           <IconContainer el={el} key={idx}
//             mouseX={mouseX}
//           />
//         ))
//       }
//     </motion.div>
//   )
// }
//
// type Link = {
//   link: string;
//   label: string;
//   Icon: LucideIcon
// }
// const IconContainer = ({ el, mouseX }: { el: Link, mouseX: MotionValue<number> }) => {
//
//   const ref = useRef<HTMLDivElement>(null)
//   const distance = useTransform(mouseX, (val) => {
//     const bounds = ref?.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
//     return val - bounds.x - bounds.width / 2;
//   });
//   const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
//   const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
//   const widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20])
//   const heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20])
//   const width = useSpring(widthTransform, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   })
//   const height = useSpring(heightTransform, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   })
//   const widthIcon = useSpring(widthIconTransform, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   })
//   const heightIcon = useSpring(heightIconTransform, {
//     mass: 0.1,
//     stiffness: 150,
//     damping: 12,
//   })
//   const [hovered, setHovered] = useState<boolean>(false)
//   return (
//     <Link href={el.link}
//       onMouseLeave={() => setHovered(false)}
//       onMouseEnter={() => setHovered(true)}
//     >
//       <motion.div
//         style={{
//           width,
//           height
//         }}
//         ref={ref} className="flex relative items-center justify-center rounded-full  dark:shadow-neutral-700 shadow-neutral-500 shadow-sm"  >
//         <AnimatePresence>
//           {hovered && <motion.div
//             initial={{ opacity: 0, y: 10, }}
//             animate={{ opacity: 1, y: 0, }}
//             transition={{ duration: 0.2 }}
//             exit={{ opacity: 0, y: 2 }}
//             className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-0.5 whitespace-pre-wrap text-neutral-700 dark:text-neutral-50 text-xs  bg-neutral-100 dark:bg-neutral-700 rounded-md ">{el.label}</motion.div>}
//         </AnimatePresence>
//         <motion.div
//           style={{
//             width: widthIcon,
//             height: heightIcon
//
//           }}
//           className="flex items-center justify-center">
//           <el.Icon className="text-neutral-800 dark:text-neutral-200" />
//         </motion.div>
//       </motion.div>
//     </Link>
//   )
// }
