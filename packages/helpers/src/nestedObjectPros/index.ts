// TODO:
// i should check for \w and \d instead of specieal charachters
// and also i need to add a skip charachters e.g.: \\(name), %...
function isSpecialChar(s: string): boolean {
  return ["{", "}", "(", ")", "[", "]", "-", "_", "/", "|", " "].includes(s);
}

export function getNestedProperty<T>(
  obj: Record<string, unknown>,
  key: string,
): T | undefined {
  let finalValue: string = "";
  let currentKey = "";

  let targetObject = obj;

  for (let i = 0; i < key.length; i++) {
    const k = key[i];
    if (isSpecialChar(k)) {
      if (currentKey.trim().length !== 0 && k !== "-" && k !== "_") {
        finalValue += targetObject[currentKey];
        currentKey = "";
        targetObject = obj;
      }

      if ((k === "-" || k === "_") && /\w/i.test(k)) {
        currentKey += k;
      } else {
        finalValue += k;
      }
    } else if (k === "." && currentKey) {
      targetObject = targetObject[currentKey] as Record<string, unknown>;
      currentKey = "";
    } else {
      currentKey += k;
    }
  }

  if (currentKey) {
    if (finalValue) finalValue += targetObject[currentKey];
    // @ts-expect-error this is not an error
    else finalValue = targetObject[currentKey];
  }

  return finalValue as T | undefined;
}

export const updateNestedProperties = <T extends Record<string, unknown>>(
  obj: T,
  key: string,
  newValue: unknown,
): T => {
  const newObj = { ...obj };

  const keys = key.split(".");
  let value: Record<string, unknown> | undefined = newObj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (typeof value[keys[i]] !== "object" || value[keys[i]] === null) {
      value[keys[i]] = {};
    }
    value = value[keys[i]] as Record<string, unknown>;
  }

  value[keys[keys.length - 1]] = newValue;

  return newObj;
};
