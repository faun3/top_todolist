import { createProject } from "./projects";
import { createTodo } from "./todos";
import "./style.css";

const appFactory = () => {
  let projArr = [];

  //default project when the app opens is called "Tasks"
  projArr.push(createProject("Tasks"));

  const addProject = () => {
    let name = "New Name1";
    projArr.push(createProject(name));
  };

  const addTask = (projectName) => {
    let todo = createTodo("New Todo", "Cool thing to do", new Date(), 1);
    if (projectName === "") {
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

  return { projArr, addProject, addTask };
};

const app = appFactory();

app.projArr.push(createProject("Test proj 1"));
app.projArr[1].todoArr.push(
  createTodo("Make food", "I gotta have a good meal", new Date(), 2)
);
app.projArr[1].todoArr.push(
  createTodo("I will be deleted", "Goodbye!", new Date(), 0)
);

app.addTask("");
app.addTask("Better Cooler Project");

console.table(app.projArr);

//TODO creation
//
//One big plus button that adds a todo to the list, prompting the user for all
//  the data necessary; project choice is a dropdown with the first option
//      being "New Project"