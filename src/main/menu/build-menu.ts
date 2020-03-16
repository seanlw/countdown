import { Menu, app } from 'electron'

export function buildDefaultMenu(): Menu {
  const template = new Array<Electron.MenuItemConstructorOptions>()

  if (__DARWIN__) {
    template.push({
      label: app.getName(),
      submenu: [
        { role: 'quit' },
      ]
    })
  }

  if (!__DARWIN__) {
    template.push({
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    })
  }

  template.push({
    label: __DARWIN__ ? 'View' : '&View',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: (() => {
          return __DARWIN__ ? 'Alt+Command+I' : 'Ctrl+Shift+I'
        })(),
        click(item: any, focusedWindow: Electron.BrowserWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools()
          }
        }
      }
    ]
  })

  return Menu.buildFromTemplate(template);
}