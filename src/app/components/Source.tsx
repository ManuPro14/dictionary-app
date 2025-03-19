interface MeaningProps {
  wordData?: { sourceUrls?: string[] }[];
}

const Source = ({ wordData }: MeaningProps) => {
  if (!wordData || !wordData[0]?.sourceUrls) return null; 

  const sourceUrl = wordData[0].sourceUrls?.[0];

  return (
    <div className="flex flex-row gap-4 px-4 my-6 w-full text-gray-500 text-lg">
      <h3 className="font-semibold">Source</h3>
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {sourceUrl}
        </a>
      )}
    </div>
  );
};

export default Source;