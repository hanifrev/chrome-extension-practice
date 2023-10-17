# Pokemon Extension Practice

Chrome Extension: React + TypeScript + TailWind CSS

## Includes the following

TypeScript, Webpack, React, Tailwind CSS, Jest

## Project Structure

- src/typescript: TypeScript source files
- src/assets: static files
- dist: Chrome Extension directory
- dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Build

```
npm run build
```

## Build in watch mode

```
npm run watch
```

## Journal

#### 2 October 2023

Slicing and reading documentation and watch tutorial on how chrome extension works

#### 3 October 2023

Slicing and reading documentation and watch tutorial on how chrome extension works
Trying out the extension boilerplate from Shafiq

#### 4 October 2023

Reading documentation and watch tutorial on how chrome extension works.
Try to use local storage and cookies to save state on browser, but and then realized that that's not the way to save state, because when we close the extension's popup, the local storage and cookies will also gone.

#### 5 October 2023

Understanding how background script work, create some function to test how background script works, and chrome storage.
My browser seems weird, some classes not rendered, but it's work when i use incognito mode.
Updating manifest to version 3 instead of 2

#### 6 October 2023

Understanding how content script work, still confuse how background and content script connected.
The pokeball is appear and clickable, but still loaded on intiial load, not on when we click catch pokemon on popup.
Reading and trying Juan's code, and I got more understanding after that, but i still strunggling with content script

#### 9 October 2023

Some tailwind not working (like on Modal components), so i used plain CSS for styling, still strunggling with content script

#### 10 October 2023

Fetch from background script and send it to Modal, the pokeball still loaded on initial load, i already make it only shown when i click the catch pokemon button on popup, but still didn't make it. And i also playing arround with chrome API such as storage, runtime, etc. You can see on console there's a lot of log that i create during practice

#### 11 October 2023

Found a solution how to show pokeball by clicking 'Catch a Pokemons' button inside menu / popup. I use this https://stackoverflow.com/a/69128710 as referance. On MainPage, i sendMessage to background script when the 'Catch a Pokemons' clicked, with action called 'perfomAction'. On background script, while listening to message 'perfomAction', i add chrome.tabs.query with action: "open_dialog_box" to communicate with content script. On content script, if content script received "open_dialog_box", it will set setShowThirdParty to true and pokeball shown.

#### 12 October 2023

Working on catched pokemon count and view saved pokemon, so i use redux-toolkit to manage the states, but at some point the redux wont work on popup components (MainPage, ViewPage) but it works well on the other components (non-popup), so to resolve that behaviour, i use the combination of redux toolkit, useEffect, and chrome API. So after pokemon catched, and if we input the nickname and click save button on modal, it will save the information (nickname, original name, and img url) to store via pokeCatchData slice. And then the pokeCatchData data will set to cookies. And on popup (MainPage and ViewPage files) i will get cookies by using chrome.tabs.query inside useEffect to get the active tab information and then i use chrome.cookies.get to get cookies value and then passed to useState then to UI. So basically is like that, it's working but i believe it still can to be improved.
And i still wonder why the redux toolkit won't work on popup (MainPage and ViewPage files) i already wrap it on provider, i thinks it's the boilerplate problem, or not???, so later i will try to using the other boilerplate to see what happened.

#### 13 October 2023

Use chrome storage instead of chrome cookies. Make the the files/folder structure more cleaner. Clear all storage when logout from MainPage

### FLOW

![flow](https://i.imgur.com/BHli3YM.png)
