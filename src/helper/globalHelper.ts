
const defaultDelay = 5 * 1000

export const generateSlug = (title: string):string => title.toLowerCase().replace(/[^a-z0-9]/g, '-');
export const delay = (ms: number = defaultDelay): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
export const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);
