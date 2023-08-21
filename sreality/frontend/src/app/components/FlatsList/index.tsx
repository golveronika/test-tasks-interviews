import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Context } from "../../../context";

import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import Paginator from "./partials/Paginator";

import FlatItem from "./partials/FlatItem";

import { getFlatsFromDB } from "./../../utills/fetch";

const FlatsList = () => {
  // @ts-ignore
  const { state, actions } = useContext<IContext>(Context);
  const { t } = useTranslation();

  const aviablePageCounts = [10, 20, 40, 60];

  const [perPageCount, setPerPageCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(Math.ceil(state.flatsCount / 10));

  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setIsLoaded(false);
    getFlatsFromDB(perPageCount, (currentPage - 1) * perPageCount)
      .then((result: IFlatsResponse) => {
        if (result.success) {
          actions.setFlats(result.flats);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, [currentPage]);

  const handleChangePageCount = (newPerPageCount: number) => {
    if (newPerPageCount === perPageCount) return;

    setPerPageCount(newPerPageCount);
    setCurrentPage(1);
    setPageCount(Math.ceil(state.flatsCount / newPerPageCount));

    setIsLoaded(false);
    getFlatsFromDB(newPerPageCount, 0)
      .then((result: IFlatsResponse) => {
        if (result.success) {
          actions.setFlats(result.flats);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .finally(() => {
        setIsLoaded(true);
      });
  };

  const handleClickPage = (newPage: number) => {
    if (newPage === currentPage) return;
    setCurrentPage(newPage);
  };

  return (
    <Container>
      <h2 className="text-center my-4">{t("flatsForSale")}</h2>
      <div className="d-flex align-items-center justify-content-center">
        <span className="d-block me-2">{t("perPage")}</span>
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            size="sm"
            id="dropdown-custom-components"
          >
            {perPageCount}
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-auto mw-unset">
            {aviablePageCounts.map((ppc, indx) => (
              <Dropdown.Item
                key={indx}
                eventKey={indx}
                active={ppc === perPageCount}
                onClick={() => handleChangePageCount(ppc)}
              >
                {ppc}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="d-flex flex-column">
        {state.flats.map((flat, indx) => (
          <FlatItem key={indx} flat={flat} />
        ))}
      </div>

      <div className="d-flex justify-content-center paginator-container p-1 mt-4">
        <Paginator
          currentPage={currentPage}
          pageCount={pageCount}
          handleClickPage={handleClickPage}
        />
      </div>

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
    </Container>
  );
};

export default FlatsList;
