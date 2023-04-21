const appViewFactory = () => {
  let rootNode = document.querySelector("#app");
  const projExpander = () => {};

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

      projCard.appendChild(projTitle);

      projDiv.appendChild(projCard);

      rootNode.appendChild(projDiv);
    }
  };
  return { projExpander, renderProjects };
};
export { appViewFactory };
