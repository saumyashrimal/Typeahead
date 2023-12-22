import Fruits from "./data";

// takes fruit and make an api call and return list of searched fruits
const fetchFruits = async (query, signal) => {
  if (signal.aborted) {
    console.log("signal");
    return Promise.reject(new DOMException("aborted", "abort Error"));
  }
  const result = Fruits.filter(
    (fruit) =>
      fruit.substring(0, query.length).toLowerCase() === query.toLowerCase()
  );
  console.log("fetch result = ", result);
  return new Promise((resolve, reject) => {
    let timer;

    const abortHandler = () => {
      clearTimeout(timer);
      reject(new DOMException("aborted", "abort Error"));
    };
    timer = setTimeout(() => {
      resolve(result);
      signal.removeEventListener("abort", abortHandler);
    }, 1000);
    signal.addEventListener("abort", abortHandler);
  });
};

// debounce

let debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(this, args);
    }, delay);
  };
};

export { fetchFruits, debounce };
