const banner = `
// ==UserScript==
// @name         Typetalk emoreact
// @namespace    https://atw-proj.backlog.jp/git/AA9/typetalk-emoreact
// @version      0.1
// @description  Emoji Reaction
// @author       m-ohno
// @match        https://typetalk.com/*
// @grant        none
// ==/UserScript==
`

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/TypetalkEmoreact.user.js',
      format: 'iife',
      banner
    },
  },
];
