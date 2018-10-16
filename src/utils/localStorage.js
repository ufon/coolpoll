const storageKey = 'coolpool-token';

export default {
  write: token => localStorage.setItem(storageKey, token),
  read: () => localStorage.getItem(storageKey),
  delete: () => localStorage.removeItem(storageKey)
};
