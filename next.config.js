const { getRoutes } = require("./src/utils/getRoutes");
const path = require("path");

const localesPath = "./public/static/locales";
const localeDefinition = require("./src/config/locales.json");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Direct loading of the i18n.config.js disables "en" as a locale prefix in the url
  i18n: {
    defaultLocale: "default",
    locales: [...localeDefinition.locales, "default"],
  },
  async redirects() {
    return await getRoutes(localesPath, ([key, value], locale) => ({
      source: path.posix.join(`/${locale}`, ":country", encodeURI(key)),
      destination: path.posix.join(`/${locale}`, ":country", encodeURI(value)),
      locale: false,
      permanent: false, // Change this to true once production ready
    }));
  },
  async rewrites() {
    return await getRoutes(localesPath, ([key, value], locale) => ({
      source: path.posix.join(`/${locale}`, ":country", encodeURI(value)),
      destination: path.posix.join(`/${locale}`, ":country", encodeURI(key)),
      locale: false,
    }));
  },
  react: { useSuspense: false },
  webpack(config) {
    return config;
  },
}

module.exports = nextConfig
