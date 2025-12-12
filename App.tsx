import { useState, useEffect, useCallback } from 'react';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { Modal } from './components/Modal';
import { DictionaryManager } from './components/DictionaryManager';
import { DICTIONARY, MAX_CHALLENGES } from './constants';
import { DictionaryEntry } from './types';

function App() {
  // --- State ---
  const [lang, setLang] = useState<'en' | 'es'>('en');
  
  // Dictionary State (Default + Custom)
  const [allWords, setAllWords] = useState<DictionaryEntry[]>(DICTIONARY);
  const [currentEntry, setCurrentEntry] = useState<DictionaryEntry | null>(null);
  
  const [solution, setSolution] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  
  // Modals
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showDictModal, setShowDictModal] = useState<boolean>(false);

  // --- Initialization ---

  // Load custom words on mount
  useEffect(() => {
    const savedWords = localStorage.getItem('custom_words');
    if (savedWords) {
      try {
        const parsed = JSON.parse(savedWords);
        setAllWords([...DICTIONARY, ...parsed]);
      } catch (e) {
        console.error("Failed to parse custom words", e);
      }
    }
  }, []);

  const initGame = useCallback(() => {
    // Pick from allWords. If allWords isn't ready (very first render), fallback to DICTIONARY
    const source = allWords.length > 0 ? allWords : DICTIONARY;
    const randomEntry = source[Math.floor(Math.random() * source.length)];
    
    setCurrentEntry(randomEntry);
    setSolution(randomEntry.word);
    setGuesses([]);
    setCurrentGuess('');
    setIsGameOver(false);
    setHasWon(false);
    setShowResultModal(false);
    setShowHelpModal(false);
    setShowDictModal(false);
  }, [allWords]);

  // Initial game start (only when allWords is stable or first load)
  useEffect(() => {
    if (!currentEntry) {
      initGame();
    }
  }, [initGame, currentEntry]);

  // --- Logic ---
  const handleAddWord = (entry: DictionaryEntry) => {
    const updatedList = [...allWords, entry];
    setAllWords(updatedList);
    
    // Persist custom words (filter out default dictionary to save space)
    const customOnly = updatedList.filter(w => !DICTIONARY.some(d => d.word === w.word));
    localStorage.setItem('custom_words', JSON.stringify(customOnly));
  };

  const getDefinition = () => {
    if (!currentEntry) return '';
    return lang === 'en' ? currentEntry.definition_en : currentEntry.definition_es;
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'es' : 'en');
  };

  const onChar = useCallback((value: string) => {
    if (isGameOver || currentGuess.length >= solution.length) return;
    setCurrentGuess(prev => prev + value);
  }, [isGameOver, currentGuess.length, solution.length]);

  const onDelete = useCallback(() => {
    if (isGameOver || currentGuess.length === 0) return;
    setCurrentGuess(prev => prev.slice(0, -1));
  }, [isGameOver, currentGuess.length]);

  const onEnter = useCallback(() => {
    if (isGameOver) return;
    
    if (currentGuess.length !== solution.length) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (currentGuess === solution) {
      setHasWon(true);
      setIsGameOver(true);
      setTimeout(() => setShowResultModal(true), 1500);
    } else if (newGuesses.length >= MAX_CHALLENGES) {
      setHasWon(false);
      setIsGameOver(true);
      setTimeout(() => setShowResultModal(true), 1500);
    }
  }, [isGameOver, currentGuess, solution, guesses]);

  // --- Keyboard Event Listeners ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent keyboard input if modals are open
      if (showDictModal || showResultModal || showHelpModal) return;

      const char = e.key.toUpperCase();
      if (e.key === 'Enter') {
        onEnter();
      } else if (e.key === 'Backspace') {
        onDelete();
      } else if (/^[A-Z]$/.test(char)) {
        onChar(char);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, onDelete, onChar, showDictModal, showResultModal, showHelpModal]);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* Header */}
      <header className="w-full p-4 border-b border-gray-800 flex justify-between items-center max-w-2xl animate-fade-in z-10">
         <div className="flex gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="w-10 h-8 flex items-center justify-center rounded bg-gray-800 text-xs font-bold text-indigo-400 border border-indigo-900 hover:bg-gray-700 transition-colors"
              title="Switch Language"
            >
              {lang.toUpperCase()}
            </button>
            
            {/* Dictionary Button */}
            <button
              onClick={() => setShowDictModal(true)}
              className="w-10 h-8 flex items-center justify-center rounded bg-gray-800 text-gray-400 border border-gray-700 hover:text-white hover:bg-gray-700 transition-colors"
              title={lang === 'en' ? 'Dictionary Manager' : 'Gestor de Diccionario'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </button>
         </div>

         <h1 className="text-3xl font-bold tracking-wider text-indigo-400 font-mono">
            DEV<span className="text-white">GUESS</span>
         </h1>
         
         <button 
           onClick={() => setShowHelpModal(true)}
           className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
           aria-label="Help"
         >
           ?
         </button>
      </header>

      {/* Main Game Area */}
      <main className="flex-grow flex flex-col items-center justify-center w-full max-w-2xl p-4 gap-6">
        
        {/* Definition Card */}
        {currentEntry && (
          <div 
            key={`${currentEntry.word}-${lang}`} 
            className={`bg-gray-800 rounded-lg p-6 shadow-lg border w-full max-w-lg text-center relative overflow-hidden group animate-slide-up transition-all duration-500 ${hasWon ? 'border-green-500 shadow-green-900/20' : 'border-gray-700'}`}
          >
              <div className={`absolute top-0 left-0 w-1 h-full transition-colors duration-500 ${hasWon ? 'bg-green-500' : 'bg-indigo-500'}`}></div>
              <p className={`text-xs uppercase tracking-widest mb-2 font-semibold transition-colors duration-500 ${hasWon ? 'text-green-400' : 'text-indigo-400'}`}>
                {lang === 'en' ? 'Definition' : 'Definición'}
              </p>
              <p className="text-lg md:text-xl font-medium text-white italic leading-relaxed">
                "{getDefinition()}"
              </p>
          </div>
        )}

        {/* Game Grid */}
        <div 
          className={shake ? 'animate-shake' : 'animate-fade-in'} 
          style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
        >
           {solution && (
             <Grid 
                currentGuess={currentGuess} 
                guesses={guesses} 
                turn={guesses.length} 
                solution={solution} 
              />
           )}
        </div>

      </main>

      {/* Keyboard */}
      <div 
        className="w-full pb-8 pt-2 bg-gray-900 border-t border-gray-800 sm:border-none sm:bg-transparent animate-slide-up" 
        style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
      >
        <Keyboard 
          onChar={onChar} 
          onDelete={onDelete} 
          onEnter={onEnter} 
          guesses={guesses}
          solution={solution}
        />
      </div>

      {/* Result Modal */}
      <Modal 
        isOpen={showResultModal} 
        title={hasWon ? (lang === 'en' ? "Success!" : "¡Éxito!") : (lang === 'en' ? "Game Over" : "Fin del Juego")}
        type={hasWon ? 'success' : 'failure'}
        actionLabel={lang === 'en' ? "New Game" : "Nuevo Juego"}
        onAction={initGame}
      >
        <div className="flex flex-col gap-4">
          <p className="text-lg">
            {hasWon 
              ? (lang === 'en' ? "You guessed it!" : "¡Lo adivinaste!")
              : (lang === 'en' ? "The correct term was:" : "El término correcto era:")}
          </p>
          
          <div className="bg-gray-900 p-4 rounded-md border border-gray-700 text-center relative overflow-hidden">
            <span className="text-3xl font-mono text-indigo-400 font-bold tracking-widest">{solution}</span>
          </div>

          {/* Extra Info Section */}
          {currentEntry && (
            <div className="bg-gray-800/50 p-3 rounded text-sm text-gray-300 border border-gray-700 text-left">
               <p className="mb-2"><strong>Info:</strong> {currentEntry.info}</p>
               
               <div className="flex flex-col gap-2 mt-3">
                  {/* Documentation Link */}
                  {currentEntry.link && (
                    <a 
                      href={currentEntry.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-2 transition-colors"
                    >
                      <span>📚 {lang === 'en' ? 'Read Documentation' : 'Leer Documentación'}</span>
                    </a>
                  )}
                  
                  {/* Google Search Button */}
                  <a 
                    href={`https://www.google.com/search?q=${currentEntry.word}+software+programming+definition`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-center transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                     <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.347.533 12S5.867 24 12.48 24c3.44 0 6.013-1.133 8.053-3.24 2.067-2.067 2.693-5.24 2.693-7.8 0-.76-.067-1.48-.173-2.04H12.48z"/></svg>
                     {lang === 'en' ? 'Search on Google' : 'Buscar en Google'}
                  </a>
               </div>
            </div>
          )}

          <div className="text-sm text-gray-500 mt-2">
            {lang === 'en' ? 'Attempts:' : 'Intentos:'} <span className="text-white font-bold">{guesses.length}</span> / {MAX_CHALLENGES}
          </div>
        </div>
      </Modal>

      {/* Dictionary Manager Modal */}
      <DictionaryManager 
        isOpen={showDictModal}
        onClose={() => setShowDictModal(false)}
        onAddWord={handleAddWord}
        words={allWords}
        lang={lang}
      />

      {/* Help Modal */}
      <Modal
        isOpen={showHelpModal}
        title={lang === 'en' ? "How to Play" : "Cómo Jugar"}
        onClose={() => setShowHelpModal(false)}
        type="info"
      >
         <ul className="list-disc list-inside space-y-2 text-left text-sm">
           {lang === 'en' ? (
             <>
                <li>Read the <strong>definition</strong> at the top.</li>
                <li>Guess the term in <strong>6 tries</strong>.</li>
                <li>Each guess must be a valid word length.</li>
             </>
           ) : (
             <>
                <li>Lee la <strong>definición</strong> en la parte superior.</li>
                <li>Adivina el término en <strong>6 intentos</strong>.</li>
                <li>Cada intento debe tener el largo correcto.</li>
             </>
           )}
         </ul>
         <div className="mt-4 space-y-3 text-sm">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-green-500 border border-green-600 flex items-center justify-center font-bold text-white rounded">P</div>
             <span>{lang === 'en' ? 'Correct letter & spot' : 'Letra y lugar correctos'}</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-yellow-500 border border-yellow-600 flex items-center justify-center font-bold text-white rounded">R</div>
             <span>{lang === 'en' ? 'Correct letter, wrong spot' : 'Letra correcta, lugar incorrecto'}</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-gray-600 border border-gray-700 flex items-center justify-center font-bold text-white rounded">O</div>
             <span>{lang === 'en' ? 'Letter not in word' : 'Letra no está en la palabra'}</span>
           </div>
         </div>
      </Modal>

    </div>
  );
}

export default App;