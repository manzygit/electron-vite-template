import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils";

let mainWindow: BrowserWindow = null;

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.resolve(__dirname, "./preload.js")
        }
    });
    if(isDev()){
        console.log("Dev Mode: ", isDev());
        mainWindow.webContents.openDevTools();
        mainWindow.loadURL("http://localhost:5123");

        ipcMain.on("message", function(sender, msg){
            console.log(msg);
        })
    } else {
        mainWindow.loadFile(path.resolve(__dirname, "../render/index.html"));
    }
    mainWindow.on("close", function(){
        mainWindow = null;
        process.exit(1);
    })
}

app.on("ready", function(){
    createWindow();
});

app.on("window-all-closed", function(){
    if(process.platform === "darwin"){
        app.quit();
    }
});

app.on("activate", function(){
    if(mainWindow === null){
        createWindow();
    }
});