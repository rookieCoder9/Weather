import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { Widget } from '@lumino/widgets';
import { navbar } from './navbar';
import { mainArea } from './mainArea';

const plugin: JupyterFrontEndPlugin<void> = {
  id: 'Weather:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    const newWidget = () => {
      const content = new Widget();
      const widget = new MainAreaWidget({ content });
      widget.id = 'Weather';
      widget.title.label = 'Weather';
      widget.title.closable = true;
      content.addClass('app');
      content.node.appendChild(navbar());
      content.node.appendChild(mainArea());
      return widget;
    };
    let widget = newWidget();
    const command = 'Weather:open';
    app.commands.addCommand(command, {
      label: 'Weather Application',
      execute: () => {
        if (widget.isDisposed) {
          widget = newWidget();
        }
        if (!widget.isAttached) {
          app.shell.add(widget, 'main');
        }
        app.shell.activateById(widget.id);
      }
    });
    palette.addItem({ command, category: 'Tutorial' });
  }
};

export default plugin;
