const appViewFactory = () => {
  const rootNode = document.querySelector("#app");
  //navbar thing that has a notch in the middle with the name of the app
  //    think new macbooks
  const topBar = document.createElement("div");
  topBar.setAttribute("class", "topBar");
  topBar.textContent = "dodo";

  let appBody = document.createElement("div");
  appBody.setAttribute("class", "appBody");

  rootNode.appendChild(topBar);
  rootNode.appendChild(appBody);

  //our append point is the appBody where we render all content

  const clearRender = () => {
    appBody.replaceChildren();
  };

  const renderProjects = (projArr) => {
    const projDiv = document.createElement("div");
    projDiv.setAttribute("class", "allProj");

    for (let i = 0; i < projArr.length; i++) {
      //create a card div for every project
      //  projects cards will only contain their title, aligned to the left
      //  and an "expand" button aligned to the right that re-renders the
      //  current page, showing all of that project's to-dos
      let projCard = document.createElement("div");
      projCard.setAttribute("class", "projCard");

      let projTitle = document.createElement("p");
      projTitle.textContent = `${projArr[i].title}`;

      let expandButton = document.createElement("button");
      expandButton.innerHTML = `
        <span class="material-symbols-outlined">
            arrow_outward
        </span>`;
      expandButton.addEventListener("click", () => {
        clearRender();
        projExpander(projArr[i]);
        console.log(`expanded project ${i}`);
      });

      projCard.appendChild(projTitle);
      projCard.appendChild(expandButton);

      projDiv.appendChild(projCard);

      appBody.appendChild(projDiv);
    }
  };

  const projExpander = (project) => {
    const bigTitle = document.createElement("div");
    bigTitle.setAttribute("class", "titleDiv");

    const backButton = document.createElement("button");
    backButton.innerHTML = `
      <span class="material-symbols-outlined">
        arrow_back
      </span>
    `;
    backButton.addEventListener("click", () => {
      clearRender();
      renderProjects(app.projArr);
    });

    const projTitle = document.createElement("p");
    projTitle.textContent = project.title;

    bigTitle.appendChild(backButton);
    bigTitle.appendChild(projTitle);

    const taskContainer = document.createElement("div");
    for (let i = 0; i < project.todoArr.length; i++) {
      let taskCard = document.createElement("div");

      let taskControls = document.createElement("div");

      let taskTitle = document.createElement("p");
      taskTitle.textContent = project.title;

      let taskDue = document.createElement("p");
      taskDue = ""; //need to format date to be readable

      let descContainer = document.createElement("div");
      descContainer.setAttribute("class", "descContainer");

      let taskDesc = document.createElement("p");
      taskDesc = project.description;

      let taskExpand = document.createElement("button");
      taskExpand.innerHTML = `
        <span class="material-symbols-outlined">
            expand_more
        </span>
      `;

      taskExpand.addEventListener("click", () => {
        //make description visible by toggling a class
        descContainer.classList.toggle("visible");

        //change the button icon to expand less after click
        taskExpand.innerHTML = `
          <span class="material-symbols-outlined">
            expand_less
          </span>
        `;
      });

      let taskDelete = document.createElement("button");
      taskDelete.innerHTML = `
        <span class="material-symbols-outlined">
          delete
        </span>
      `;

      taskDelete.addEventListener("click", () => {
        project.todoArr.splice(i, 1);
        project.sortTodos();
        projExpander(project);
      });

      taskControls.taskCard.appendChild(taskTitle);
      taskCard.appendChild(taskDue);
      taskCard.appendChild;

      taskContainer.appendChild(taskCard);

      appBody.appendChild(taskContainer);
    }
  };

  return { projExpander, renderProjects, clearRender };
};
export { appViewFactory };
