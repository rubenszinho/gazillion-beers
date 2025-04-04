export default {
  title: 'Contador de Gazilhões de Cerveja',
  daysRemaining: 'Gazilhões restantes neste ano:',
  checkedIn: 'Você já registrou hoje',
  checkIn: 'Bebi um Gazilhão de Cervejas Hoje!',
  countMessage: (count: number) =>
    count === 1
      ? 'Você já tomou 1 gazilhão de cerveja este ano.'
      : `Você já tomou ${count} gazilhões de cerveja este ano.`,
  streakDays: 'Maior sequência de cervejas: {count} dias',
};
