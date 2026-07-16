import {clsx} from 'clsx';
import {useRef} from "react"


export default function TaskCard({task, date, isLastAdded, activeSearch, deleteTask, completeTask, editTask, editing}){
    let inputValue =task.task
    const ref = useRef(null)
    const isHighlighted = activeSearch && task.task.toUpperCase().includes(activeSearch.toUpperCase())
    const dueTimeFormat = task.dueTime.split('/').reverse()
    const today = date.toLocaleString('en-GB').slice(0,10).split('/').reverse()
    
    const isItDue = today.every((time ,index)=> {
        if(index < 2) return time >= dueTimeFormat[index]
        else return time > dueTimeFormat[index]
    })

    return (

        <div className={clsx("relative flex sm:flex-row flex-col  items-center border-b-3 mb-4 border-[rgb(197,30,58)] dark:text-blue-100 pb-8 sm:p-3", isLastAdded && "animate-fadeIn")}>
            
            
            <textarea
            ref={ref}
            type="text"  
            onChange={(event) => editing(event, task.id) } 
            value={inputValue}
            readOnly={!task.isBeingEdited}
            maxLength={100}
            className={clsx("resize-none w-full text-ellipsis field-sizing-content text-wrap flex-1 text-xl sm:mr-auto  overflow-x-auto  mt-auto outline-0 py-4 px-2 mb-4 font-bold caret-[rgb(197,30,58)] rounded-xl", task.isCompleted && "line-through opacity-50 decoration-2", task.isBeingEdited && "border-2 border-[rgb(197,30,58)] bg-red-200 rounded-xl shadow-md shadow-gray-500/50", isHighlighted && "bg-red-400", isItDue && "line-through decoration-3 opacity-80 decoration-red-600")}
            />

        <div 
        className='flex flex-row-reverse sm:flex-row justify-end items-center w-full sm:w-auto'>
                    {task.isBeingEdited && <button 
                        onClick={()=> editTask(task.id, ref) }
                        className="flex-1 hover:scale-110 mb-6  transition-all duration-500 ease-in-out mx-5 px-5 tracking-widest py-2 bg-[rgb(30,197,58)] text-neutral-300  font-black text-lg rounded-xl shadow-md shadow-gray-900/70"
                        >Save
                </button>}
                
                
                <button
                className="peer flex flex-col p-2 ml-4 mb-4">
                    <span className="bg-gray-800 dark:bg-[rgb(197,30,58)] size-1 rounded-full mb-1"></span>
                    <span className="bg-gray-800 dark:bg-[rgb(197,30,58)] size-1 rounded-full mb-1"></span>
                    <span className="bg-gray-800 dark:bg-[rgb(197,30,58)] size-1 rounded-full mb-1"></span>
                </button>
                <div 
                className="peer-focus:flex animate-fadeIn [animation-duration:0.2s] hover:flex hidden fixed sm:w-auto w-screen bottom-0 right-0 sm:absolute  sm:right-8 sm:top-8  z-10 flex-col  tracking-widest  text-neutral-300 sm:rounded-tr-sm font-black text-lg rounded-2xl shadow-md shadow-gray-900/70 visible ">
                    
                    {!isItDue && <>
                        <button 
                            className="px-10 py-3 hover:scale-105 transition-all ease-in-out duration-300 rounded-t-2xl sm:rounded-tl-2xl bg-blue-500"
                            onClick={()=> {editTask(task.id, ref)}}
                            >
                                {task.isBeingEdited ? "Save" :"Edit"}
                            </button>

                            <button 
                            className="px-10 border-y py-3 hover:scale-105 transition-all ease-in-out duration-300 bg-blue-500"
                            onClick={()=>{completeTask(task.id)}}>
                                Complete
                        </button>
                    </>}
                    
                    <button 
                    className={clsx("px-10 py-3 hover:scale-105 transition-all ease-in-out duration-300 bg-[rgb(197,30,58)] sm:rounded-b-2xl",isItDue && 'sm:rounded-2xl')}
                    onClick={()=>{deleteTask(task.id)}}>
                        Delete
                    </button>
                </div>
            </div>
            <p 
            className='absolute bottom-0 text-sm font-normal opacity-60 flex'>
                <span className='mr-10'>Added: {task.timeAdded}</span>
                <span>Due: {task.dueTime}</span>
            </p>
        </div>

    )
}