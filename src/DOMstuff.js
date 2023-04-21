const appViewFactory = () => {
  let arrayCopy;
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
      expandButton.setAttribute("id", "expandButton");
      expandButton.innerHTML = `
        <span class="material-symbols-outlined">
            arrow_outward
        </span>`;
      expandButton.addEventListener("click", () => {
        clearRender();
        projExpander(projArr, i);
        console.log(`expanded project ${i}`);
      });

      projCard.appendChild(projTitle);
      projCard.appendChild(expandButton);

      projDiv.appendChild(projCard);

      appBody.appendChild(projDiv);
    }
  };

  const projExpander = (projArr, poz) => {
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
      renderProjects(projArr);
    });

    const projTitle = document.createElement("p");
    projTitle.textContent = projArr[poz].title;

    bigTitle.appendChild(backButton);
    bigTitle.appendChild(projTitle);

    const taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "taskContainer");
    for (let i = 0; i < projArr[poz].todoArr.length; i++) {
      let taskCard = document.createElement("div");
      taskCard.setAttribute("class", "taskCard");

      let taskControls = document.createElement("div");
      taskControls.setAttribute("class", "taskControls");

      let taskTitle = document.createElement("p");
      taskTitle.textContent = projArr[poz].todoArr[i].title;

      let taskDue = document.createElement("p");
      taskDue.textContent = ""; //need to format date to be readable

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
        projExpander(projArr, poz);
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

  const drawAddButton = () => {
    const addButton = document.createElement("button");
    addButton.setAttribute("id", "addButton");
  };

  return { projExpander, renderProjects, clearRender };
};
export { appViewFactory };
