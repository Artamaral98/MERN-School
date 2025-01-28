import { useState } from 'react';

const usePagination = (students, studentsPerPage = 12) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(students.length / studentsPerPage);
    const displayedStudents = students.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage);

  return {
        currentPage,
        totalPages,
        displayedStudents,
        setCurrentPage,
  };
};

export default usePagination;