import React from "react";

import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";



const Pagination = ({ pagination, onPageChange }) => {
  const currentPage = pagination?.currentPage;
  const totalPages = pagination?.totalPages;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else {
      if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
  }

  return (
    <div className="flex items-center text-[14px] justify-center gap-2 mt-8">

      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-1.5 py-1.5 rounded-md bg-[#EBEBEB] disabled:bg-[#e4ecf7] disabled:text-white"
      >
        <MdArrowBackIosNew className="text-[20px]" />
      </button>

      {/* Page Numbers */}
      {
        pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2"><span className="font-semibold text-[18px]">...</span></span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-[13px] py-1.5 rounded-md font-semibold duration-75 hover:bg-[#104278] hover:text-white
                ${currentPage === page 
                  ? 'bg-[#1F5DA0] text-white' 
                  : 'bg-[#EBEBEB] text-gray-500'
                }`}
            >
              {page}
            </button>
          )
        )
      }

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-1.5 py-1.5 rounded-md bg-[#EBEBEB] disabled:bg-[#e4ecf7] disabled:text-white"
      >
        <MdArrowForwardIos className="text-[20px]" />
      </button>

    </div>
  );
};

export default Pagination;