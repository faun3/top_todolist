const createProject = (title) => {
  let todoArr = [];

  const sortTodos = () => {
    todoArr.sort((firstObj, secondObj) => {
      if (firstObj.priority < secondObj.priority) {
        return -1;
      } else return 1;
    });
  };

  const deleteTodo = (todoName) => {
    for (let i = 0; i < todoArr.length; i++) {
      if (todoArr[i].title === todoName) {
        todoArr.splice(i, 1);
        break;
      }
    }
  };

  return { title, todoArr, deleteTodo, sortTodos };
};

export { createProject };

//make projects objects with a title and an array that contains all the todos
//relevant to that specific project
