import { format } from "date-fns";
import { createProject } from "./projects";
import { createTodo } from "./todos";
import { parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

const appViewFactory = (projArr) => {
  const rootNode = document.querySelector("#app");
  //navbar thing that has a notch in the middle with the name of the app
  //    think new macbooks

  //our append point is the appBody where we render all content except
  //  for fixed elements like the top bar (this is in preaparation for
  //  future styling of the top notch element)
  let appBody = document.createElement("div");
  appBody.setAttribute("class", "appBody");

  const drawIndependents = () => {
    const topBarContainer = document.createElement("div");
    topBarContainer.setAttribute("class", "topBarContainer");

    const topBar = document.createElement("div");
    topBar.setAttribute("class", "topBar");

    const topBarText = document.createElement("p");
    topBarText.textContent = "DODO";

    topBar.appendChild(topBarText);

    topBarContainer.appendChild(topBar);

    rootNode.appendChild(topBarContainer);
    rootNode.appendChild(appBody);

    drawAddButton();
  };

  const drawAddButton = () => {
    const addButton = document.createElement("button");
    addButton.setAttribute("id", "addButton");
    addButton.addEventListener("click", () => {
      console.log("cool");
      const oldForm = document.querySelector("#popupForm");
      if (oldForm) {
        appBody.removeChild(oldForm);
      }
      renderForm();
      document.querySelector("#popupForm").classList.toggle("hidden");
    });
    addButton.textContent = "+";
    appBody.appendChild(addButton);
  };

  const clearRender = () => {
    appBody.replaceChildren();
    drawAddButton();
  };

  const renderProjects = () => {
    const projDiv = document.createElement("div");
    projDiv.setAttribute("class", "allProj");

    for (let i = 0; i < projArr.length; i++) {
      let projCard = document.createElement("div");
      projCard.setAttribute("class", "projCard");

      let projTitle = document.createElement("p");
      projTitle.textContent = `${projArr[i].title}`;

      let expandButton = document.createElement("button");
      expandButton.setAttribute("id", "expandButton");
      expandButton.innerHTML = `
        <span class="material-symbols-outlined">
            arrow_outward
        </span>`;
      expandButton.addEventListener("click", () => {
        clearRender();
        projExpander(i);
      });

      projCard.appendChild(projTitle);
      projCard.appendChild(expandButton);

      projDiv.appendChild(projCard);

      appBody.appendChild(projDiv);
    }
  };

  const projExpander = (poz) => {
    const bigTitle = document.createElement("div");
    bigTitle.setAttribute("class", "titleDiv");

    const backButton = document.createElement("button");
    backButton.setAttribute("id", "backButton");
    backButton.innerHTML = `
      <span class="material-symbols-outlined">
        arrow_back
      </span>
    `;
    backButton.addEventListener("click", () => {
      clearRender();
      renderProjects();
    });

    const projTitle = document.createElement("p");
    projTitle.textContent = projArr[poz].title;

    bigTitle.appendChild(backButton);
    bigTitle.appendChild(projTitle);

    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "taskContainer");

    projArr[poz].sortTodos();

    for (let i = 0; i < projArr[poz].todoArr.length; i++) {
      let taskCard = document.createElement("div");
      taskCard.setAttribute("class", "taskCard");

      let taskControls = document.createElement("div");
      taskControls.setAttribute("class", "taskControls");

      let taskTitle = document.createElement("p");
      taskTitle.textContent = projArr[poz].todoArr[i].title;

      let taskDue = document.createElement("p");

      taskDue.textContent = format(
        projArr[poz].todoArr[i].dueDate,
        "PPPP - pp",
        {
          locale: enUS,
        }
      );

      let descContainer = document.createElement("div");
      descContainer.setAttribute("class", "descContainer");

      let taskDesc = document.createElement("p");
      taskDesc.textContent = projArr[poz].todoArr[i].description;

      descContainer.appendChild(taskDesc);

      let taskExpand = document.createElement("button");
      taskExpand.setAttribute("id", "expandButton");
      taskExpand.innerHTML = `
        <span class="material-symbols-outlined">
            expand_more
        </span>
      `;

      taskExpand.addEventListener("click", () => {
        //make description visible by toggling a class
        descContainer.classList.toggle("visible");

        //change the button icon to expand less after click
        if (descContainer.classList.contains("visible")) {
          taskExpand.innerHTML = `
            <span class="material-symbols-outlined">
              expand_less
            </span>
        `;
        } else {
          taskExpand.innerHTML = `
            <span class="material-symbols-outlined">
              expand_more
            </span>`;
        }
      });

      let taskDelete = document.createElement("button");
      taskDelete.setAttribute("id", "deleteButton");
      taskDelete.innerHTML = `
        <span class="material-symbols-outlined">
          delete
        </span>
      `;

      taskDelete.addEventListener("click", () => {
        projArr[poz].todoArr.splice(i, 1);
        projArr[poz].sortTodos();
        clearRender();
        projExpander(poz);
      });

      taskControls.appendChild(taskTitle);
      taskControls.appendChild(taskDue);

      let taskControlsRight = document.createElement("div");
      taskControlsRight.setAttribute("div", "taskControlsRight");

      taskControlsRight.appendChild(taskExpand);
      taskControlsRight.appendChild(taskDelete);

      taskControls.appendChild(taskControlsRight);

      taskCard.appendChild(taskControls);
      taskCard.appendChild(descContainer);

      taskContainer.appendChild(taskCard);
    }
    appBody.appendChild(bigTitle);
    appBody.appendChild(taskContainer);
  };

  const renderForm = () => {
    const formPopup = document.createElement("div");
    formPopup.setAttribute("id", "popupForm");
    formPopup.setAttribute("class", "hidden");

    const form = document.createElement("form");
    form.innerHTML = `
    <p>Add Task</p>
    <label for="taskName">
      <strong>Task name</strong>
    </label>
    <input type="text" id="taskName" placeholder="Coolest thing ever" name="taskName" required>

    <label for="taskDescription">
      <strong>Description</strong>
    </label>
    <textarea type="description" id="taskDescription" name="taskDescription">Must also tell mom about this cool thing I just did. Then all my friends too.</textarea>

    <label for="taskDueDate">
      <strong>Due date</strong>
    </label>
    <input type="datetime-local" name="taskDueDate" id="taskDueDate" required>

    <label for="taskProject">
      <strong>Project</strong>
    </label>
    <input type="text" id="taskProject" placeholder="Spaceship" name="taskProject" required>

    <label for="taskPriority">
      <strong>Priority (0, 1, ... in order of importance)</strong>
    </label>
    <input type="number" id="taskPriority" placeholder="0" name="taskPriority" min="0" max="15" required>

    <button type="submit" id="submitForm">
      <span class="material-symbols-outlined">
        done
      </span>
    </button>

    <button type="button" id="closeForm">
      <span class="material-symbols-outlined">
        close
      </span>
    </button>
    `;

    formPopup.appendChild(form);

    appBody.appendChild(formPopup);

    const closeFormBtn = document.querySelector("#closeForm");
    closeFormBtn.addEventListener("click", () => {
      formPopup.classList.toggle("hidden");
    });

    const sendButton = document.querySelector("#submitForm");
    sendButton.addEventListener("click", () => {
      event.preventDefault();
      //console.log(document.querySelector("#taskDueDate").value);
      //console.log(parseISO(document.querySelector("#taskDueDate").value));
      let taskName = document.querySelector("#taskName").value;
      let taskDescription = document.querySelector("#taskDescription").value;

      //string in ISO format
      console.log(document.querySelector("#taskDueDate").value);

      //Date object
      console.log(parseISO(document.querySelector("#taskDueDate").value));

      let taskDueDate = parseISO(document.querySelector("#taskDueDate").value);

      console.log(taskDueDate);

      let taskPriority = document.querySelector("#taskPriority").value;

      let found = false;
      let renderPos = 0;

      let createdTask = createTodo(
        taskName,
        taskDescription,
        taskDueDate,
        taskPriority
      );

      for (let i = 0; i < projArr.length; i++) {
        if (projArr[i].title === document.querySelector("#taskProject").value) {
          projArr[i].todoArr.push(createdTask);
          formPopup.classList.toggle("hidden");
          clearRender();
          found = true;
          break;
        }
      }
      if (found === false) {
        projArr.push(
          createProject(document.querySelector("#taskProject").value)
        );
        projArr[projArr.length - 1].todoArr.push(createdTask);
        formPopup.classList.toggle("hidden");
        clearRender();
        projExpander(projArr.length - 1);
        //renderProjects();
      } else {
        projExpander(renderPos);
      }
    });
  };

  const renderNewTask = () => {};

  return {
    projExpander,
    renderProjects,
    clearRender,
    drawIndependents,
    renderForm,
    renderNewTask,
  };
};
export { appViewFactory };
export const locales = ["en-US"];
