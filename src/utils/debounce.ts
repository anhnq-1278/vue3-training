export const debounce = (func: Function, DELAY_TIME = 1000) => {
  let timeout: any = null
  clearTimeout(timeout);
  timeout = setTimeout(func, DELAY_TIME);
};
