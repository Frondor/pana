const axios = require('axios');

const domains = [
  'NOTEBOOKS',
  'SUPPLEMENTS',
  'PRINTERS',
  'BICYCLES',
  'WRISTWATCHES',
  'SMARTWATCHES',
  'TABLETS',
  'BACKPACKS',
  'CATS_AND_DOGS_FOODS',
  'MOTORCYCLE_HELMETS',
  'JACKETS_AND_COATS',
  'OFFICE_CHAIRS',
  'PANTS',
  'MATTRESSES',
  'SUNGLASSES',
  'HANDBAGS',
];

const countVPKs = (res) =>
  res.data.attributes.filter(
    ({ tags }) =>
      !tags.apd_tags.includes('THI') && tags.apd_tags.includes('VPK')
  ).length;

for (let i = 0; i < domains.length; i++) {
  const domainId = `MLA-${domains[i]}`;
  axios
    .get(`https://api.mercadolibre.com/catalog_domains/${domainId}`)
    .then((res) => console.log(domainId, countVPKs(res)))
    .catch((err) => console.error(domainId, err.message));
}
