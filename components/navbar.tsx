
'use client'
import Link from "next/link"
import { motion } from "framer-motion"
import { ThemeToggleButton } from "./ui/theme-button"
import { ContactRoundIcon, DownloadIcon, FolderOpenDot, Home, MenuIcon, NotepadText, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export const Navbar = () => {
    const [isNavOpen, setNavOpen] = useState(false)
    const pathname = usePathname()
    // prevent horizontal + body scrolling when drawer is open
    useEffect(() => {
        if (isNavOpen) document.body.style.overflow = "hidden"
        else document.body.style.overflow = ""
    }, [isNavOpen])

    const navlink = [
        { link: '/', label: "Home", Icon: Home },
        { link: '/about', label: "About", Icon: NotepadText },
        { link: '/contact', label: "Contact", Icon: ContactRoundIcon },
        { link: '/projects', label: "Projects", Icon: FolderOpenDot },
    ]


    return (
        <header className="w-full h-20 border-b border-neutral-300/30 backdrop-blur-2xl flex items-center px-8  mx-auto max-w-6xl overflow-x-hidden  rounded-md 
    
     z-9999 fixed  top-1">
            <nav className="w-full flex items-center justify-between  ">
                <h1 className="text-2xl md:text-5xl font-bold font-rubik text-neutral-950 dark:text-neutral-50">
                    <Link href="/">Saif</Link>
                </h1>


                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8 relative">

                    <ThemeToggleButton />
                </div>


                {/* Mobile Menu Button */}

                <div className="lg:hidden flex space-x-4">
                    <ThemeToggleButton />
                    <button onClick={() => setNavOpen(true)}>

                        <MenuIcon className="dark:text-neutral-50 text-neutral-950" />

                    </button>
                </div>

            </nav>

            {/* Mobile Side Drawer */}
            <>
                {/* Backdrop */}
                {isNavOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setNavOpen(false)}
                    />
                )}

                {/* Drawer */}
                <div
                    className={`
            fixed top-0 right-0 h-full w-64 bg-white dark:bg-neutral-900 shadow-xl z-50
            flex flex-col gap-6 p-6 transition-transform duration-300 will-change-transform
            ${isNavOpen ? "translate-x-0" : "translate-x-full"}
          `}
                >
                    <button className="self-end" onClick={() => setNavOpen(false)}>
                        <X className="dark:text-neutral-50 text-neutral-950" />
                    </button>

                    {navlink.map((item) => (
                        <Link
                            key={item.label}
                            href={item.link}
                            onClick={() => setNavOpen(false)}
                            className={cn("text-md dark:text-neutral-50 text-neutral-900", pathname === item.link ? "underline-offset-4 underline" : "")}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <Link
                        href="/donwloadResume"
                        onClick={() => setNavOpen(false)}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-neutral-50 bg-neutral-800 dark:bg-neutral-500/30 shadow-md text-md"
                    >
                        Resume <DownloadIcon size={16} />
                    </Link>
                </div>
            </>
        </header>
    )
}

