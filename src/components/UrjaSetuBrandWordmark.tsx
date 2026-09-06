import React, { useState } from 'react';

interface UrjaSetuBrandWordmarkProps {
  size?: 'hero' | 'header' | 'navbar' | 'footer';
  isDarkMode?: boolean;
  className?: string;
}

export const UrjaSetuBrandWordmark: React.FC<UrjaSetuBrandWordmarkProps> = ({
  size = 'header',
  isDarkMode = false,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // In dark mode or on dark hero backgrounds, use the high-contrast white & green wordmark
  // In light mode, use the deep navy & green wordmark
  const imageSrc = isDarkMode
    ? '/urjasetu-wordmark-dark-bg.png'
    : '/urjasetu-wordmark-transparent.png';

  if (hasError) {
    // Fallback styled serif typography matching the custom brand identity
    if (size === 'hero') {
      return (
        <div className={`font-serif tracking-tight font-extrabold ${className}`}>
          <span className="text-white drop-shadow-md">Urja</span>
          <span className="text-emerald-400 drop-shadow-md">Setu</span>
        </div>
      );
    }
    return (
      <span
        className={`font-serif text-lg font-bold tracking-tight ${
          isDarkMode ? 'text-slate-100' : 'text-slate-900'
        } ${className}`}
      >
        <span className={isDarkMode ? 'text-white' : 'text-[#002b5c]'}>Urja</span>
        <span className="text-[#237829]">Setu</span>
      </span>
    );
  }

  if (size === 'hero') {
    return (
      <div className={`inline-block select-none ${className}`}>
        <img
          src={imageSrc}
          alt="UrjaSetu"
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
          className="h-16 sm:h-24 md:h-28 lg:h-32 w-auto max-w-full object-contain filter drop-shadow-xl"
        />
      </div>
    );
  }

  // Header / Navbar size (Beside status bar logo)
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={imageSrc}
        alt="UrjaSetu"
        onError={() => setHasError(true)}
        referrerPolicy="no-referrer"
        className="h-6 sm:h-7 w-auto object-contain"
      />
    </div>
  );
};
