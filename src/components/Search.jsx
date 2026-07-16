export default function Search({searchTask, activeSearch}){

    function clearSearch(){
        const formData = new FormData()
        formData.set("search", "")
        searchTask(formData)
    }

    return (
        <form 
        className="flex flex-col"
        action={searchTask}>
            <div className="relative">
                <input 
                type="text"
                placeholder="Search tasks"
                defaultValue={activeSearch}
                key={activeSearch}
                className="shadow shadow-gray-500/50 w-full px-6 py-5 text-neutral-900 dark:text-neutral-300 placeholder:text-neutral-400 font-black tracking-widest text-lg rounded-b-3xl rounded-t-md border-2 border-[rgb(197,30,58)] outline-0 focus:shadow-md"
                name="search"
                />
                {activeSearch && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-[rgb(197,30,58)] opacity-70 hover:opacity-100"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
            <button 
            type="submit" 
            className="hover:scale-105 hover:bg-red-200/25 transition-all duration-500 ease-in-out mt-5 sm:w-50 w-full self-center tracking-widest py-3  text-[rgb(197,30,58)] font-black text-xl rounded-xl shadow-md border-2 shadow-gray-900/70">Search</button>
        </form>
    )
}