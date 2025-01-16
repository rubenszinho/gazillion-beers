export default {
  title: 'Gazillion Beers Tracker',
  daysRemaining: 'Gazillions remaining this year:',
  checkedIn: 'Already Checked In Today',
  checkIn: 'I Drank a Gazillion Beers Today!',
  countMessage: (count: number) =>
    count === 1
      ? 'You have had 1 gazillion beer this year.'
      : `You have had ${count} gazillion beers this year.`,
};
