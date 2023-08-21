import { ActionType } from './ActionType'

const createActions = (dispatch: TDispatch<IAction>) => {
    return {
      setLanguage: (language: string) => dispatch({ type: ActionType.SET_LANGUAGE, language}), 
      setFlatsCount: (flatsCount: number) => dispatch({ type: ActionType.SET_FLATS_COUNT, flatsCount}),
      setFlats: (flats: Array<IFlat>) => dispatch({ type: ActionType.SET_FLATS, flats}),
    };
}

export default createActions;

  