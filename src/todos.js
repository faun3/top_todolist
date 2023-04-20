const createTodo = (title, description, dueDate, priority) => {
  let done = false;

  const setDone = () => {
    if (done === false) {
      done = true;
      console.log("done was false");
    } else {
      done = false;
      console.log("done was true");
    }
  };

  return { title, description, dueDate, priority, setDone };
};

export { createTodo };
//Todo properties:
//title, desc, dueDate, prio,

//Todo methods
//creation,
