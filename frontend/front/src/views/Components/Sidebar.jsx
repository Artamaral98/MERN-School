const Sidebar = () => {
    return(
        <div className="w-[300px] bg-[#DD4B25] text-white ">
            <div className="p-12" >
                <a href='/home' className="text-4xl font-bold">CODETECH</a>
                <p className="text-xs px-2">Desenvolvimento de sistemas</p>
            </div>
            <div className="bg-[#F76A2C] p-4">
                <span className='px-6'>Alunos</span>
            </div>
        </div>
    )

}

export default Sidebar