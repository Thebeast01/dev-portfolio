'use client'
import Link from "next/link"
import { ThemeToggleButton } from "./ui/theme-button"
import {
    ContactRoundIcon,
    DownloadIcon,
    FolderOpenDot,
    Home,
    MenuIcon,
    NotepadText,
    X,
    type LucideIcon,
} from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"

interface NavLink {
    link: string
    label: string
    Icon: LucideIcon
}

const NAV_LINKS: NavLink[] = [
    { link: '/', label: "Home", Icon: Home },
    { link: '/about', label: "About", Icon: NotepadText },
    { link: '/contact', label: "Contact", Icon: ContactRoundIcon },
    { link: '/projects', label: "Projects", Icon: FolderOpenDot },
]

export const Navbar = () => {
    const [isNavOpen, setNavOpen] = useState<boolean>(false)
    const [mounted, setMounted] = useState<boolean>(false)
    const pathname = usePathname()

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        document.body.style.overflow = isNavOpen ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [isNavOpen])

    const closeNav = useCallback(() => setNavOpen(false), [])
    const openNav = useCallback(() => setNavOpen(true), [])

    const drawer = (
        <>
            {isNavOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-99998"
                    onClick={closeNav}
                />
            )}
            <div
                className={cn(
                    "fixed top-0 right-0 h-full w-64 bg-white dark:bg-neutral-900 shadow-xl z-99999",
                    "flex flex-col gap-6 p-6 transition-transform duration-300 will-change-transform",
                    isNavOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <button className="self-end" onClick={closeNav} aria-label="Close menu">
                    <X className="dark:text-neutral-50 text-neutral-950" />
                </button>

                {NAV_LINKS.map(({ link, label }) => (
                    <Link
                        key={label}
                        href={link}
                        onClick={closeNav}
                        className={cn(
                            "text-md dark:text-neutral-50 text-neutral-900",
                            pathname === link ? "underline underline-offset-4" : ""
                        )}
                    >
                        {label}
                    </Link>
                ))}

                <Link
                    href="/download-resume"
                    onClick={closeNav}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-neutral-50 bg-neutral-800 dark:bg-neutral-500/30 shadow-md text-md"
                >
                    Resume <DownloadIcon size={16} />
                </Link>
            </div>
        </>
    )

    return (
        <>
            <header className="w-full h-20 border-b border-neutral-300/30 backdrop-blur-2xl flex items-center px-8 mx-auto max-w-6xl rounded-md z-100 fixed top-1">
                <nav className="w-full flex items-center justify-between">
                    <h1 className="text-2xl md:text-5xl font-bold font-rubik text-neutral-950 dark:text-neutral-50">
                        <Link href="/">Saif</Link>
                    </h1>

                    <div className="hidden lg:flex items-center gap-8">
                        <ThemeToggleButton />
                    </div>

                    <div className="lg:hidden flex space-x-4">
                        <ThemeToggleButton />
                        <button onClick={openNav} aria-label="Open menu">
                            <MenuIcon className="dark:text-neutral-50 text-neutral-950" />
                        </button>
                    </div>
                </nav>
            </header>

            {mounted && createPortal(drawer, document.body)}
        </>
    )
}
