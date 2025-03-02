"use client";

import Image from "next/image";

const languages = [
  { name: "JavaScript", img: "/placeholder.png" },
  { name: "Python", img: "/placeholder.png" },
  { name: "Java", img: "/placeholder.png" },
  { name: "C++", img: "/placeholder.png" },
  { name: "Ruby", img: "/placeholder.png" },
  { name: "Go", img: "/placeholder.png" }
];

export default function UnderDevelopment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Page Under Development</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {languages.map((lang, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
            <Image
              src={lang.img}
              alt={lang.name}
              width={150}
              height={150}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold">{lang.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
