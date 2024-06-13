// class imports
import { DragAndDrop } from './classes/DragAndDrop';

// helper function imports
import { renderTemplate } from './utils/renderTemplate';

// instantiate classes
const project = new DragAndDrop('My Project');

// ----------------------------------------------------- //

// render template tags
renderTemplate('project-input');
renderTemplate('single-project');
renderTemplate('project-list');
