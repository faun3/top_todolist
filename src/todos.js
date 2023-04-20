const createTodo = (title, description, dueDate, priority) => {
  let done = false;
  let project = "";

  const setDone = () => {
    if (done === false) {
      done = true;
    }
    return;
  };

  const setPrio = (newPrio) => {
    priority = newPrio;
  };

  return { title, description, dueDate, priority, setDone, setPrio, project };
};

export { createTodo };
//Todo properties:
//title, desc, dueDate, prio,

//Todo methods
//creation,
