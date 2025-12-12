import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  type?: 'success' | 'failure' | 'info';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, onAction, actionLabel, type = 'info' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-w-sm w-full p-6 relative transform transition-all scale-100">
        <h2 className={`text-2xl font-bold mb-4 text-center ${type === 'success' ? 'text-green-400' : type === 'failure' ? 'text-red-400' : 'text-white'}`}>
          {title}
        </h2>
        
        <div className="text-gray-300 mb-6 text-center leading-relaxed">
          {children}
        </div>

        <div className="flex justify-center gap-4">
            {onAction && actionLabel && (
                <button
                    onClick={onAction}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg"
                >
                    {actionLabel}
                </button>
            )}
            {onClose && (
                 <button
                 onClick={onClose}
                 className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
             >
                 Close
             </button>
            )}
        </div>
      </div>
    </div>
  );
};