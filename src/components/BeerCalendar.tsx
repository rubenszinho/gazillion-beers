import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

import BeerIcon from './BeerIcon';

interface BeerCalendarProps {
  checkInDates: string[];
  currentYear: number;
}

const BeerCalendar: React.FC<BeerCalendarProps> = ({
  checkInDates,
  currentYear,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days = [];

    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return days;
  };

  const days = getDaysInMonth(selectedMonth, currentYear);

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isCheckedInDate = (date: Date | null) => {
    if (!date) return false;
    return checkInDates.includes(formatDateString(date));
  };

  const previousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        startIcon={<CalendarMonthIcon />}
        sx={{ mt: 2, mb: 2 }}
      >
        View Beer Calendar
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="beer-calendar-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          sx={{
            width: '95%',
            maxWidth: 600,
            p: isMobile ? 2 : 3,
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Beer Calendar {currentYear}
          </Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Button
              onClick={previousMonth}
              size={isMobile ? 'small' : 'medium'}
            >
              &lt; Previous
            </Button>
            <Typography variant="h6">{monthNames[selectedMonth]}</Typography>
            <Button onClick={nextMonth} size={isMobile ? 'small' : 'medium'}>
              Next &gt;
            </Button>
          </Box>

          <Grid container spacing={0.5}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Grid item xs={12 / 7} key={day}>
                <Box
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    p: isMobile ? 0.5 : 1,
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                  }}
                >
                  {isMobile ? day.substring(0, 1) : day}
                </Box>
              </Grid>
            ))}

            {days.map((day, index) => (
              <Grid item xs={12 / 7} key={index}>
                <Box
                  sx={{
                    height: isMobile ? 32 : 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #eee',
                    borderRadius: 1,
                    position: 'relative',
                    backgroundColor: day
                      ? isCheckedInDate(day)
                        ? `${theme.palette.primary.light}30`
                        : 'white'
                      : 'transparent',
                    opacity: day ? 1 : 0,
                  }}
                >
                  {day && (
                    <>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                      >
                        {day.getDate()}
                      </Typography>
                      {isCheckedInDate(day) && (
                        <Tooltip title="Gazillion Beer Day!">
                          <Box
                            component={BeerIcon}
                            sx={{
                              position: 'absolute',
                              bottom: isMobile ? '1px' : '2px',
                              right: isMobile ? '1px' : '2px',
                              fontSize: isMobile ? '0.6rem' : '0.8rem',
                              color: theme.palette.primary.main,
                            }}
                          />
                        </Tooltip>
                      )}
                    </>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default BeerCalendar;
