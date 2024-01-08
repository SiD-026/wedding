import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";
import { NavLink } from "react-router-dom";

const Pagination = (props) => {
  const {
    nPages,
    currentPage,
    setCurrentPage,
    indexOfFirstRecord,
    indexOfLastRecord,
    page,
    services,
  } = props;

  const pageNumbers = nPages > 0 ? [...Array(nPages + 1).keys()].slice(1) : 0;

  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-100 px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-evenly">
          <div>
            <p className="text-sm text-gray-900">
              Showing{" "}
              <span className="font-medium">{indexOfFirstRecord + 1}</span> to{" "}
              <span className="font-medium">{indexOfLastRecord}</span> of{" "}
              <span className="font-medium">{page.length}</span> results
            </p>
          </div>
          <div>
            <div className="btn-group  btn-group-scrollable">
              <input
                onClick={prevPage}
                type="radio"
                name="options"
                data-content="<<"
                className="btn"
              />
              {pageNumbers.length > 0
                ? pageNumbers.map((pgNumber) => {
                    return (
                      <input
                        key={pgNumber}
                        onClick={() => setCurrentPage(pgNumber)}
                        type="radio"
                        name="options"
                        data-content={pgNumber}
                        className="btn"
                      />
                    );
                  })
                : ""}

              <input
                onClick={nextPage}
                type="radio"
                name="options"
                data-content=">>"
                className="btn"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
