import { useRef, useEffect, useState } from 'react';
import firstfirstLetterToUpperCase from "../../utils/firstLetterToUpperCase"
import firstLetterToUpperCase from '../../utils/firstLetterToUpperCase';
import useFetchStudents from "../../hooks/useFetchStudents";
import toast from 'react-hot-toast';
import api from '../../api/api';
import Sidebar from '../Components/Sidebar';



const StudentCreate = () => {
  const { students, setStudents } = useFetchStudents()
  const [newStudentName, setNewStudentName] = useState('')
  const [newStudentAge, setNewStudentAge] = useState('')
  const [newStudentClasse, setNewStudentClasse] = useState('')

  const handleAddStudent = async () => {
    try { 
        
        const capitalizeFirstLetter = firstLetterToUpperCase(newStudentName)
        
        const response = await api.post('create-student', {
          name: capitalizeFirstLetter,
          age: newStudentAge,
          classe: newStudentClasse,
        });

        console.log(response)

        setStudents([...students, response.data.student])
        setNewStudentName("")
        setNewStudentAge("")
        setNewStudentClasse("")
        toast.success(response.data.message)
      
    } catch (error) {

      console.log(error)

      if(error.response.data.message) {
        toast.error(error.response.data.message)
      }

      if(error.response.data.errors.age) {
        toast.error(error.response.data.errors.age.message)
      }

      if (error.response.data.errors.classe) {
        toast.error(error.response.data.errors.classe.message)
      }

      if(error.response.data.errors.name) {
        toast.error(error.response.data.errors.name.message)
    }
  }
}

  const nameInputRef = useRef(null)

  useEffect(() => {
      if (nameInputRef) {
          nameInputRef.current.focus()
      }
  }, [])

  const handleAddNameInputFocus = () => {
      handleAddStudent()
      if (nameInputRef) {
          nameInputRef.current.focus()
      }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-14">
        <div className="flex justify-between items-center mb-15">
          <h2 className="text-xl font-bold px-7">Alunos</h2>
          <a href="/home" className="px-15 py-3 bg-[#DD4B25] text-white rounded-md hover:bg-[#C64422] transition-colors">
            Voltar
          </a>
        </div>

        <div className="max-w-5xl h-180 p-6 bg-white rounded-lg shadow-md">
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault()
            handleAddNameInputFocus()
          }}>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <label htmlFor="nome" className="block text-sm mb-2">
                  Nome completo
                </label>
                <input
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(firstfirstLetterToUpperCase(e.target.value))}
                  type="text"
                  ref={nameInputRef}
                  id="nome"
                  className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#DD4B25] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="idade" className="block text-sm mb-2">
                  Idade
                </label>
                <input
                  value={newStudentAge}
                  onChange={(e) => setNewStudentAge(e.target.value)}
                  type="number"
                  id="idade"
                  className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#DD4B25] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="turma" className="block text-sm mb-2">
                Turma
              </label>
              <input
                  value={newStudentClasse}
                  onChange={(e) => setNewStudentClasse(e.target.value)}
                  type="text"
                  id="turma"
                  className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-[#DD4B25] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="px-14 py-3 bg-[#DD4B25] text-white rounded-md hover:bg-[#C64422] transition-colors"
            >
              Salvar
            </button>
          </form>
        </div>

        <footer className="fixed bottom-4 left-[0px] right-9 px-4 text-white">
          <p className="text-xs">
            Desenvolvido por <span className="text-white font-bold text-xs">Arthur Amaral,</span> Codetech
          </p>
        </footer>
      </main>
    </div>
  )
}

  
export default StudentCreate