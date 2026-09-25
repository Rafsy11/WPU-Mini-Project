const storage = typeof window === "undefined" ? null : localStorage;

const getLocalStorage = (key: string) => {
  const value = storage?.getItem(key);
  if (!value) return "";
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const setLocalStorage = (key: string, value: string) =>
  storage?.setItem(key, JSON.stringify(value));

const removeLocalStorage = (key: string) => storage?.removeItem(key);

export { getLocalStorage, setLocalStorage, removeLocalStorage };
