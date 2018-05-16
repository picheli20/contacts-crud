import { ICountry } from "app/core/country/country.graphql";

export interface Contact {
  id?: number;
  name: string;
  surname: string;
  email: string;
  country: ICountry;
  [key: string]: string | number | ICountry;
}
