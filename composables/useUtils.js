export const useUtils = () => {
  return {
    random: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
    randomInt: (min, max) => parseInt(Math.random() * (max - min) + min)
  }
}
