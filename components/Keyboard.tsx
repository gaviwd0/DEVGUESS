import React, { useEffect, useState } from 'react';
import { LetterState } from '../types';

interface KeyboardProps {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  solution: string;
}

export const Keyboard: React.FC<KeyboardProps> = ({ onChar, onDelete, onEnter, guesses, solution }) => {
  const [keyStates, setKeyStates] = useState<Record<string, LetterState>>({});

  useEffect(() => {
    // Calculate key states based on all guesses
    const newKeyStates: Record<string, LetterState> = {};
    
    guesses.forEach(guess => {
      guess.split('').forEach((letter, index) => {
        const isCorrect = solution[index] === letter;
        const isPresent = solution.includes(letter);
        
        // Priority: Correct > Present > Absent
        if (isCorrect) {
          newKeyStates[letter] = LetterState.CORRECT;
        } else if (isPresent) {
          if (newKeyStates[letter] !== LetterState.CORRECT) {
            newKeyStates[letter] = LetterState.PRESENT;
          }
        } else {
          if (newKeyStates[letter] !== LetterState.CORRECT && newKeyStates[letter] !== LetterState.PRESENT) {
            newKeyStates[letter] = LetterState.ABSENT;
          }
        }
      });
    });
    setKeyStates(newKeyStates);
  }, [guesses, solution]);

  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
  ];

  const getKeyClass = (key: string) => {
    const base = "font-bold text-sm sm:text-base rounded h-14 w-full flex items-center justify-center cursor-pointer transition-colors duration-200 shadow-md select-none active:scale-95";
    const state = keyStates[key];
    
    if (state === LetterState.CORRECT) return `${base} bg-game-correct border-game-correct text-white`;
    if (state === LetterState.PRESENT) return `${base} bg-game-present border-game-present text-white`;
    if (state === LetterState.ABSENT) return `${base} bg-game-absent border-game-absent text-white`;
    
    return `${base} bg-gray-500 hover:bg-gray-400 text-white`;
  };

  const handleClick = (key: string) => {
    if (key === 'ENTER') {
      onEnter();
    } else if (key === 'DEL') {
      onDelete();
    } else {
      onChar(key);
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-2">
      {keys.map((row, i) => (
        <div key={i} className="flex gap-1.5 mb-2 justify-center">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleClick(key)}
              className={key === 'ENTER' || key === 'DEL' ? 'flex-[1.5]' : 'flex-1'}
              aria-label={key}
            >
               <div className={getKeyClass(key)}>
                 {key === 'DEL' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                   </svg>
                 ) : key}
               </div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};