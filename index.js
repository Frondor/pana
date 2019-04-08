const axios = require('axios');

// const [nodePath, filePath, domainName, ...siteLetters] = process.argv;

// if (!domainName) throw new Error('Falta domain');
// else if (!siteLetters.length) siteLetters.push('a', 'b', 'm');

const DOMAINS = 'NOTEBOOKS,VEHICLE_PARTS,SUPPLEMENTS,PRINTERS,TELEVISIONS,WRISTWATCHES,BICYCLES,INK_CARTRIDGES,SMARTWATCHES,ACTION_FIGURES,BACKPACKS,TABLETS,SURVEILLANCE_CAMERAS,T_SHIRTS,REFRIGERATORS,SOUVENIRS,TOYS_AND_GAMES,AUTOMOTIVE_HEADLIGHTS,CATS_AND_DOGS_FOODS,ARTS_AND_CRAFTS,JACKETS_AND_COATS,MATTRESSES,MOTORCYCLE_HELMETS,SOLDERING_MACHINES,STORAGE_WATER_HEATERS,COMPUTER_MONITORS,OFFICE_CHAIRS,PANTS,CAR_WHEELS,KITCHEN_POTS,HANDBAGS,RAM_MEMORY_MODULES,SUNGLASSES,AUTOMOTIVE_SPEAKERS,VIDEO_GAME_CONTROLLERS,RANGES,MICROPHONES,HEATERS,FACIAL_SKIN_CARE_PRODUCTS,HAIR_CLIPPERS,FANS,FOOTBALL_SHIRTS,LIGHT_BULBS,SWEATSHIRTS_AND_HOODIES,CAMERA_LENSES,ELECTRIC_SAWS,BABY_STROLLERS,DRONES,BATHROOM_FAUCET_SETS,FOG_LIGHTS,FOOTBALL_SHOES,DOLLS,FLOOD_LIGHTS,ELECTRIC_PRESSURE_WASHERS,COMPUTER_PROCESSORS,MEMORY_CARDS,OVENS,CAR_STEREOS,SCHOOL_AND_OFFICE_PAPERS,AIRSOFT_GUNS,CAR_MULTIMEDIA_SYSTEMS,SEWING_MACHINES,DINING_SETS,COFFEE_MAKERS,AUTOMOTIVE_AMPLIFIERS,WATER_PURIFIERS_FILTERS,NECKLACES,ARDUINO_MICROCONTROLLERS,HATS_AND_CAPS,PEDAL_EFFECTS,BODY_SKIN_CARE_PRODUCTS,ALARMS_AND_SENSORS,ELECTRIC_GUITARS,AUTOMOTIVE_SIDE_VIEW_MIRRORS,SOUND_CONSOLES,BABY_CAR_SEATS,PUREBRED_DOGS,BODY_SHAPERS,VIDEO_GAME_PREPAID_CARDS,SPORT_WATCHES,LOAFERS_AND_OXFORDS,WALKIE_TALKIES,AIR_COMPRESSORS,POINTS_OF_SALE_KITS,SUITCASES,ALL_IN_ONE,DOORS,MALE_UNDERWEAR,BLENDERS,LAPTOP_BATTERIES,PAINTINGS,SCREEN_PRINTERS,FLEA_AND_TICK_TREATMENTS,SHIRTS,CARPETS,MUSICAL_KEYBOARDS,BRACELETS,BATHROOM_FAUCETS,AUTOMOTIVE_CLUTCH_KITS,TREADMILLS,WALL_LIGHTS,DEEP_FRYERS,HOME_OFFICE_DESKS,CAR_SEAT_COVERS,DISTRIBUTION_KITS,COSTUMES,GATE_MOTORS,GAZEBOS,SHORTS,SHOWER_HEADS'
  .split(',')
  .map((domain) =>
    ['MLA', 'MLB', 'MLM'].map((siteId) => `${siteId}-${domain}`)
  );

const promises = DOMAINS.reduce(
  (requests, domainIds) =>
    requests.concat(
      domainIds.map((domainId) =>
        axios
          .get(`https://api.mercadolibre.com/catalog_domains/${domainId}`)
          .then(({ data }) => {
            const variationsAllowed = data.attributes.some((attr) => {
              if (attr.tags.apd_tags.includes('THI')) {
                return false;
              }

              return attr.tags.apd_tags.some(
                (tag) => tag === 'VPK' || tag === `VPK_${domainId.split('-')[0]}`
              );
            });

            return { [domainId]: variationsAllowed };
          })
          .catch(err => {
            // if (err instanceof ReferenceError) {
            //   console.log(domainIds, err;
            // }

            if (err.code === 'ENOTFOUND' || err.response && err.response.status === 404) return;
            throw err;
          })
      )
    ),
  []
);

Promise.all(promises)
  .then((results) => {
    console.log(results);
  })
  .catch(console.log);
