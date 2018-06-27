import gql from 'graphql-tag';

export interface ICountry {
  code: string;
  name: string;
}

export interface ICountryResponse {
  country: ICountry[];
}

export const query = gql`
{
  country {
    name,
    code
  }
}
`;
