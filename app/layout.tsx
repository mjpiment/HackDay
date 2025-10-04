import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import ThemeSwitcher from './components/ThemeSwitcher'; // New: Import ThemeSwitcher

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

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
        <html lang="en" suppressHydrationWarning> 
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>

                {/* Navigation with Theme Switcher */}
                <nav className="p-4 bg-gray-800 text-white shadow-lg flex justify-between items-center px-8"> 
                    <div className="flex space-x-8">
                        <Link href="/" className="hover:text-blue-400 transition duration-150 text-xl font-medium">
                            My To-Do App (Home)
                        </Link>
                        <Link href="/about" className="hover:text-blue-400 transition duration-150 text-xl font-medium">
                            About/Settings
                        </Link>
                    </div>
                    <ThemeSwitcher /> {/* Theme Toggle Button */}
                </nav>

                <main className="p-4"> 
                    {children}
                </main>
            </body>
        </html>
    );
}