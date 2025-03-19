'use client'

import React, { useState } from 'react';
import { Search, Play, XCircle } from 'lucide-react';
import { getWord } from '../services/api';

interface SearchBarProps {
  onSearch: (data: any) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    if (!word.trim()) {
      setShowModal(true);
      setWordData(null); // Oculta el contenido si la búsqueda es vacía
      onSearch(null);
      return;
    }

    try {
      const data = await getWord(word);
      setWordData(data);
      onSearch(data);
      console.log('Data: ', data);
    } catch (e) {
      console.error('Error fetching data: ', e);
      setWordData(null);
      onSearch(null);
    }
  };

  // Manejar la tecla "Enter" en el input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Extraer fonética y audio
  const phoneticText = wordData?.[0]?.phonetics?.find((p: any) => p.text)?.text || '';
  const phoneticAudio = wordData?.[0]?.phonetics?.find((p: any) => p.audio)?.audio || '';

  const playAudio = () => {
    if (phoneticAudio) {
      const audio = new Audio(phoneticAudio);
      audio.play().catch((e) => console.error("Error playing audio:", e));
    }
  };

  return (
    <section className="flex flex-col items-center justify-between w-full mt-8">
      <div className='flex flex-row items-center justify-center w-full bg-gray-200 opacity-80 rounded-2xl py-4 px-8 dark:bg-gray-400'>
        <input
          type='text'
          placeholder='Search for a word...'
          className='text-3xl font-semibold w-full bg-transparent outline-none dark:text-gray-800'
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyPress} // Detecta la tecla Enter
        />
        <button onClick={handleSearch}>
          <Search size={32} className="text-purple-600 opacity cursor-pointer" />
        </button>
      </div>

      {/* Muestra la palabra encontrada y su información solo si hay datos */}
      {wordData && wordData.length > 0 && (
        <div className='flex flex-row items-center justify-between w-full my-8 p-6 bg-gray-200 dark:bg-gray-400 shadow-lg rounded-lg'>
          <div>
            <h1 className='text-7xl font-extrabold dark:text-gray-800'>{wordData?.[0]?.word}</h1>
            <p className='text-purple-600 text-4xl'>{phoneticText}</p> 
          </div>
          <div>
            <button
              className={`rounded-full p-6 transition-opacity ${
                phoneticAudio
                  ? "bg-purple-400 dark:bg-purple-500 opacity-100 cursor-pointer"
                  : "bg-gray-500 opacity-50 cursor-not-allowed"
              }`}
              onClick={playAudio}
              disabled={!phoneticAudio}
            >
              <Play size={32} className="text-purple-900" fill="currentColor" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Aparece si el usuario intenta hacer una búsqueda vacía */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-red-600 dark:text-red-400">Error</h2>
              <button onClick={() => setShowModal(false)}>
                <XCircle size={24} className="text-red-500 dark:text-red-400" />
              </button>
            </div>
            <p className="mt-4 text-gray-800 dark:text-gray-300">
              You need to enter a word before searching.
            </p>
            <button
              className="mt-4 w-full bg-purple-600 dark:bg-purple-500 text-white font-semibold py-2 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}