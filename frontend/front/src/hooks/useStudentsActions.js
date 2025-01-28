import { useState } from "react";
import firstLetterToUpperCase from "../utils/firstLetterToUpperCase";
import api from "../api/api";
import toast from "react-hot-toast"

const useStudentActions = (students, setStudents) => {
    const [newStudent, setNewStudent] = useState({ name: '', age: '', classe: '' });
    const [editStudents, setEditStudents] = useState({id: null, name: '', age: '', classe: '' });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);



    const handleAddStudent = async () => {
      
      try { 
          const capitalizeFirstLetter = firstLetterToUpperCase(newStudent.name)
          
          const response = await api.post('create-student', {
            name: capitalizeFirstLetter,
            age: newStudent.age,
            classe: newStudent.classe,
          });
  
          setStudents([...students, response.data.student]) 
          setNewStudent({ name: '', deadline: '', cost: '' })
          toast.success(response.data.message)
        
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

    const handleEdit = studentId => {
        const studentToEdit = students.find(student => student._id === studentId)

        if (studentToEdit) {
            setEditStudents({
                id: studentToEdit._id,
                name: studentToEdit.name,
                age: studentToEdit.age,
                classe: studentToEdit.classe
            })
            setIsEditModalOpen(true)
        } 
    }

    const handleSaveEdit = () => {

        api.put(`update-student/${editStudents.id}`, {
          name: editStudents.name,
          age: editStudents.age,
          classe: editStudents.classe,
        })
        .then((response) => {
          console.log(response.data.newStudent)
          setStudents(students.map((student) => 
            student._id === editStudents.id ? response.data.newStudent : student 
          ));
          
          setIsEditModalOpen(false);
          toast.success(response.data.message);
          
        })
        .catch((error) => {
          console.error('Erro ao editar dados do aluno:', error);
          toast.error(error.response.data.message);
        })
      }

      const openDeleteModal = studentId => {
        setStudentToDelete(studentId)
        setIsDeleteModalOpen(true)
    }

    const handleDelete = () => {
        api.delete(`delete-student/${studentToDelete}`)
        .then(() => {
            setStudents(students.filter((student) => student._id !== studentToDelete))
            setIsDeleteModalOpen(false);
            setStudentToDelete(null);
            toast.success("Dados deletados");
        })
        .catch((error) => {
            console.error('Erro ao excluir dados do aluno:', error);
            toast.error(error.response.data.message);
          });
    }

    return {
        handleAddStudent,
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
      }
}

export default useStudentActions