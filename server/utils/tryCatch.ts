export default async function tryCatch(promise: any, ...args: any[]) {
  let toReturn: [any | null, any | null];
  try {
    const result = await promise(...args);
    toReturn = [result, null];
  } catch (err) {
    toReturn = [null, err];
  }
  return toReturn;
}
