const path = require("path");
const localeDefinition = require("./src/config/locales.json");

module.exports = {
  i18n: {
    defaultLocale: localeDefinition.defaultLocale,
    locales: localeDefinition.locales,
    keySeparator: false,
    localePath: path.resolve("./public/static/locales"),
  },
  react: {
    useSuspense: false,
  },
};
