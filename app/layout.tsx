import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link'; // Import Link for navigation
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

// 1. UPDATE METADATA FOR TO-DO APP
export const metadata: Metadata = {
    title: 'My Simple To-Do App with Next.js',
    description: 'A simple, fast, and responsive To-Do List application built with Next.js and Tailwind CSS.',
    keywords: [
        'To-Do List',
        'Next.js',
        'React',
        'TypeScript',
        'Task Manager',
        'Web App',
    ],
    authors: [{ name: 'Your App Creator' }],
    creator: 'Your App Creator',
    openGraph: {
        title: 'Simple Next.js To-Do App',
        description: 'Manage your tasks easily with this Next.js To-Do application.',
        url: '/',
        siteName: 'My To-Do App',
        images: [
            {
                url: '/og-image-todo.jpg', // You might want to update this image
                width: 1200,
                height: 630,
                alt: 'Next.js To-Do App Screenshot',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'My Simple To-Do App',
        description: 'Manage your daily tasks efficiently.',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                
                {/* 2. ADD NAVIGATION BAR */}
                <nav className="p-4 bg-gray-800 text-white shadow-lg flex justify-center space-x-8">
                    {/* Link uses next/link component for better performance */}
                    <Link href="/" className="hover:text-blue-400 transition duration-150 text-xl font-medium">
                        My To-Do App (Home)
                    </Link>
                    
                    {/* Link to the second page created in Step 5 */}
                    <Link href="/about" className="hover:text-blue-400 transition duration-150 text-xl font-medium">
                        About/Settings
                    </Link>
                </nav>

                {/* The {children} prop renders the current page content (e.g., TodoList or AboutPage) */}
                <main className="p-4"> 
                    {children}
                </main>
            </body>
        </html>
    );
}