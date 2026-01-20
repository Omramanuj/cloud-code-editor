'use client';
import React from 'react';
import { Button } from './ui/Button';

interface ToolbarProps {
  onSave: () => void;
  onRun: () => void;
  onStop?: () => void;
  onDownload?: () => void;
  onSettings?: () => void;
  isSaving?: boolean;
  isRunning?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onSave,
  onRun,
  onStop,
  onDownload,
  onSettings,
  isSaving = false,
  isRunning = false,
}) => {
  return (
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50 glass-panel">
      <h1 className="text-lg font-semibold tracking-wide mr-4" style={{ fontFamily: 'Inter, Geist, sans-serif', letterSpacing: '0.05em' }}>
        ideOnWeb
      </h1>
      <Button
        variant="default"
        size="sm"
        onClick={onSave}
        disabled={isSaving || isRunning}
        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {isSaving ? 'Saving...' : 'Save'}
      </Button>
      {isRunning ? (
        <Button
          variant="default"
          size="sm"
          onClick={onStop}
          className="bg-red-500/30 hover:bg-red-500/40 border border-red-400/20 text-red-200 backdrop-blur-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Stop
        </Button>
      ) : (
        <Button
          variant="default"
          size="sm"
          onClick={onRun}
          disabled={isSaving}
          className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm disabled:opacity-50"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Run
        </Button>
      )}
      {onDownload && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDownload}
          className="bg-white/5 hover:bg-white/10 border border-white/20 text-white backdrop-blur-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </Button>
      )}
      {onSettings && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onSettings}
          className="hover:bg-white/10 text-white backdrop-blur-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Button>
      )}
    </div>
  );
};
