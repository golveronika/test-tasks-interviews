import { browserLocale } from './../app/utills/helpers'

const initialState: IState = {
    language: browserLocale(),
    flatsCount: 0,
    flats: []
};

export default initialState 