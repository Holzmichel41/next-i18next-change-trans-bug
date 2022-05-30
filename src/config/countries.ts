import countries from "./countries.json";

type CountryTwoLetters = keyof typeof countriesMapping;
export type CountryThreeLetters = typeof countriesMapping[CountryTwoLetters];

export const defaultCountry = "de";

const countriesMapping = countries;

export const countriesThreeLetters: CountryThreeLetters[] =
  Object.values(countriesMapping);

const convertCountryToThreeLetters = (country: CountryTwoLetters) => {
  return countriesMapping[country];
};
export const defaultCountryThreeLetters =
  convertCountryToThreeLetters(defaultCountry);

export const isValidCountryThreeLetters = (
  country: any
): country is CountryThreeLetters => {
  return (
    typeof country === "string" &&
    countriesThreeLetters.find((item) => item === country) !== undefined
  );
};

export const convertCountryToTwoLetters = (country: CountryThreeLetters) => {
  return (Object.keys(countriesMapping) as CountryTwoLetters[]).find(
    (key) => countriesMapping[key] === country
  )!;
};

export const parseURLCountry = (country: any) => {
  if (isValidCountryThreeLetters(country)) {
    return country;
  }
  return "deu";
};
