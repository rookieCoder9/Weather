import { KernelAPI, KernelManager } from '@jupyterlab/services';
import { IKernelConnection } from '@jupyterlab/services/lib/kernel/kernel';

const sendMessage = async (
  kernelConnection: IKernelConnection,
  weather: any
): Promise<void> => {
  const comm = kernelConnection.createComm('my');
  if (comm.commId === undefined) {
    return;
  }
  comm.open();

  comm.onMsg = (msg: any) => {
    console.log('Received message:', msg);
  };
  const messagePromise = comm.send({ data: weather });
  messagePromise.done.then(() => {
    comm.close().done.then(() => kernelConnection.dispose());
  });
};

const getRunningKernels = (): any => {
  return KernelAPI.listRunning();
};

export const handleRunningKernels = async (weather: any): Promise<void> => {
  const kernelManager = new KernelManager();
  const kernelList = await getRunningKernels();
  kernelList.map(async (kernel: any) => {
    const option = {
      model: {
        id: kernel.id,
        name: kernel.name
      }
    };
    const kernelConnection = kernelManager.connectTo(option);
    sendMessage(kernelConnection, weather);
  });
};
