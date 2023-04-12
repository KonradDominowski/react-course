import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

import useFetch from './components/hooks/use-fetch';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = tasksObject => {
    const loadedTasks = []

    for (const taskKey in tasksObject) {
      loadedTasks.push({ id: taskKey, text: tasksObject[taskKey].text });
    }

    setTasks(loadedTasks)
  }

  const url = 'https://react-course-51208-default-rtdb.firebaseio.com/tasks.json'

  // Przypisuje wartości do zmiennych, ale jeszcze nie robie fetcha, dopiero kiedy wywołam fetchTasksa puszczę request do zewnętrznego api
  const { isLoading, error, sendRequest: fetchTasks } = useFetch({ url: url }, transformTasks)

  useEffect(() => {
    fetchTasks()
  }, [])



  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={ taskAddHandler } />
      <Tasks
        items={ tasks }
        loading={ isLoading }
        error={ error }
        onFetch={ fetchTasks }
      />
    </React.Fragment>
  );
}

export default App;
