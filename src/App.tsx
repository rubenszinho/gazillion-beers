import './App.css';

import { LocalBar, SportsBar } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import BeerCalendar from './components/BeerCalendar';
import BeerIcon from './components/BeerIcon';
import BeerMug from './components/BeerMug';
import translations from './languages';
import beerTheme from './theme/beerTheme';

interface BeerCountCookie {
  year: number;
  count: number;
  lastCheckDate: string;
  checkInDates: string[];
}

function detectDefaultLanguage() {
  const systemLang = (navigator.language || 'en').toLowerCase();
  const availableLangs = Object.keys(translations);
  const matched = availableLangs.find((code) => systemLang.startsWith(code));
  return matched || 'en';
}

const createBubbles = (count: number) => {
  const bubbles = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 20 + 5;
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 5 + 5;

    bubbles.push({
      size,
      left,
      delay,
      duration,
      id: `bubble-${i}`,
    });
  }
  return bubbles;
};

export default function App() {
  const [language, setLanguage] = useState<string>(detectDefaultLanguage());
  const [availableLangs] = useState<string[]>(Object.keys(translations));
  const [bubbles] = useState(() => createBubbles(15));
  const [animateMug, setAnimateMug] = useState(false);
  const isMobile = useMediaQuery(beerTheme.breakpoints.down('sm'));

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
      : { year: currentYear, count: 0, lastCheckDate: '', checkInDates: [] };

  const [beerCount, setBeerCount] = useState<number>(initialState.count);
  const [lastCheckDate, setLastCheckDate] = useState<string>(
    initialState.lastCheckDate
  );
  const [checkInDates, setCheckInDates] = useState<string[]>(
    initialState.checkInDates || []
  );

  const handleGazillionBeer = () => {
    if (todayString !== lastCheckDate) {
      setAnimateMug(true);
      setTimeout(() => {
        setBeerCount((p) => p + 1);
        setLastCheckDate(todayString);
        if (!checkInDates.includes(todayString)) {
          setCheckInDates((prev) => [...prev, todayString]);
        }
        setAnimateMug(false);
      }, 1500);
    }
  };

  useEffect(() => {
    Cookies.set(
      'beerCount',
      JSON.stringify({
        year: currentYear,
        count: beerCount,
        lastCheckDate,
        checkInDates,
      }),
      { expires: 365 }
    );
  }, [beerCount, lastCheckDate, checkInDates, currentYear]);

  const isTodayChecked = todayString === lastCheckDate;
  const activeTranslation =
    translations[language as keyof typeof translations] || translations.en;

  const handleLangChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
  };

  return (
    <ThemeProvider theme={beerTheme}>
      <div className="main-wrapper">
        <div className="bubbles">
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className="bubble"
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `${bubble.left}%`,
                animationDelay: `${bubble.delay}s`,
                animationDuration: `${bubble.duration}s`,
              }}
            />
          ))}
        </div>

        <Box className="language-selector">
          <FormControl size="small" variant="outlined">
            <InputLabel
              id="language-select-label"
              sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
            >
              Language
            </InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={language}
              onChange={handleLangChange}
              label="Language"
              sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
            >
              {availableLangs.map((lang) => (
                <MenuItem
                  key={lang}
                  value={lang}
                  sx={{ fontSize: isMobile ? '0.8rem' : '1rem' }}
                >
                  {lang.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <div className="app-container">
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            component="h1"
            className="app-title"
            sx={{ fontSize: isMobile ? '1.4rem' : undefined }}
          >
            {activeTranslation.title}
          </Typography>

          <BeerMug filled={animateMug || isTodayChecked} />

          <div className="remaining-days">
            <LocalBar fontSize="small" color="primary" />
            <Typography variant="body1" component="span">
              {activeTranslation.daysRemaining}
            </Typography>
            <span className="remaining-counter">{daysRemaining}</span>
          </div>

          <Box className="beer-count">
            <Typography
              variant={isMobile ? 'body1' : 'h6'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                fontSize: isMobile ? '0.95rem' : undefined,
              }}
            >
              <SportsBar
                color="primary"
                fontSize={isMobile ? 'small' : 'medium'}
              />
              {activeTranslation.countMessage(beerCount)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            size={isMobile ? 'medium' : 'large'}
            disabled={isTodayChecked || animateMug}
            onClick={handleGazillionBeer}
            startIcon={<BeerIcon />}
            sx={{
              margin: '0 auto',
              maxWidth: 320,
              py: isMobile ? 1 : 1.5,
              fontSize: isMobile ? '0.9rem' : undefined,
              boxShadow: 3,
              '&:disabled': {
                backgroundColor: '#bbb',
                color: 'white',
              },
            }}
          >
            {isTodayChecked
              ? activeTranslation.checkedIn
              : activeTranslation.checkIn}
          </Button>

          <Divider sx={{ my: isMobile ? 1.5 : 2 }} />

          <BeerCalendar checkInDates={checkInDates} currentYear={currentYear} />

          <Box sx={{ mt: isMobile ? 1.5 : 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {activeTranslation.streakDays?.replace(
                '{count}',
                calculateStreak(checkInDates).toString()
              ) || `Longest streak: ${calculateStreak(checkInDates)} days`}
            </Typography>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}

function calculateStreak(dates: string[]): number {
  if (!dates.length) return 0;

  const sortedDates = [...dates].sort();

  let currentStreak = 1;
  let maxStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currDate = new Date(sortedDates[i]);

    const diffTime = currDate.getTime() - prevDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else if (diffDays > 1) {
      currentStreak = 1;
    }
  }

  return maxStreak;
}
