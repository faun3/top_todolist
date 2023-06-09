import { createProject } from "./projects";
import { createTodo } from "./todos";
import "./style.css";

const appFactory = (projArr) => {
  //default project when the app opens is called "Tasks"
  projArr.push(createProject("Tasks"));

  const addProject = (name) => {
    if (name === undefined) {
      name = "Oops!";
    }
    projArr.push(createProject(name));
  };

  const removeProject = (pos) => {
    if (pos === 0) {
      alert("Cannot remove default project!");
    } else {
      projArr.splice(pos, 1);
    }
  };

  const addTask = (projectName) => {
    let todo = createTodo("New Todo", "Cool thing to do", new Date(), 1);
    if (projectName === undefined) {
      projectName = "Tasks";
    }

    let found = false;

    for (let i = 0; i < projArr.length; i++) {
      if (projArr[i].title === projectName) {
        found = true;
        projArr[i].todoArr.push(todo);
        break;
      }
    }
    if (found === false) {
      projArr.push(createProject(projectName));
      projArr[projArr.length - 1].todoArr.push(todo);
    }
  };

  return { projArr, addProject, addTask, removeProject };
};

export { appFactory };
