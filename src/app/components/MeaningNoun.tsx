import React from 'react'
import Divider from './Divider'

interface MeaningProps {
  wordData: any;
}

export default function MeaningNoun({ wordData }: MeaningProps) {
  if (!wordData) return null; 

  const nounMeanings = wordData[0]?.meanings?.filter(
    (meaning: any) => meaning.partOfSpeech === "noun"
  ) || [];

  return (
    <div className="mt-4 w-full">
      {nounMeanings.length > 0 && (
        <>
          <Divider text="noun" />
          <h2 className="text-2xl font-semibold">Meaning</h2>
          <div className='max-w-screen-lg flex flex-col items-start text-xl justify-center mx-12'>
            <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-300">
              {nounMeanings[0]?.definitions?.map((def: any, index: number) => (
                <li key={index}>{def.definition}</li>
              ))}
            </ul>
          </div>

          {nounMeanings[0]?.synonyms?.length > 0 && (
            <div className='flex flex-row items-baseline gap-4 justify-start w-full mt-4 text-xl'>
              <h3 className="mt-4 text-lg font-semibold">Synonyms</h3>
              <p className="text-purple-600 dark:text-purple-300 text-lg font-semibold">
                {nounMeanings[0]?.synonyms?.join(", ")}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}