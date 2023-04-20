import { createProject } from "./projects";
import { createTodo } from "./todos";
import "./style.css";

const appFactory = () => {
  let projArr = [];

  //default project when the app opens is called "Tasks"
  return { projArr };
};

const app = appFactory();

app.projArr.push(createProject("Default Project"));

app.projArr.push(createProject("Test proj 1"));
app.projArr[1].todoArr.push(
  createTodo("Make food", "I gotta have a good meal", new Date(), 2)
);
app.projArr[1].todoArr.push(
  createTodo("I will be deleted", "Goodbye!", new Date(), 0)
);

app.projArr[1].sortTodos();

console.table(app.projArr);
console.table(app.projArr[1].todoArr);

//TODO creation
//
//One big plus button that adds a todo to the list, prompting the user for all
//  the data necessary; project choice is a dropdown with the first option
//      being "New Project"
