import { useState, useRef ,useEffect} from 'react'
import clsx from 'clsx'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import Search from './components/Search'
import Tasks from './components/Tasks'
import {tasksData} from '../data/data'





function App() {
  const [tasks, setTasks] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('tasks')) ?? []
  } catch {
    return []
  }
  })

  // const [tasks, setTasks] = useState(tasksData)
  const [activeSearch, setActiveSearch] = useState("") 
  const [isDarkMode, setIsDarkMode] = useState(false);

  let taskAddedIdRef = useRef(null)
  
  const date = new Date();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function darkMode(){
    setIsDarkMode(prev => !prev)
  }

  function addTask(formData){

    const taskObj = {
      id: crypto.randomUUID(),
      task:formData.get("addedTask").trim(),
      isCompleted:false,
      isBeingEdited:false,
      timeAdded:date.toLocaleString('en-GB').slice(0,10),
      dueTime:formData.get("date").split('-').reverse().join('/')
    }

    taskAddedIdRef.current = taskObj.id

    setTasks(prevData => formData.get('addedTask').trim().length === 0 
    ? prevData : 

    [...prevData, taskObj ])
  }

  function editTask(taskId, ref){
    console.log(ref.current.value)

    if(ref.current.value.trim() === ""){
      return deleteTask(taskId)
    } 

    setTasks(prevData => prevData.map(task => (
        
        task.id ===taskId ? 
        {
          ...task,
          isBeingEdited: !task.isBeingEdited
        }  :
        {
          ...task,
          isBeingEdited: false
        }
      ) 
    ))
    ref.current.focus()
  }

  function editing(event,taskId){

        setTasks(prevData => (
          prevData.map( data => (
            data.id === taskId ? {
              ...data,
              task: event.target.value
            } :
            data
          ))
        ))
  }

  function completeTask(taskId){
    setTasks(prevData => prevData.map(task => (
        task.id ===taskId ? 
        {
          ...task,
          isCompleted: !task.isCompleted
        }  :
        task
      ) 
    ))
  }

  function deleteTask(taskId){
      setTasks(prevData => prevData.filter(task => task.id !== taskId))
  }
  
  function searchTask(formData){
    setActiveSearch(formData.get("search"))
  }
  

  return (
    <section className='lg:max-w-5xl flex flex-col px-4 pb-6 mx-auto min-h-[95vh] box-content'>
      <Header 
      isDarkMode={isDarkMode}
      darkMode={darkMode}/>
      <Search 
      searchTask={searchTask}/>
      <TaskInput 
      addTask={addTask}
      date={date}
      />
      <Tasks 
      tasks={tasks}
      date={date}
      activeSearch={activeSearch}
      taskAddedId={taskAddedIdRef.current}
      deleteTask={deleteTask}
      completeTask={completeTask}
      editTask={editTask}
      editing={editing}
      />

    </section>
  )
}

export default App
