import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About This Project</h1>

      {/* Sammy looking at calendar image */}
      <div className="mb-6">
        <Image
          src="/ToDoSammy.png"
          alt="Sammy looking at calendar"
          width={300}
          height={200}
          className="rounded-lg shadow-lg"
        />
      </div>

      <p className="text-xl text-gray-600 mb-6">This page serves as a link destination.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        &larr; Go back to the To-Do List
      </Link>
    </div>
  );
}