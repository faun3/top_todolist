import { appFactory } from "./todoApp";
import { appViewFactory } from "./DOMstuff";

let projArr = [];

const app = appFactory(projArr);
const appView = appViewFactory(app.projArr);

console.table(app.projArr);

appView.drawIndependents();
appView.renderProjects();
appView.renderForm();
