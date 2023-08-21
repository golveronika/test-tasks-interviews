import axios from "axios";

declare global {
  interface Window {
    ENDPOINTS: {
      getFlatsCountFromDB: string;
      getFlatsFromDB: string;
      postFlatsFromApiToDB: string;
    };
  }
}

const getFlatsCountFromDB = (): Promise<IFlatsCountResponse> => {
  return new Promise((resolve) => {
    axios
      .get(window.ENDPOINTS.getFlatsCountFromDB)
      .then((response) => {
        resolve({
          success: true,
          count: response.data.count,
        });
      })
      .catch(() => {
        resolve({
          success: false,
          count: 0,
        });
      });
  });
};

const getFlatsFromDB = (
  limit: number,
  offset: number
): Promise<IFlatsResponse> => {
  return new Promise((resolve) => {
    axios
      .get(`${window.ENDPOINTS.getFlatsFromDB}/${limit}/${offset}`)
      .then((response) => {
        resolve({
          success: true,
          flats: response.data.flats,
        });
      })
      .catch(() => {
        resolve({
          success: false,
          flats: [],
        });
      });
  });
};

const postFlatsFromApiToDB = (
  lang: string,
  count: number
): Promise<IFlatsApiResponse> => {
  return new Promise((resolve) => {
    axios
      .post(window.ENDPOINTS.postFlatsFromApiToDB, {
        lang,
        count,
      })
      .then((response) => {
        resolve({
          success: true,
          count: response.data.count,
        });
      })
      .catch(() => {
        resolve({
          success: false,
          count: 0,
        });
      });
  });
};

export { getFlatsCountFromDB, getFlatsFromDB, postFlatsFromApiToDB };
