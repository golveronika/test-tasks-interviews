
// https://www.sreality.cz/api/en/v2/estates 
// /estates – nemovitosti odpovídající předávaným parametrům se základními údaji,
// category_main_cb: 1 - typ nemovitosti: 1: byt,
// category_type_cb: 1 - Typ inzerátu: 1: prodej,
// locality_region_id: 10 - Kraj: 10: Praha,
// per_page: 20 - Počet výsledků na stránku, přičemž UI nabízí hodnoty: • 60.
// tms: 1692315103902 - Timestamp ve formátu známém jako UNIX time2

/// https://www.sreality.cz/api/en/v2/estates/count
// /count – počet nemovitostí v Sreality databázi odpovídající předávaným parametrům,
// category_main_cb: 1 - typ nemovitosti: 1: byt,
// category_type_cb: 1 - Typ inzerátu: 1: prodej,
// locality_country_id: 112 - Země: 112: Česká republika,
// locality_region_id: 10 - Kraj: 10: Praha,

const tables_definitions = {
    "flats_images" : `CREATE TABLE flats_images(
        id INT GENERATED ALWAYS AS IDENTITY,
        flats_id INT,
        href VARCHAR(255) NOT NULL,
        PRIMARY KEY(id),
        CONSTRAINT fk_flats
        FOREIGN KEY(flats_id) 
        REFERENCES flats(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    ); `,
    "flats" : `CREATE TABLE flats(
        id INT GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(255),
        locality VARCHAR(255),
        price INT,
        webLink VARCHAR(255),
        PRIMARY KEY(id)
     ); `
}

module.exports = {
    srealityApi: {
        baseUrl: 'https://www.sreality.cz/api/',
        webLink: 'https://www.sreality.cz/detail/1/2/3/4/'
    },
    tablesDefinitions: tables_definitions
};