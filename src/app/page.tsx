'use client';

import Header from "./components/Header";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MeaningNoun from "./components/MeaningNoun";
import MeaningVerb from "./components/MeaningVerb";
import Source from "./components/Source";

export default function Home() {
  const [wordData, setWordData] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-2 max-w-screen-lg mx-auto">
      <div className="w-full flex flex-col items-center justify-center">
        <Header onOpenHistory={() => setShowHistory(true)} />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <SearchBar onSearch={setWordData} showHistory={showHistory} onCloseHistory={() => setShowHistory(false)} />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <MeaningNoun wordData={wordData} />
        <MeaningVerb wordData={wordData} />
      </div>
      <Source wordData={wordData}/>
    </section>
  );
}