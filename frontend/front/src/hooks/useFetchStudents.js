import { useState, useEffect } from 'react';
import api from '../api/api';
import Cookies from 'js-cookie';


const useFetchStudents = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        api.get('get-all-students')
        .then((response) => {
            setStudents(response.data.students)
        })
        .catch((error) => {
            console.error('Erro ao buscar tarefas:', error)
        })
    
    }, [])

    return {students, setStudents}
}

export default useFetchStudents