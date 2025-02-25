import { categoryMap } from "@/lib/data/data";
export const renameCategory = (cyrillicName: string): string => {
  return categoryMap[cyrillicName.toLowerCase()] || cyrillicName; // Повертає англійську назву або оригінальну, якщо відповідність не знайдено
};
