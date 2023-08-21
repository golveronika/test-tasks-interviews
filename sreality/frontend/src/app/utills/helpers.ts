const browserLocale = (): string => {
  let lang;
  if (navigator.languages && navigator.languages.length) {
    // latest versions of Chrome and Firefox set this correctly
    lang = navigator.languages[0];
    // @ts-ignore
  } else if (navigator.userLanguage) {
    // IE only
    // @ts-ignore
    lang = navigator.userLanguage;
  } else {
    // latest versions of Chrome, Firefox, and Safari set this correctly
    lang = navigator.language;
  }
  return lang.slice(0, 2);
};

const getArrayFromLength = (length: number): Array<number> => {
  const newArray = [];
  for (let indx = 1; indx <= length; indx++) {
    newArray.push(indx);
  }

  return newArray;
};

export { browserLocale, getArrayFromLength };
