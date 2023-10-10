# create-t3-extension

Chrome Extension: React + TypeScript + TailWind CSS

## Prerequisites

- [node + npm](https://nodejs.org/) (Current Version)

## Includes the following

- TypeScript
- Webpack
- React
- Tailwind CSS
- Jest

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

Fetch from background script and send it to Modal
