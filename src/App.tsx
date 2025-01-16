import './App.css';

import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

import translations from './languages';

interface BeerCountCookie {
  year: number;
  count: number;
  lastCheckDate: string;
}

function detectDefaultLanguage() {
  const systemLang = (navigator.language || 'en').toLowerCase();
  const availableLangs = Object.keys(translations);
  const matched = availableLangs.find((code) => systemLang.startsWith(code));
  return matched || 'en';
}

export default function App() {
  const [language, setLanguage] = useState<string>(detectDefaultLanguage);
  const [availableLangs] = useState<string[]>(Object.keys(translations));

  const today = new Date();
  const currentYear = today.getFullYear();
  const todayString = today.toISOString().split('T')[0];
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);
  const msDifference = endOfYear.getTime() - today.getTime();
  const daysRemaining = Math.ceil(msDifference / (1000 * 60 * 60 * 24));

  const savedCookie = Cookies.get('beerCount');
  const parsedCookie: BeerCountCookie | undefined = savedCookie
    ? JSON.parse(savedCookie)
    : undefined;

  const initialState: BeerCountCookie =
    parsedCookie && parsedCookie.year === currentYear
      ? parsedCookie
      : { year: currentYear, count: 0, lastCheckDate: '' };

  const [beerCount, setBeerCount] = useState<number>(initialState.count);
  const [lastCheckDate, setLastCheckDate] = useState<string>(
    initialState.lastCheckDate
  );

  const handleGazillionBeer = () => {
    if (todayString !== lastCheckDate) {
      setBeerCount((p) => p + 1);
      setLastCheckDate(todayString);
    }
  };

  useEffect(() => {
    Cookies.set(
      'beerCount',
      JSON.stringify({
        year: currentYear,
        count: beerCount,
        lastCheckDate,
      }),
      { expires: 365 }
    );
  }, [beerCount, lastCheckDate, currentYear]);

  const isTodayChecked = todayString === lastCheckDate;
  const activeTranslation =
    translations[language as keyof typeof translations] || translations.en;

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="main-wrapper">
      <select
        className="language-dropdown"
        value={language}
        onChange={handleLangChange}
      >
        {availableLangs.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
      <div className="app-container">
        <h1 className="app-title">{activeTranslation.title}</h1>
        <p className="remaining-days">
          {activeTranslation.daysRemaining} <strong>{daysRemaining}</strong>
        </p>
        <p className="app-paragraph">
          {activeTranslation.countMessage(beerCount)}
        </p>
        <button
          className="beer-button"
          onClick={handleGazillionBeer}
          disabled={isTodayChecked}
        >
          {isTodayChecked
            ? activeTranslation.checkedIn
            : activeTranslation.checkIn}
        </button>
      </div>
    </div>
  );
}
