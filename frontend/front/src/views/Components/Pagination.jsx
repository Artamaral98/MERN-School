const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center gap-4 px-6 py-4 max-w-5xl mx-auto">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 bg-gray-200 rounded-md shadow ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
        }`}
      >
        Voltar
      </button>
      <span className="font-semibold text-gray-700">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 bg-gray-200 rounded-md shadow ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-300"
        }`}
      >
        Avançar
      </button>
    </div>
  );
};

export default Pagination;
