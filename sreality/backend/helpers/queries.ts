const db = require('./../config/db');
const { tablesDefinitions } = require('./../utils/constants');

const checkIfTableExist = async (tableName: string) => {
    if (!tableName) return false;
    const isTableExist = await db.query(
        `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1) AS exists;`,
        [tableName]
    )
    return isTableExist?.rows[0]?.exists || false;
}

const dropTables = async (tableNames: Array<string> = []) => {

    if (!tableNames.length) return;

    await db.query(tableNames.map((name) => `DROP TABLE IF EXISTS ${name}; `).join(''))

}

const createTables = async (tableNames: Array<string> = []) => {

    if (!tableNames.length) return;

    await db.query(tableNames.map((name) => (tablesDefinitions[name] || '')).join(''))

}


interface IFlat {
    name: string;
    images: Array<{
        href: string;
    }>;
    locality: string;
    price: number;
    webLink: string;
}


const insertFlats = async (flats: Array<IFlat>) => {

    let success = true;

    try {

        await db.query('BEGIN');

        for (let indx = 0; indx < flats.length; indx++) {
            const flat = flats[indx];
            const { name, locality, price, webLink, images } = flat;

            const insertFlatText = 'INSERT INTO flats (name, locality, price, webLink) VALUES($1, $2, $3, $4) RETURNING id';
            const resFlat = await db.query(insertFlatText, [name, locality, price, webLink]);
            const flatId = resFlat.rows[0].id;

            for (let indxImg = 0; indxImg < images.length; indxImg++) {
                const image = images[indxImg];
                const { href } = image;

                const insertImageText = 'INSERT INTO flats_images (flats_id, href) VALUES ($1, $2)';
                await db.query(insertImageText, [flatId, href]);
            }
                        
        }

        await db.query('COMMIT');

      } catch (e) {

        await db.query('ROLLBACK');
        success = false;

      }

      return success;

}

const selectFlats = async (limit: number, offset: number) => {

    const selectFlatsText = 'SELECT * FROM flats LIMIT $1 OFFSET $2;';
    const resFlats = await db.query(selectFlatsText, [limit, offset]);
    const flats = resFlats.rows || [];

    for (let indx = 0; indx < flats.length; indx++) {
        const flat = flats[indx];
        const flatId = flat.id;
        const selectImagesText = 'SELECT href FROM flats_images WHERE flats_id = $1;';
        const resFlatsImages = await db.query(selectImagesText, [flatId]);
        flat.images = resFlatsImages.rows || [];
    }

    return flats
}

const selectFlatsCount = async () => {

    const isTableExist = await checkIfTableExist('flats');

    if (!isTableExist) return 0;

    const selectFlatsText = 'SELECT count(*) FROM flats;';
    const resFlats = await db.query(selectFlatsText);
    const count = parseInt(resFlats.rows[0].count);

    return count;

}

module.exports = {
    checkIfTableExist,
    dropTables,
    createTables,
    insertFlats,
    selectFlats,
    selectFlatsCount
}