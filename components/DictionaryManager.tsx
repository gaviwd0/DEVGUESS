
import React, { useState } from 'react';
import { DictionaryEntry } from '../types';

interface DictionaryManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWord: (entry: DictionaryEntry) => void;
  words: DictionaryEntry[];
  lang: 'en' | 'es';
}

export const DictionaryManager: React.FC<DictionaryManagerProps> = ({ isOpen, onClose, onAddWord, words, lang }) => {
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [newWord, setNewWord] = useState('');
  const [defEn, setDefEn] = useState('');
  const [defEs, setDefEs] = useState('');
  const [info, setInfo] = useState('');
  const [link, setLink] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord || !defEn || !defEs) {
      setFeedback(lang === 'en' ? 'Please fill in required fields.' : 'Por favor completa los campos requeridos.');
      return;
    }

    const entry: DictionaryEntry = {
      word: newWord.toUpperCase().trim(),
      definition_en: defEn,
      definition_es: defEs,
      info: info || (lang === 'en' ? 'User added word.' : 'Palabra agregada por usuario.'),
      link: link || undefined
    };

    onAddWord(entry);
    setFeedback(lang === 'en' ? 'Word added successfully!' : '¡Palabra agregada con éxito!');
    
    // Reset form
    setNewWord('');
    setDefEn('');
    setDefEs('');
    setInfo('');
    setLink('');
    
    // Clear success message after 2s
    setTimeout(() => setFeedback(null), 2000);
  };

  const filteredWords = words.filter(w => w.word.includes(searchTerm.toUpperCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800">
          <h2 className="text-xl font-bold text-indigo-400">
            {lang === 'en' ? 'Dictionary Manager' : 'Gestor de Diccionario'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button 
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'add' ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
            {lang === 'en' ? 'Add Word' : 'Agregar Palabra'}
          </button>
          <button 
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
          >
             {lang === 'en' ? 'View Library' : 'Ver Biblioteca'} ({words.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-900">
          
          {activeTab === 'add' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {feedback && (
                <div className={`p-3 rounded text-sm text-center font-bold ${feedback.includes('!') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                  {feedback}
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  {lang === 'en' ? 'Word (Tech Term)' : 'Palabra (Término Técnico)'} *
                </label>
                <input 
                  type="text" 
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  maxLength={10}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none uppercase font-mono"
                  placeholder="REACT"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                     Definition (EN) *
                   </label>
                   <textarea 
                     value={defEn}
                     onChange={(e) => setDefEn(e.target.value)}
                     className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white text-sm focus:border-indigo-500 outline-none h-24 resize-none"
                     placeholder="A JS library..."
                   />
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                     Definición (ES) *
                   </label>
                   <textarea 
                     value={defEs}
                     onChange={(e) => setDefEs(e.target.value)}
                     className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white text-sm focus:border-indigo-500 outline-none h-24 resize-none"
                     placeholder="Una librería de JS..."
                   />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  Info / Fun Fact
                </label>
                <input 
                  type="text" 
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-indigo-500 outline-none text-sm"
                  placeholder={lang === 'en' ? 'Created by Facebook...' : 'Creado por Facebook...'}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  Documentation Link (Optional)
                </label>
                <input 
                  type="url" 
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-indigo-500 outline-none text-sm"
                  placeholder="https://..."
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg mt-4"
              >
                {lang === 'en' ? 'Add to Dictionary' : 'Agregar al Diccionario'}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-indigo-500 outline-none text-sm mb-4"
                  placeholder={lang === 'en' ? 'Search word...' : 'Buscar palabra...'}
              />
              
              <div className="grid grid-cols-1 gap-3">
                {filteredWords.map((w, idx) => (
                  <div key={idx} className="bg-gray-800 p-3 rounded border border-gray-700 hover:border-gray-600 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-indigo-400 font-bold text-lg">{w.word}</span>
                      {w.link && (
                         <a href={w.link} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:text-white">Link ↗</a>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mt-1">
                      {lang === 'en' ? w.definition_en : w.definition_es}
                    </p>
                  </div>
                ))}
                {filteredWords.length === 0 && (
                  <p className="text-center text-gray-500 mt-8">
                    {lang === 'en' ? 'No words found.' : 'No se encontraron palabras.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
