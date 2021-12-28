export function setWithExpiry(key, value, timeToLive) {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + timeToLive
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  let item;

  try {
    item = JSON.parse(itemStr);
  } catch (error) {
    localStorage.removeItem(key);
    return null;
  }

  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
