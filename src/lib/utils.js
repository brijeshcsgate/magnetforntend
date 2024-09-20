import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function toTitleCase(str) {
  return str
    ?.toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export const generateRandomString = ({
  length = 5,
  includeDate = true,
} = {}) => {
  const randomPart = Math.random()
    .toString(36)
    .substring(2, 2 + length);
  const datePart = includeDate ? Date.now().toString(36) : '';
  return randomPart + datePart;
};
