export const fetcher = url => fetch(url).then(res => res.json());

export const to = (promise, errorExt) =>
  promise
  .then((data) => [null, data])
  .catch((err) => {
    if (errorExt) {
      Object.assign(err, errorExt);
    }
    return [err, undefined];
  });

export const handleAPIResponse = (err, res) => {
  if (err || res.status !== 200) {
    return [err.response.data.error, null];
  }
  return [err, res.data];
};


export const isEmptyObj = (obj) => {
  if (obj === undefined) return true;
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};