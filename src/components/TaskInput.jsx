export default function TaskInput({addTask ,date}){
    const tomorrow = new Date(date)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return(
        <form action={addTask} className=" my-10">
            <div className="flex flex-col-reverse item sm:flex-row-reverse gap-5">

                <button 
                    type="submit" 
                    className=" peer px-8 tracking-widest py-2  bg-[rgb(197,30,58)] text-neutral-300  font-black text-lg rounded-xl shadow-md shadow-gray-900/70"
                    >ADD
                </button>

                <input 
                required
                className="peer-hover:flex-1 focus:flex-1 hover:flex-1 transition-all duration-750 ease-in-out shadow-md shadow-gray-500/50 p-3 text-neutral-900 dark:text-neutral-300 placeholder:text-[rgb(197,30,58)] font-black tracking-widest text-lg border-2 border-[rgb(197,30,58)]  rounded-xl " 
                type="text"
                name="addedTask"
                placeholder="Add a Task"
                maxLength="80"/>
                
                <label className="flex flex-col sm:items-end sm:mr-auto justify-center
                shadow-md shadow-gray-500/50 p-3  text-[rgb(197,30,58)] font-black tracking-widest text-base border-2 border-[rgb(197,30,58)] rounded-xl outline-0 ">
                    <span className="mr-9">Select date</span>
                    <input
                    type="date" 
                    name="date" 
                    min={(tomorrow).toLocaleDateString('en-CA')}
                    defaultValue={(tomorrow).toLocaleDateString('en-CA')}
                    required
                    className="outline-0 inline-block cursor-pointer"/>
                </label>
            </div>
            
        </form>)
    
}