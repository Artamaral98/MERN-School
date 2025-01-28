import { useRef, useEffect, useState } from 'react';
import firstfirstLetterToUpperCase from "../../utils/firstLetterToUpperCase"
import firstLetterToUpperCase from '../../utils/firstLetterToUpperCase';
import useFetchStudents from "../../hooks/useFetchStudents";
import toast from 'react-hot-toast';
import api from '../../api/api';



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
      
      if(error.response.data.message) {
        toast.error(error.response.data.message)
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
      <div className="w-[300px] bg-[#DD4B25] text-white ">
        <div className="p-7" >
          <a href='/home' className="text-2xl font-bold">CODETECH</a>
          <p className="text-sm">Desenvolvimento de sistemas</p>
        </div>
        <div className="bg-[#C64422] p-4">
          <span>Alunos</span>
        </div>
      </div>

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold">Alunos</h2>
          <a href="/home" className="px-4 py-2 bg-[#DD4B25] text-white rounded hover:bg-[#C64422] transition-colors">
            Voltar
          </a>
        </div>

        <div className="max-w-3xl p-6 bg-white rounded-lg shadow-md">
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
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DD4B25] focus:border-transparent"
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
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DD4B25] focus:border-transparent"
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
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DD4B25] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-2 bg-[#DD4B25] text-white rounded hover:bg-[#C64422] transition-colors"
            >
              Salvar
            </button>
          </form>
        </div>

        <footer className="fixed bottom-4 left-[0px] right-9 px-6">
          <p className="text-sm text-white">
            Desenvolvido por <span className="text-white font-bold">Arthur Amaral</span> Codetech
          </p>
        </footer>
      </main>
    </div>
  )
}

  
export default StudentCreate