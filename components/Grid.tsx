import React from 'react';
import { MAX_CHALLENGES } from '../constants';
import { LetterState } from '../types';

interface GridProps {
  currentGuess: string;
  guesses: string[];
  turn: number;
  solution: string;
}

interface RowProps {
  guess: string | undefined;
  solution: string;
  isCurrent?: boolean;
  length: number;
}

interface CellProps {
  letter: string;
  state: LetterState;
  delay?: number;
}

// Robust check logic handling duplicates
const checkGuess = (guess: string, solution: string): LetterState[] => {
  const solutionChars = solution.split('');
  const guessChars = guess.split('');
  const result = new Array(guess.length).fill(LetterState.ABSENT);

  // First pass: find correct matches
  guessChars.forEach((char, i) => {
    if (char === solutionChars[i]) {
      result[i] = LetterState.CORRECT;
      solutionChars[i] = ''; // Mark as used
    }
  });

  // Second pass: find present matches
  guessChars.forEach((char, i) => {
    if (result[i] !== LetterState.CORRECT && solutionChars.includes(char)) {
      result[i] = LetterState.PRESENT;
      // Remove first occurrence of char to handle duplicates
      const targetIndex = solutionChars.indexOf(char);
      if (targetIndex !== -1) {
          solutionChars[targetIndex] = '';
      }
    }
  });

  return result;
};


const Cell: React.FC<CellProps> = ({ letter, state, delay = 0 }) => {
  let baseClasses = "w-10 h-10 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-xl sm:text-2xl font-bold font-mono transition-all duration-300 transform rounded-md select-none";
  
  if (state === LetterState.INITIAL) {
    // Typing state: Neutral colors
    if (letter) {
      baseClasses += " border-gray-500 text-white animate-pop bg-gray-900";
    } else {
      baseClasses += " border-gray-700 text-white bg-transparent";
    }
  } else if (state === LetterState.CORRECT) {
    // Submitted state: Reveal animation handles the color transition (flip)
    baseClasses += " text-white animate-reveal-correct";
  } else if (state === LetterState.PRESENT) {
    baseClasses += " text-white animate-reveal-present";
  } else if (state === LetterState.ABSENT) {
    baseClasses += " text-white animate-reveal-absent";
  }

  // Add delay only for reveal animations, not typing pop
  const style = state !== LetterState.INITIAL ? { animationDelay: `${delay}ms` } : {};

  return (
    <div className={baseClasses} style={style}>
      {letter}
    </div>
  );
};

const Row: React.FC<RowProps> = ({ guess, solution, isCurrent, length }) => {
  const tiles = [];
  
  if (isCurrent) {
    // Priority 1: Current Active Row
    // Even if it has letters, we MUST show INITIAL state (no colors) until Enter is pressed.
    const currentText = guess || '';
    const split = currentText.split('');
    
    for (let i = 0; i < length; i++) {
      tiles.push(
        <Cell 
          key={i} 
          letter={split[i] || ''} 
          state={LetterState.INITIAL} 
        />
      );
    }
  } else if (guess) {
    // Priority 2: Submitted Past Row
    // Logic calculates colors and applies reveal animations.
    const states = checkGuess(guess, solution);
    for (let i = 0; i < length; i++) {
      tiles.push(
        <Cell 
          key={i} 
          letter={guess[i]} 
          state={states[i]} 
          delay={i * 150} // Stagger animation for the flip effect
        />
      );
    }
  } else {
    // Priority 3: Future Empty Row
    for (let i = 0; i < length; i++) {
      tiles.push(<Cell key={i} letter="" state={LetterState.INITIAL} />);
    }
  }

  return (
    <div className="flex justify-center gap-2 mb-2">
      {tiles}
    </div>
  );
};

export const Grid: React.FC<GridProps> = ({ currentGuess, guesses, solution }) => {
  const empties = 
    guesses.length < MAX_CHALLENGES - 1 
    ? Array.from({ length: MAX_CHALLENGES - 1 - guesses.length }) 
    : [];

  return (
    <div className="pb-6">
      {/* Submitted Rows (Colored) */}
      {guesses.map((guess, i) => (
        <Row key={i} guess={guess} solution={solution} length={solution.length} />
      ))}
      
      {/* Current Typing Row (Neutral) */}
      {guesses.length < MAX_CHALLENGES && (
        <Row guess={currentGuess} solution={solution} isCurrent={true} length={solution.length} />
      )}
      
      {/* Empty Future Rows */}
      {empties.map((_, i) => (
        <Row key={`empty-${i}`} guess={undefined} solution={solution} length={solution.length} />
      ))}
    </div>
  );
};