import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

/**
 * Initialization data for the Weather extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'Weather:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('Weather is activate bye ! :)');
    console.log('ICommandPalette:', palette);
  }
};

export default plugin;
