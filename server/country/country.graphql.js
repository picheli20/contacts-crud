const countryList = require('country-list')();

// GraphQL schema
const schema = `
type Query {
    country(code: String): [Country]
},
type Country {
    code: String
    name: String
}
`;

const country = {
  country: (args) => {
    const countries = countryList.getData();

    if (args.code) {
        return countries.filter(country => country.code === args.code);
    } else {
        return countries;
    }
  }
}

module.exports = { schema, country };
