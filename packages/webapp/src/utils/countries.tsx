import { Countries } from '@bigcapital/webapp/constants/countries';

export const getAllCountries = () => {
  return Object.keys(Countries).map((countryCode) => {
    return {
      ...Countries[countryCode],
      countryCode,
    };
  });
};
