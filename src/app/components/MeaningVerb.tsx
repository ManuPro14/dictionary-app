import React from 'react';
import Divider from './Divider';

interface MeaningProps {
  wordData: any;
}

export default function MeaningVerb({ wordData }: MeaningProps) {
  if (!wordData) return null;

  console.log("Verifying wordData in MeaningVerb:", wordData);

  const verbMeanings = wordData[0]?.meanings?.filter(
    (meaning: any) => meaning.partOfSpeech === "verb"
  ) || [];

  console.log("Filtered verb meanings:", verbMeanings);

  return (
    <div className="mt-4 w-full text-xl">
      {verbMeanings.length > 0 ? (
        <>
          <Divider text="verb" />
          <h2 className="text-2xl font-semibold">Meaning</h2>
          <div className='max-w-screen-lg flex flex-col items-start justify-center mx-12'>
            <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-200">
              {verbMeanings[0]?.definitions?.map((def: any, index: number) => (
                <li key={index}>
                  {def.definition}
                  {def.example && <p className="italic text-gray-500 mt-1">"{def.example}"</p>}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-200 italic mx-12">No verb definitions available.</p>
      )}
    </div>
  );
}