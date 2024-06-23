import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationButtons = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return pages.map((page) => (
      <button
        key={page}
        className={`px-3 py-1 rounded-lg ${page === currentPage ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => onPageChange(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <nav className="mt-4" aria-label="Pagination">
      <ul className="flex justify-center space-x-2">
        {renderPaginationButtons()}
      </ul>
    </nav>
  );
};

export default Pagination;
