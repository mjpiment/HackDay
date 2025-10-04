import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import ThemeSwitcher from './components/ThemeSwitcher'; 

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
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // The theme classes ('light', 'dark', 'slug') will be added here.
        <html lang="en" suppressHydrationWarning> 
            {/* The body sets the default light/dark background styles */}
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>

                {/* Navigation: Full-width container to hold the theme button on the right edge */}
                <nav className="p-4 bg-gray-800 text-white shadow-lg flex justify-center items-center px-8 relative"> 
                    
                    {/* Inner container: Centers the links exactly in the middle */}
                    <div className="flex space-x-8 max-w-7xl w-full justify-center">
                        <Link href="/" className="hover:text-blue-400 transition duration-150 text-xl font-medium">
                            My To-Do App (Home)
                        </Link>
                        <Link href="/about" className="hover:text-blue-400 transition duration-150 text-xl font-medium">
                            About/Settings
                        </Link>
                    </div>

                    {/* Theme Toggle Button: Positioned absolutely to override the centering and stay on the right */}
                    <div className="absolute right-8"> 
                       <ThemeSwitcher /> 
                    </div>
                </nav>

                {/* Main Content Area: Constrained width and centered using mx-auto */}
                <main className="p-4 max-w-7xl mx-auto"> 
                    {children}
                </main>
            </body>
        </html>
    );
}