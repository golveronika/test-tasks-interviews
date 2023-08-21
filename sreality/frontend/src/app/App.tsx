import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "./../context";

import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import Header from "./components/Header";
import FlatsList from "./components/FlatsList";

import {
  getFlatsCountFromDB,
  getFlatsFromDB,
  postFlatsFromApiToDB,
} from "./utills/fetch";

const App = () => {
  // @ts-ignore
  const { actions } = useContext<IContext>(Context);
  const { i18n, t } = useTranslation();

  const [isInitialize, setIsInitialize] = useState(false); // Prevent double render
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const initFlats = async () => {
    let flatsCount = await getFlatsCountFromDB().then(
      (result: IFlatsCountResponse) => (!result.success ? -1 : result.count)
    );

    if (flatsCount < 0) {
      // Server Error
      setIsError(true);
      setIsLoaded(true);
      return;
    } else {
      if (flatsCount === 0) {
        // Don't have Flats in DB
        flatsCount = await postFlatsFromApiToDB(i18n.language, 500).then(
          (result: IFlatsApiResponse) => (!result.success ? -1 : result.count)
        );
        if (flatsCount < 0) {
          // Server Error
          setIsError(true);
          setIsLoaded(true);
          return;
        }
      }
      const limit = flatsCount > 10 ? 10 : flatsCount;
      const offset = 0;
      const flats = await getFlatsFromDB(limit, offset).then(
        (result: IFlatsResponse) => (!result.success ? null : result.flats)
      );

      if (!flats) {
        // Server Error
        setIsError(true);
      } else {
        actions.setFlatsCount(flatsCount);
        actions.setFlats(flats); // Success
      }

      setIsLoaded(true);
      return;
    }
  };

  useEffect(() => {
    if (isInitialize) {
      initFlats();
    } else {
      setIsInitialize(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialize]);

  if (!isLoaded)
    return (
      <>
        <Header />
        <Modal
          show={!isLoaded}
          animation={true}
          centered={true}
          className="spinner-modal"
        >
          <Modal.Body>
            <Spinner animation="border" role="status" className="text-light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Modal.Body>
        </Modal>
      </>
    );

  if (isLoaded && isError)
    return (
      <>
        <Header />
        <div className="text-white fw-bolder text-center bg-secondary w-100 p-3 d-flex justify-content-center align-items-center error-container">
          {t("serverError")}
        </div>
      </>
    );

  return (
    <>
      <Header />
      <FlatsList />
    </>
  );
};

export default App;
