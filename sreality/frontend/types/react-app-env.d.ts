/// <reference types="react-scripts" />


interface IStoreProps {
  children: React.ReactNode;
}

type TDispatch<A> = (action: A) => void;

interface IAction {
  type: ActionType;
  [propName: string]: any;
}

interface IContextActions {
  setLanguage: (language: string) => TDispatch<IAction, string>;
  setFlatsCount: (flatsCount: number) => TDispatch<IAction, number>;
  setFlats: (flats: Array<IFlat>) => TDispatch<IAction, Array<IFlat>>;
}

interface IState {
  language: string;
  flatsCount: number;
  flats: Array<IFlat>;
}

interface IContext {
  state: IState;
  actions: IContextActions;
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

interface IFlatsCountResponse {
  [x: string]: any;
  success: boolean;
  count: number;
}

interface IFlatsResponse {
  [x: string]: any;
  success: boolean;
  flats: Array<IFlat>;
}

interface IFlatsApiResponse {
  [x: string]: any;
  success: boolean;
  count: number;
}