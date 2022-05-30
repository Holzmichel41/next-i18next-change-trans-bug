import { NextRequest, NextResponse } from "next/server";
import {
  countriesThreeLetters,
  defaultCountryThreeLetters,
  isValidCountryThreeLetters,
} from "../config/countries";

// Regex Pattern originates from https://nextjs.org/docs/advanced-features/i18n-routing#prefixing-the-default-locale
const PUBLIC_FILE = /\.(.*)$/;

export const middleware = (request: NextRequest) => {
  const safeToRedirect =
    !PUBLIC_FILE.test(request.nextUrl.pathname) &&
    !request.nextUrl.pathname.includes("/api/");

  const splitPaths = request.nextUrl.pathname.split("/");
  const localePathParam = splitPaths[0];
  const countryPathParam = splitPaths[1];

  const shouldHandleLocale = request.nextUrl.locale === "default";

  const shouldHandleCountry = !countriesThreeLetters.some((country: string) => {
    return countryPathParam == country;
  });

  const country =
    shouldHandleCountry && isValidCountryThreeLetters(request.geo?.country)
      ? request.geo?.country
      : defaultCountryThreeLetters;

  const path = shouldHandleLocale
    ? `/${localePathParam}`
    : "" + shouldHandleCountry
    ? `/${country}`
    : "";

  if (safeToRedirect && (shouldHandleCountry || shouldHandleLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url);
  } else {
    return undefined;
  }
};
