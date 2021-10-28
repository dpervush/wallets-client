export const getValueFromCookie = (key, cookie) => {
  if (cookie) {
    const parsedCookie = cookie.split(";").reduce((res, cookie) => {
      const keyValue = cookie.split("=");
      return { ...res, [keyValue[0].trim()]: keyValue[1].trim() };
    }, {});

    return parsedCookie[key];
  }

  return "";
};
