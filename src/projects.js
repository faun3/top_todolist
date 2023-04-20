const createProject = (title) => {
  let todoArr = [];

  const sortTodos = (title) => {
    for (let i = 0; i < projArr.length; i++) {
      if (projArr[i].title === title) {
        projIndex = i;
        break;
      }
    }

    projArr[projIndex].sort((firstObj, secondObj) => {
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

  return { title, todoArr, deleteTodo };
};

export { createProject };

//make projects objects with a title and an array that contains all the todos
//relevant to that specific project
