import type { Metadata } from 'next';
// REMOVED: import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import ThemeSwitcher from './components/ThemeSwitcher'; // New: Import ThemeSwitcher

// REMOVED: Geist font configuration blocks

// Update Metadata
export const metadata: Metadata = {
    title: 'My Simple To-Do App with Next.js',
    description: 'A simple, fast, and responsive To-Do List application built with Next.js and Tailwind CSS with light/dark mode.',
    keywords: ['To-Do List', 'Next.js', 'React', 'Dark Mode'],
    // ... (rest of your metadata)
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // suppressHydrationWarning is needed when manipulating the HTML class on the client
        // The body class is simplified as font classes are removed
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>

                {/* Navigation with Theme Switcher */}
                <nav className="p-4 bg-gray-800 text-white shadow-lg flex justify-between items-center px-8">
                    <div className="flex space-x-8 items-center">
                        <Link href="/" className="hover:text-blue-400 transition duration-150 text-xl font-medium">
                            My To-Do App (Home)
                        </Link>
                        <div className="flex items-center space-x-2">
                            <Link href="/about" className="hover:text-blue-400 transition duration-150 text-xl font-medium">
                                About/Settings
                            </Link>
                            <Image
                                src="/sammygif.gif"
                                alt="Sammy mascot"
                                width={60}
                                height={60}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <ThemeSwitcher /> {/* Theme Toggle Button */}
                </nav>

                <main className="p-4 max-w-7xl mx-auto relative">
                    {children}
                </main>
            </body>
        </html>
    );
}