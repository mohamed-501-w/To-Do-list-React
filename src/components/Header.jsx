export default function Header({isDarkMode,darkMode}){
    
    return <header className="flex dark:text-blue-100 justify-center items-center">
        <h1 className=" text-4xl text-slate-800 dark:text-[rgb(197,30,58)] antialiased font-black text-center my-20 mr-10 "><span className="shadow-sm shadow-gray-500/20">📑</span> To Do List</h1>

        <button 
        onClick={darkMode}
        className=" dark:bg-blue-100 bg-slate-800 rounded-full size-6 relative">
            <span 
            className="absolute -inset-3 rounded-full size-12 border-4  border-[rgb(197,30,58)] shadow-md shadow-gray-500/50">
            </span>
            <h2
            className="ml-11 text-xl font-bold dark:text-blue-100 text-slate-900">   
                {isDarkMode ? 'Dark' : 'Light'}
            </h2>
        </button>
        
    </header>
}