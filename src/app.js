const app = appFactory();
import { appFactory } from "./todoApp";
import { appViewFactory } from "./DOMstuff";

const appView = appViewFactory(app.projArr);

console.table(app.projArr);

appView.drawIndependents();
appView.renderProjects();
appView.renderForm();
