import React from 'react';
import Divider from './Divider';

interface MeaningProps {
  wordData: any;
}

export default function MeaningNoun({ wordData }: MeaningProps) {
  if (!wordData) return null;

  const nounMeanings = wordData[0]?.meanings?.filter(
    (meaning: any) => meaning.partOfSpeech === "noun"
  ) || [];

  return (
    <div className="mt-4 w-full text-lg md:text-xl px-4 md:px-12">
      {nounMeanings.length > 0 && (
        <>
          <Divider text="noun" />
          <h2 className="text-2xl md:text-3xl font-semibold mt-2">Meaning</h2>
          <div className='flex flex-col items-start justify-center space-y-2'>
            <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
              {nounMeanings[0]?.definitions?.map((def: any, index: number) => (
                <li key={index} className="leading-relaxed">{def.definition}</li>
              ))}
            </ul>
          </div>

          {nounMeanings[0]?.synonyms?.length > 0 && (
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 justify-start w-full mt-4'>
              <h3 className="mt-4 text-lg md:text-xl font-semibold">Synonyms:</h3>
              <p className="text-purple-600 dark:text-purple-300 text-lg md:text-xl font-semibold">
                {nounMeanings[0]?.synonyms?.join(", ")}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}