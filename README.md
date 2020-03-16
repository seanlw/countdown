# Countdown

Simple countdown timer

## Usage

Keyboard:

* Arrow Up: Add one minute to timer
* Arrow Down: Subtract one minute to timer
* Space Bar: Start/Stop the timer
* Escape: Reset timer 

## Develpment

The use of the [yarn](https://yarnpkg.com/) package manager is strongly recommended, as opposed to using `npm`.

```
# install dependencies
yarn

# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# create distribution package, `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir
```

The main process is at `src/main/index.ts` and the renderer process is at `src/renderer/index.tsx`

All compiled distributions are created in `release/`

## License

**[MIT](LICENSE)**