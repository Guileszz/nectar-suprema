import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Hero = ({ data }: { data: any }) => {
  if (!data) return null;
  
  return (
    <header className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          {data.headline}
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
          {data.subheadline}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2 text-center uppercase">
            {data.cta} <ArrowRight size={24} />
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
          {data.trust_badges?.join(' • ')}
        </p>
      </div>
    </header>
  );
};
