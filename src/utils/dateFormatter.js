// utils/dateFormatter.ts

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Alternative using Intl.DateTimeFormat
export const formatDateLocale = (dateString: string, locale: string = 'en-US'): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};

const formatTime24 = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}