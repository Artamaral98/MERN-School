import firstLetterToUpperCase from '../../utils/firstLetterToUpperCase';
import { useEffect, useRef } from 'react';


const EditModal = ({isEditModalOpen, editStudentName, setEditStudentName, setIsEditModalOpen, editStudentAge,
     setEditStudentAge, editStudentClasse, setEditStudentClasse, handleSaveEdit}) => {

     const nameInputRef = useRef(null)

     useEffect(() => {
       if (nameInputRef && isEditModalOpen) {
          nameInputRef.current.focus()
        }
      }, [isEditModalOpen])

        return (
            <div>
                {isEditModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
              <div className="bg-white border p-6 rounded shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Editar Aluno</h2>
                   
                <input  
                  type="text"
                  placeholder="Nome do Aluno"
                  ref={nameInputRef}
                  value={editStudentName}
                  onChange={(e) => setEditStudentName(firstLetterToUpperCase(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                     
                <input
                  type="number"
                  value={editStudentAge}
                  onChange={(e) => setEditStudentAge(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />

                <input
                  type="text"
                  value={editStudentClasse}
                  onChange={(e) => setEditStudentClasse(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                   
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                  > 
                    Cancelar
                  </button>
                     
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}
            </div>
        )
     }

export default EditModal