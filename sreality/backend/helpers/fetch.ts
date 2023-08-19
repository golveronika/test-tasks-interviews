const axios = require('axios');
const { srealityApi } = require('./../utils/constants');

const getFlatsCount = async (lang: string = '') => {

    const flatsCount = await axios(`${srealityApi.baseUrl}/${lang}/v2/estates/count`, {
        params: {
            category_main_cb: 1,
            category_type_cb: 1,
            locality_country_id: 112,
            locality_region_id: 10,
        }
    })
    .then((response: { data: { result_size: any; }; }) => ({
        count: response.data.result_size,
        success: true
    }))
    .catch((error: any) => {
        console.log("error", error);
        return {
            success: false
        }
    });

    return flatsCount;

}

const getFlats = async (lang: string = '', count:number = 0) => {
    
    const flats = await axios(`${srealityApi.baseUrl}/${lang}/v2/estates`, {
        params: {
            category_main_cb: 1,
            category_type_cb: 1,
            locality_country_id: 112,
            locality_region_id: 10,
            per_page: count
        }
    }).then((response: { data: any; }) => {

        let result = response?.data?._embedded?.estates || [];
        result = result.map((flat: { name: any; _links: { images: any; }; locality: any; price_czk: { value_raw: any; }; hash_id: any; gps: any; }) => ({
            name: flat?.name || '',
            images: flat?._links?.images || [],
            locality: flat?.locality || '',
            price: flat?.price_czk?.value_raw || 0,
            webLink: `${srealityApi.webLink}${flat?.hash_id}`,
            // gps: flat?.gps || null,
        }))
        
        return ({
            count: result.length,
            flats: result,
            success: true
        }) 
    })
    .catch((error: any) => {
        console.log("error", error);
        return {
            success: false
        }
    });

    return flats;
}

module.exports = {
    getFlatsCount,
    getFlats
}