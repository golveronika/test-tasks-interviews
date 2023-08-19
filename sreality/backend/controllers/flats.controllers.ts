
import { Request, Response } from 'express';

const queries = require('./../helpers/queries');
const endpoints = require('./../helpers/fetch');

class FlatsController {
    async getFlatsCountFromDB (req: Request, res: Response) {

        const count =  await queries.selectFlatsCount();

        res.json({
            count
        })
    }
    async getFlatsFromDB (req: Request, res: Response) {

        const limit = typeof(parseInt(req.params.limit)) === "number" ? parseInt(req.params.limit) : 0;
        const offset = typeof(parseInt(req.params.offset)) === "number" ? parseInt(req.params.offset) : 10;

        const flats =  await queries.selectFlats(limit, offset);

        res.json({
            limit,
            offset,
            flats
        })

    }
    async postFlatsFromApiToDB(req: Request, res: Response) {

        const { lang, count } = req.body;

        const maxFlatsCount = (Number(count || 1) - 1);

        const flatsFromApi = await endpoints.getFlats(lang, maxFlatsCount);

        await queries.dropTables(['flats_images', 'flats']);
        await queries.createTables(['flats', 'flats_images']);

        const success = await queries.insertFlats(flatsFromApi.flats);

        res.json({
            success,
            ...flatsFromApi
        })

    }
    async postFlatsToDB(req: Request, res: Response) {

        const { flats } = req.body;

        await queries.dropTables(['flats_images', 'flats']);
        await queries.createTables(['flats', 'flats_images']);

        const success = await queries.insertFlats(flats);

        res.json({
            success
        })

    }
    async getFlatsForSale(req: Request, res: Response) {

        const { lang, count } = req.params;

        const maxFlatsCount = (Number(count || 1) - 1);

        const flats = await endpoints.getFlats(lang, maxFlatsCount);

        res.json(flats)

    }
    async getFlatsForSaleCount(req: Request, res: Response) {

        const { lang } = req.params;

        const flatsCount = await endpoints.getFlatsCount(lang)

        res.json(flatsCount)
    }
}


module.exports = new FlatsController()