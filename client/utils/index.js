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