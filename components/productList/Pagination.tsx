interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page navigation
    onPageChange(page);
  };
  console.log(`visiblePages.length:${visiblePages.length}, ${visiblePages}`);

  return (
    <nav aria-label="Pagination" className="flex justify-center my-8 ">
      <ul className="flex gap-2 items-center">
        {/* Previous Button */}

        {visiblePages.length > 1 && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className="px-4 py-2 rounded-lg bg-light-gray text-primary disabled:opacity-50 hover:bg-accent-hover transition-colors"
            >
              Previous
            </button>
          </li>
        )}

        {/* Page Numbers */}
        {visiblePages.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-4 py-2" aria-hidden="true">
                ...
              </span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-accent text-white"
                    : "bg-light-gray text-primary hover:bg-accent-hover"
                } transition-colors`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        {visiblePages.length > 1 && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className="px-4 py-2 rounded-lg bg-light-gray text-primary disabled:opacity-50 hover:bg-accent-hover transition-colors"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const visiblePages = [];
  if (currentPage > 4) {
    visiblePages.push(1, "...");
  } else {
    visiblePages.push(1, 2, 3, 4);
  }

  if (currentPage > 4 && currentPage < totalPages - 3) {
    visiblePages.push(currentPage - 1, currentPage, currentPage + 1, "...");
  } else if (currentPage >= totalPages - 3) {
    visiblePages.push(
      ...Array.from({ length: 4 }, (_, i) => totalPages - 3 + i)
    );
  }

  visiblePages.push(totalPages);
  return visiblePages;
};

export default Pagination;
