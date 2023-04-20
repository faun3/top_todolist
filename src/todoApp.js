import { createProject } from "./projects";
import { createTodo } from "./todos";

const appFactory = () => {
  let projArr = [];

  //default project when the app opens is called "Tasks"
  projArr[0] = {
    title: "Tasks",
    todoArr: [],
  };

  return { projArr };
};

const app = appFactory();

app.projArr[1] = createProject("Test proj 1");
app.projArr[1] = createTodo(
  "Make food",
  "I gotta have a good meal",
  new Date(),
  0
);

console.table(app.projArr);
console.table(app.projArr[1].todoArr);

//TODO creation
//
//One big plus button that adds a todo to the list, prompting the user for all
//  the data necessary; project choice is a dropdown with the first option
//      being "New Project"
