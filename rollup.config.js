import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import nodeJson from 'rollup-plugin-json';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('package.json'));
const banner = `
// ==UserScript==
// @name         Typetalk emoreact
// @namespace    https://github.com/mohno007/typetalk-emoreact
// @homepage     https://github.com/mohno007/typetalk-emoreact
// @downloadURL  https://mohno007.github.io/typetalk-emoreact/TypetalkEmoreact.user.js
// @updateURL    https://mohno007.github.io/typetalk-emoreact/TypetalkEmoreact.user.js
// @supportURL   https://github.com/mohno007/typetalk-emoreact/issues/new
// @version      ${packageJson.version}
// @description  Emoji Reaction
// @author       m-ohno
// @match        https://typetalk.com/*
// @grant        none
// ==/UserScript==
//
// Copyright (c) 2018-2021 Motohiro OHNO
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//
// node-emoji: Copyright (c) 2014 Daniel Bugl
// emoji-regex: Copyright Mathias Bynens <https://mathiasbynens.be/>
// lodash: Copyright JS Foundation and other contributors <https://js.foundation/>
`.slice(1);

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/TypetalkEmoreact.user.js',
      format: 'iife',
      banner,
    },
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**',
        sourceMap: false,
      }),
      nodeJson(),
    ],
  },
];
