"use client";
import Link from "next/link";

export default function CalendarPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 space-y-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Calendar</h1>
      <p className="text-xl text-gray-600 mb-6">
        View upcoming events and schedules below:
      </p>

      {/* ✅ Only one iframe, using correct JSX syntax */}
      <iframe
        src="https://calendar.google.com/calendar/embed?src=jbparra%40ucsc.edu&ctz=America%2FLos_Angeles"
        style={{ border: 0 }}
        width="800"
        height="600"
        frameBorder="0"
        scrolling="no"
        className="rounded-lg shadow-lg w-full max-w-5xl"
      ></iframe>

      <Link href="/" className="text-blue-600 hover:underline">
        &larr; Go back to the To-Do List
      </Link>
    </div>
  );
}
