import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
    Box,
    Button,
    Grid,
    Modal,
    Paper,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';

import BeerIcon from './BeerIcon';

interface BeerCalendarProps {
    checkInDates: string[];
    currentYear: number;
}

const BeerCalendar: React.FC<BeerCalendarProps> = ({ checkInDates, currentYear }) => {
    const [open, setOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const theme = useTheme();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
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
                        width: '90%',
                        maxWidth: 600,
                        p: 3,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h5" component="h2" align="center" gutterBottom>
                        Beer Calendar {currentYear}
                    </Typography>

                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Button onClick={previousMonth}>&lt; Previous</Button>
                        <Typography variant="h6">{monthNames[selectedMonth]}</Typography>
                        <Button onClick={nextMonth}>Next &gt;</Button>
                    </Box>

                    <Grid container spacing={1}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <Grid item xs={12 / 7} key={day}>
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        p: 1,
                                    }}
                                >
                                    {day}
                                </Box>
                            </Grid>
                        ))}

                        {days.map((day, index) => (
                            <Grid item xs={12 / 7} key={index}>
                                <Box
                                    sx={{
                                        height: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #eee',
                                        borderRadius: 1,
                                        position: 'relative',
                                        backgroundColor: day ? (
                                            isCheckedInDate(day)
                                                ? `${theme.palette.primary.light}30`
                                                : 'white'
                                        ) : 'transparent',
                                        opacity: day ? 1 : 0,
                                    }}
                                >
                                    {day && (
                                        <>
                                            {day.getDate()}
                                            {isCheckedInDate(day) && (
                                                <Tooltip title="Gazillion Beer Day!">
                                                    <Box
                                                        component={BeerIcon}
                                                        sx={{
                                                            position: 'absolute',
                                                            bottom: '2px',
                                                            right: '2px',
                                                            fontSize: '0.8rem',
                                                            color: theme.palette.primary.main
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
