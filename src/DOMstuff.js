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

      projCard.appendChild(projTitle);
      projCard.appendChild(expandButton);

      projDiv.appendChild(projCard);

      appBody.appendChild(projDiv);
    }
  };

  const projExpander = (project) => {
    let bigTitle = document.createElement("div");
    bigTitle.textContent = project.title;
  };

  return { projExpander, renderProjects };
};
export { appViewFactory };
