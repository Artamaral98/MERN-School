import { useNavigate } from "react-router-dom";
import useFetchStudents from "../../hooks/useFetchStudents";
import useStudentActions from "../../hooks/useStudentsActions";
import usePagination from "../../hooks/usePagination";
import Pagination from "../Components/Pagination";
import EditModal from "../Components/EditModal";
import DeleteModal from "../Components/DeleteModal";
import Header from "../Components/Header";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";


function Home() {
  const navigate = useNavigate();
  const { students, setStudents } = useFetchStudents()
  const {
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    editStudents,
    setEditStudents,
    handleEdit,
    handleSaveEdit,
    openDeleteModal,
    handleDelete,
  } = useStudentActions(students, setStudents);

  const { currentPage, totalPages, displayedStudents, setCurrentPage } =
    usePagination(students);

    const {logout} = useAuth()

    const handleLogout = () => {
      logout()
      navigate("login")
    }

  return (
    <div className="min-h-screen">
      <div className="bg-orange-600 text-white py-5 px-8 flex items-center justify-between">
        <h1 className="text-4xl font-extrabold">CODETECH</h1>
        <button onClick={logout} className="px-10 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
            Logout
          </button>
      </div>

      <div className="flex items-center justify-between shadow-md px-16 py-6">
        <h2 className="text-2xl font-bold text-black">Alunos</h2>
        <button
          onClick={() => navigate("/novo-aluno")}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600"
        >
          Criar Registro
        </button>
      </div>

      <div className="px-25 flex justify-center">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <Header />
            </thead>
            <tbody>
              {displayedStudents.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.age}</td>
                  <td className="py-3 px-4">{student.classe}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleEdit(student._id)}>
                      <FaEdit />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => openDeleteModal(student._id)}>
                      <AiFillDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <EditModal
        isEditModalOpen={isEditModalOpen}
        editStudentName={editStudents.name}
        setEditStudentName={(name) =>
          setEditStudents((prev) => ({ ...prev, name }))
        }
        editStudentAge={editStudents.age}
        setEditStudentAge={(age) =>
          setEditStudents((prev) => ({ ...prev, age }))
        }
        editStudentClasse={editStudents.classe}
        setEditStudentClasse={(classe) =>
          setEditStudents((prev) => ({ ...prev, classe }))
        }
        setIsEditModalOpen={setIsEditModalOpen}
        handleSaveEdit={handleSaveEdit}
      />

      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
