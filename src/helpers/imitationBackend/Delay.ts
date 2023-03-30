export const Delay = () => {
  return new Promise((res, rej) => {
    setTimeout(res, 1000);
  });
};
