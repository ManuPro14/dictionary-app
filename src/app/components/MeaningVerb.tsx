import React from 'react';
import Divider from './Divider';

interface MeaningProps {
  wordData: {
    meanings?: { 
      partOfSpeech: string; 
      definitions: { definition: string; }[];
      synonyms?: string[]; 
    }[];
  }[];
}

export default function MeaningVerb({ wordData }: MeaningProps) {
  if (!wordData || wordData.length === 0) return null;

  const verbMeanings = wordData[0]?.meanings?.filter(
    (meaning: any) => meaning.partOfSpeech === "verb"
  ) || [];

  return (
    <div className="mt-4 w-full text-lg md:text-xl px-4 md:px-12">
      {verbMeanings.length > 0 ? (
        <>
          <Divider text="verb" />
          <h2 className="text-2xl md:text-3xl font-semibold mt-2">Meaning</h2>
          <div className='flex flex-col items-start justify-center space-y-2'>
            <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-200">
              {verbMeanings[0]?.definitions?.map((def: any, index: number) => (
                <li key={index} className="leading-relaxed">
                  {def.definition}
                  {def.example && (
                    <p className="italic text-gray-500 dark:text-gray-400 mt-1 text-base md:text-lg">
                      "{def.example}"
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-200 italic text-center">No verb definitions available.</p>
      )}
    </div>
  );
}