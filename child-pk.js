const axios = require('axios');

const domains = ['NOTEBOOKS','SUPPLEMENTS','PRINTERS','BICYCLES','WRISTWATCHES','SMARTWATCHES','TABLETS','BACKPACKS','CATS_AND_DOGS_FOODS','MOTORCYCLE_HELMETS','JACKETS_AND_COATS','OFFICE_CHAIRS','PANTS','MATTRESSES','SUNGLASSES','HANDBAGS'];

const countAttributesWithChildPks = ({ tags }) => tags.relevance === 1 && tags.hierarchy === 'CHILD_PK';
const countChildPKs = (res) => res.data.attributes.filter(countAttributesWithChildPks).length;

for (let i = 0; i < domains.length; i++) {
  const domainId = `MLA-${domains[i]}`;
  axios
  .get(`https://api.mercadolibre.com/catalog_domains/${domainId}`)
  .then(res => console.log(domainId, countChildPKs(res)))
  .catch(err => console.error(domainId, err.message));
}


