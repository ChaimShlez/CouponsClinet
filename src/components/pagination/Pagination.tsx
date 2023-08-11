import React, { useState } from 'react'
import "./Pagination.css";

interface IPages{
    currentPage : number ;
    totalPages:number;
    onPageChange(pageNumber:number): void;
    };

function Pagination(props : IPages) {
   

    const handlePageClick = (page: number | 'prev' | 'next') => {
      if (page === 'prev') {
        props.onPageChange(props.currentPage - 1);
      } else if (page === 'next') {
        props.onPageChange(props.currentPage + 1);
      } else {
        props.onPageChange(page);
      }
    };
  
   
    const generatePageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5; // Maximum visible page numbers
  
      // Logic to determine the range of visible page numbers
      let startPage = Math.max(props.currentPage - Math.floor(maxVisiblePages / 2), 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, props.totalPages);
  
      // Adjust the startPage and endPage if the number of visible pages is less than the maximum
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
  
      for (let page = startPage; page <= endPage; page++) {
        pages.push(
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={props.currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        );
      }
  
      return pages;
    };
  
    return (
      <div className="pagination">
        <button onClick={() => handlePageClick('prev')} disabled={props.currentPage === 1}>
          Prev
        </button>
        {generatePageNumbers()}
        <button onClick={() => handlePageClick('next')} disabled={props.currentPage === props.totalPages}>
          Next
        </button>
      </div>
    );
  }


export default Pagination