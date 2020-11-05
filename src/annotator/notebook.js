import Delegator from './delegator';
import { createSidebarConfig } from './config/sidebar';

/**
 * Create the iframe that will load the sidebar application.
 *
 * @return {HTMLIFrameElement}
 */
function createNotebookFrame(config) {
  const sidebarConfig = createSidebarConfig(config);
  sidebarConfig.isNotebook = true;
  const configParam =
    'config=' + encodeURIComponent(JSON.stringify(sidebarConfig));
  const sidebarAppSrc = config.sidebarAppUrl + '#' + configParam;

  const sidebarFrame = document.createElement('iframe');

  // Enable media in annotations to be shown fullscreen
  sidebarFrame.setAttribute('allowfullscreen', '');

  sidebarFrame.src = sidebarAppSrc;
  sidebarFrame.title = 'Hypothesis annotation notebook';
  sidebarFrame.className = 'notebook-inner';

  return sidebarFrame;
}

export default class Notebook extends Delegator {
  constructor(element, config) {
    super(element, config);
    this.config = config;
    this.frame = null;
    // TODO?: handle external container?

    this.container = document.createElement('div');
    this.container.style.display = 'none';
    // TODO?: Is there any necessity to handle theme-clean?
    this.container.className = 'notebook-outer';

    this.subscribe('showNotebook', () => this.show());
    this.subscribe('hideNotebook', () => this.hide());
    // If the sidebar has opened, get out of the way
    this.subscribe('sidebarOpened', () => this.hide());
  }

  init() {
    if (!this.frame) {
      this.frame = createNotebookFrame(this.config);
      this.container.appendChild(this.frame);
      this.element.appendChild(this.container);
    }
  }

  show() {
    this.init();
    this.container.style.display = '';
  }

  hide() {
    this.container.style.display = 'none';
  }

  destroy() {
    // TBD
    return;
  }
}
