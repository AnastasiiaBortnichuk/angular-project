export const environment = {
  BASE_URL: 'http://makeup-api.herokuapp.com/api/v1/products',
  BASE_JSON_URL: "",
  URL_SEARCH: '?product_type=',
};

environment.BASE_JSON_URL = `${environment.BASE_URL}.json`
