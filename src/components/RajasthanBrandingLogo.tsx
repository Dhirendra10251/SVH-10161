import React, { useState } from 'react';
import officialLogoAsset from '../assets/images/urjasetu_logo_1788683931869.jpg';

interface RajasthanBrandingLogoProps {
  variant?: 'hero' | 'header' | 'landing-nav' | 'icon';
  isDarkMode?: boolean;
  className?: string;
  onClick?: () => void;
}

const CANDIDATE_IMAGE_URLS = [
  officialLogoAsset,
  '/logo.jpeg',
  '/logo.png',
  '/urjasetu-rajasthan-logo.png',
  '/urjasetu-rajasthan-logo.jpg',
];

export const RajasthanBrandingLogo: React.FC<RajasthanBrandingLogoProps> = ({
  variant = 'header',
  isDarkMode = false,
  className = '',
  onClick,
}) => {
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [isFailed, setIsFailed] = useState(false);

  const handleImageError = () => {
    if (candidateIndex < CANDIDATE_IMAGE_URLS.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setIsFailed(true);
    }
  };

  const currentSrc = CANDIDATE_IMAGE_URLS[candidateIndex];
  const accessibleAlt = "UrjaSetu Rajasthan Government Official Logo Emblem";

  // COMPACT ICON ONLY VARIANT (For direct brand icon replacement)
  if (variant === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-white border flex items-center justify-center shrink-0 shadow-xs transition-transform hover:scale-105 ${
          isDarkMode ? 'border-amber-500/40 shadow-amber-500/10' : 'border-slate-200 shadow-slate-900/5'
        } ${className}`}
        title="UrjaSetu Rajasthan Government Official Logo"
      >
        <img
          src={currentSrc}
          alt={accessibleAlt}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain p-0.5"
        />
      </div>
    );
  }

  // HERO VARIANT (Prominent display on Landing page hero area - ONLY the logo emblem)
  if (variant === 'hero') {
    return (
      <div
        id="urjasetu-rajasthan-hero-logo"
        onClick={onClick}
        className={`inline-block transition-transform duration-200 hover:scale-105 ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
        title="UrjaSetu • Government of Rajasthan"
      >
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-white shadow-2xl shadow-black/40 border border-white/30 p-1.5 flex items-center justify-center">
          <img
            src={currentSrc}
            alt={accessibleAlt}
            onError={handleImageError}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  // LANDING TOP NAVBAR VARIANT
  if (variant === 'landing-nav') {
    return (
      <div
        id="urjasetu-rajasthan-landing-nav-logo"
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-2 py-1 rounded-xl bg-white border border-slate-200/90 shadow-xs backdrop-blur-sm transition-all ${
          onClick ? 'cursor-pointer' : ''
        } ${className}`}
        title="UrjaSetu Rajasthan renewable energy campus identity"
      >
        <img
          src={currentSrc}
          alt={accessibleAlt}
          onError={handleImageError}
          referrerPolicy="no-referrer"
          className="h-8 sm:h-9 w-auto object-contain"
        />
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-[10px] font-bold leading-tight text-slate-900">
            ऊर्जा सेतु
          </span>
          <span className="text-[8.5px] font-medium leading-tight text-slate-500">
            Govt. of Rajasthan
          </span>
        </div>
      </div>
    );
  }

  // DEFAULT / COMMAND CENTER STATUS BAR HEADER VARIANT
  return (
    <div
      id="urjasetu-rajasthan-header-logo"
      onClick={onClick}
      className={`h-9 px-2 py-0.5 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs transition-all ${
        onClick ? 'cursor-pointer group hover:border-amber-500/50' : ''
      } ${className}`}
      title="Government of Rajasthan • UrjaSetu Institutional VPP"
    >
      <img
        src={currentSrc}
        alt={accessibleAlt}
        onError={handleImageError}
        referrerPolicy="no-referrer"
        className="h-full w-auto max-h-7 max-w-[140px] object-contain"
      />
    </div>
  );
};
