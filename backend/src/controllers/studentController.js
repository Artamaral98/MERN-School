import { Student } from "../models/studentModels.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

class StudentController {
    getAllStudents = catchAsyncErrors(async(req, res) => {
        try{
            const allStudents = await Student.find();
            return res.status(200).json({students: allStudents})

        } catch(err){
            return res.status(400).json({errors: err.errors})
        }
    })

    createNewStudent = catchAsyncErrors(async(req, res) => {
        try {
            const {name, age, classe} = req.body

            if(!name, !age, !classe) {
                return res.status(400).json({message: "Preencha todos os campos"})
            }

            const student = await Student.create({name, age, classe})
            return res.status(201).json({message: "Usuário registrado", student})

        } catch (error) {
            res.status(500).json({errors: error.errors})
        }
    })

    updateStudents = catchAsyncErrors(async(req, res) => {
        try{

            const {id} = req.params;
            const {name, age, classe} = req.body
            if(!name, !age, !classe) {
                return res.status(400).json({message: "Preencha todos os campos"})
            }
            const updatedData = {name, age, classe}

            const student = await Student.findById(id);
            if (!student) {
                return res.status(400).json({message: "Aluno não encontrado"})
            }

            await Student.findByIdAndUpdate(id,updatedData);

            const newStudent = await Student.findById(id)          

            return res.status(200).json({
                message: "Dados alterados", newStudent})


        } catch(err){
            return res.status(400).json({errors: err.errors})
        }
    })


    deleteStudent = catchAsyncErrors(async(req, res) => {
        try {
            const { id } = req.params
        
            const student = await Student.findById(id)
        
            if (!student) {
                return res.status(400).json({message: "Aluno não encontrado"})
            }
        
            await Student.findByIdAndDelete(id);
            return res.status(200).json({ message: "Registro deletado com sucesso"})

        } catch (err) {
        return res.status(400).json({ errors: err.errors });
        }
    }
)

}

export default new StudentController();