'use client'

import React, { useState, useEffect } from 'react';
import { Search, Play, XCircle, Trash2 } from 'lucide-react';
import { getWord } from '../services/api';

interface SearchBarProps {
  onSearch: (data: any) => void;
  showHistory: boolean;
  onCloseHistory: () => void;
}

export default function SearchBar({ onSearch, showHistory, onCloseHistory }: SearchBarProps) {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState<any>(null);
  const [searchHistory, setSearchHistory] = useState<{ word: string; timestamp: string }[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(savedHistory);
  }, []);

  const handleSearch = async () => {
    if (!word.trim()) {
      setShowModal(true);
      setWordData(null);
      onSearch(null);
      return;
    }

    try {
      const data = await getWord(word);
      setWordData(data);
      onSearch(data);

      const newHistory = [
        { word, timestamp: new Date().toLocaleString() },
        ...searchHistory.slice(0, 9) // Keep only last 10 searches
      ];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (e) {
      console.error('Error fetching data:', e);
      setWordData(null);
      onSearch(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const phoneticText = wordData?.[0]?.phonetics?.find((p: any) => p.text)?.text || '';
  const phoneticAudio = wordData?.[0]?.phonetics?.find((p: any) => p.audio)?.audio || '';

  const playAudio = () => {
    if (phoneticAudio) {
      const audio = new Audio(phoneticAudio);
      audio.play().catch((e) => console.error("Error playing audio:", e));
    }
  };

  return (
    <section className="flex flex-col items-center justify-between w-full mt-8 px-4">
      <div className='flex flex-row items-center justify-between w-full bg-gray-200 dark:bg-gray-400 rounded-2xl py-3 px-5 md:px-8'>
        <input
          type='text'
          placeholder='Search for a word...'
          className='text-lg md:text-2xl font-semibold w-full bg-transparent outline-none dark:text-gray-800'
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch} className="p-2">
          <Search size={28} className="text-purple-600 opacity cursor-pointer hover:scale-120 transition" />
        </button>
      </div>

      {wordData && wordData.length > 0 && (
        <div className='flex flex-col md:flex-row items-center justify-between w-full my-6 p-4 md:p-6 dark:bg-gray-400 dark:rounded-2xl'>
          <div className="text-center md:text-left">
            <h1 className='text-4xl md:text-6xl font-extrabold dark:text-gray-800'>{wordData?.[0]?.word}</h1>
            <p className='text-purple-600 text-2xl md:text-4xl'>{phoneticText}</p> 
          </div>
          <div className="mt-4 md:mt-0">
            <button
              className={`rounded-full p-5 transition-opacity ${
                phoneticAudio
                  ? "bg-purple-400 dark:bg-purple-500 opacity-100 cursor-pointer"
                  : "bg-gray-500 opacity-50 cursor-not-allowed"
              }`}
              onClick={playAudio}
              disabled={!phoneticAudio}
            >
              <Play size={28} className="text-purple-900" fill="currentColor" />
            </button>
          </div>
        </div>
      )}

      {/* Search History Modal */}
      {showHistory && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-xl flex items-center justify-center px-4">
          <div className="bg-white dark:bg-black p-6 rounded-2xl shadow-2xl w-full max-w-md transition duration-300 transform scale-100">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300">Search History</h2>
              <button onClick={onCloseHistory} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <XCircle size={28} className="text-gray-600 dark:text-gray-300 cursor-pointer" />
              </button>
            </div>

            {/* Search History List */}
            <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              {searchHistory.length > 0 ? (
                searchHistory.map((entry, index) => (
                  <li 
                    key={index} 
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
                    onClick={() => { setWord(entry.word); onCloseHistory(); }}
                  >
                    <span className="font-medium">{entry.word}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{entry.timestamp}</span>
                  </li>
                ))
              ) : (
                <p className="italic text-center text-gray-500 dark:text-gray-400">No search history available.</p>
              )}
            </ul>

            {/* Clear History Button */}
            {searchHistory.length > 0 && (
              <div className='flex justify-center mt-4'>
                <button
                  onClick={clearHistory}
                  className="w-auto cursor-pointer bg-purple-600 dark:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition"
                >
                  Clear History
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}