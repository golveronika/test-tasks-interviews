import Pagination from "react-bootstrap/Pagination";
import { getArrayFromLength } from "./../../../utills/helpers";

interface IPaginatorProps {
  currentPage: number;
  pageCount: number;
  handleClickPage: (newPage: number) => void;
}

const Paginator = ({
  currentPage,
  pageCount,
  handleClickPage,
}: IPaginatorProps) => {
  return (
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => handleClickPage(currentPage - 1)}
      />
      {currentPage >= 7 && pageCount > 10 && (
        <Pagination.Item
          onClick={() => handleClickPage(1)}
          active={currentPage === 1}
        >
          {1}
        </Pagination.Item>
      )}
      {pageCount > 10 && currentPage >= 7 && <Pagination.Ellipsis />}

      {pageCount > 10 &&
        currentPage >= 7 &&
        (pageCount - 4 <= currentPage
          ? Array.from([-8, -7, -6, -5, -4, -3, -2, -1, 0]).map((i) => (
              <Pagination.Item
                key={i}
                onClick={() => handleClickPage(pageCount + i)}
                active={pageCount + i === currentPage}
              >
                {pageCount + i}
              </Pagination.Item>
            ))
          : Array.from([-4, -3, -2, -1, 0, 1, 2, 3, 4]).map((i) => (
              <Pagination.Item
                key={i}
                onClick={() => handleClickPage(currentPage + i)}
                active={currentPage + i === currentPage}
              >
                {currentPage + i}
              </Pagination.Item>
            )))}

      {(currentPage < 7 || pageCount <= 10) &&
        Array.from(getArrayFromLength(pageCount >= 10 ? 10 : pageCount)).map(
          (i) => (
            <Pagination.Item
              key={i}
              onClick={() => handleClickPage(i)}
              active={i === currentPage}
            >
              {i}
            </Pagination.Item>
          )
        )}
      <Pagination.Next
        disabled={currentPage === pageCount}
        onClick={() => handleClickPage(currentPage + 1)}
      />
    </Pagination>
  );
};

export default Paginator;
