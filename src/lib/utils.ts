import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: Array<ClassValue>) => {
  return twMerge(clsx(inputs));
};

export const getCurrentSemester = () => {
  const date = new Date();
  const month = date.getMonth() + 1;

  const year = date.getFullYear();
  const semester = month >= 8 ? "H" : "V";

  return `${year}${semester}`;
};
