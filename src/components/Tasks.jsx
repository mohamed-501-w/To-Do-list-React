import TaskCard from './TaskCard'
import clsx from 'clsx'

export default function Tasks({tasks, date, taskAddedId ,activeSearch, deleteTask, completeTask ,editTask, editing}){

    const taskELements =  tasks.map((task, index) => (
        <TaskCard 
        key={task.id}
        task={task}
        date={date}
        isLastAdded={taskAddedId === task.id}
        activeSearch={activeSearch}
        editTask={editTask}
        completeTask={completeTask}
        deleteTask={deleteTask}
        editing={editing}
        />
    ))

    return (
        <section 
        className={clsx(" flex-1 shadow-md  shadow-gray-500/50 p-4 sm:p-10 text-neutral-900 placeholder:text-neutral-400 font-black tracking-widest border-2 border-[rgb(197,30,58)] rounded-t-xl rounded-b-md text-xl capitalize pb-20", taskELements.length === 0 && "flex items-center justify-center")}>
            {taskELements.length !== 0 ?taskELements:
            <div className='text-4xl/15 animate-fadeIn text-black/50 dark:text-blue-100/80 border-b-4 border-red-700/50 shadow shadow-gray-400/90 p-10 rounded-2xl'>
                <h2>Seems empty here</h2>
                <h3>Add tasks to Start!</h3>
            </div>
            }
        </section>
    )
}