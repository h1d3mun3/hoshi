import { BrowserWindow, dialog } from 'electron';
import { HoshiAPI, SmalledProject } from '../../models';
import createModulesContainer from './container';

export type APIHandler = {
  initializeAsync(): Promise<void>;
  exposed: HoshiAPI;
};

const createAPIHandler: (window: BrowserWindow) => APIHandler = (window) => {
  const container = createModulesContainer();
  return {
    initializeAsync: async (): Promise<void> => {
      /* WIP */
    },
    exposed: {
      openProjectAsync: async (): Promise<SmalledProject | undefined> => {
        const result = await dialog.showOpenDialog(window, {
          properties: ['openFile'],
          title: 'Select Directory', // FIXME: Translation
          filters: [
            {
              name: 'Hoshi Project (project.hoshi)', // FIXME: Translation
              extensions: ['hoshi'],
            },
          ],
        });
        if (result.canceled) {
          return undefined;
        }
        const path = result.filePaths[0];
        const project = await container.projects.openProjectAsync(path);
        return project;
      },
      // eslint-disable-next-line class-methods-use-this
      fetchCurrentProjectAsync: async (): Promise<SmalledProject | undefined> => {
        return undefined;
        /*
        return {
          id: '1234',
          metadata: {},
          packages: [
            {
              id: 'app',
              metadata: {},
            },
            {
              id: 'server',
              metadata: {},
            },
          ],
        };
         */
      },
    },
  };
};

export default createAPIHandler;
