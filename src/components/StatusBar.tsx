'use client';
import React from 'react';

interface StatusBarProps {
  saveStatus: 'saved' | 'saving' | 'unsaved';
  lastSaved: Date | null;
  currentFile: string | null;
  isConnected?: boolean;
  showSavePrompt?: boolean;
  onSavePromptSave?: () => void;
  onSavePromptDontSave?: () => void;
  onSavePromptCancel?: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  saveStatus,
  lastSaved,
  currentFile,
  isConnected = true,
  showSavePrompt = false,
  onSavePromptSave,
  onSavePromptDontSave,
  onSavePromptCancel,
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return lastSaved ? `Saved at ${formatTime(lastSaved)}` : 'Saved';
      case 'unsaved':
        return 'Unsaved changes';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (saveStatus) {
      case 'saving':
        return 'text-yellow-400';
      case 'saved':
        return 'text-green-400';
      case 'unsaved':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-white/5 backdrop-blur-md text-sm relative">
      {showSavePrompt && (
        <div className="absolute inset-x-0 -top-16 bg-orange-500/30 backdrop-blur-md px-4 py-2 rounded-t-xl border-t border-orange-400/20 flex items-center justify-between">
          <span className="text-white text-sm font-medium">
            Unsaved changes. Save before switching?
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onSavePromptCancel}
              className="px-3 py-1 text-xs bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={onSavePromptDontSave}
              className="px-3 py-1 text-xs bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm rounded-md"
            >
              Don&apos;t Save
            </button>
            <button
              onClick={onSavePromptSave}
              className="px-3 py-1 text-xs bg-blue-500/30 hover:bg-blue-500/40 border border-blue-400/20 text-blue-200 backdrop-blur-sm rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-4">
        <span className={getStatusColor()}>{getStatusText()}</span>
        {currentFile && (
          <span className="text-gray-400 truncate max-w-md">{currentFile}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
        <span className="text-gray-400">{isConnected ? 'Connected' : 'Disconnected'}</span>
      </div>
    </div>
  );
};
