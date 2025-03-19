'use client'

import { useState } from "react";
import MeaningNoun from "./components/MeaningNoun";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MeaningVerb from "./components/MeaningVerb";
import Source from "./components/Source";


export default function Home() {
  const [wordData, setWordData] = useState<any>(null);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2 max-w-screen-lg mx-auto">
      <Header />
      <SearchBar onSearch={setWordData} />

      {wordData && (
        <div className="w-full flex flex-col items-center justify-center">
          <MeaningNoun wordData={wordData} />
          <MeaningVerb wordData={wordData} />
          <Source wordData={wordData} />
        </div>
      )}
    </section>
  );
}