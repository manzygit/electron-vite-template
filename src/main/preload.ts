import { contextBridge, ipcRenderer } from "electron";

export const ElectronAPI = {
    sendMessage(msg: string): void {
        ipcRenderer.send("message", msg);
        alert(msg);
    }
};

contextBridge.exposeInMainWorld("ElectronAPI", ElectronAPI);