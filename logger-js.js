// name logger-js.js
// version: 1.0.0
// https://github.com/calvetalex/logger-js
/*

Copyright (c) 2021 TIC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const fs = require("fs");

class Logger {
  logfilePath = "";
  errorPath = "";
  standardStream;
  errorStream;

  constructor(name, path = "", overwrite = false) {
    if (!path) return;
    if (!fs.existsSync(path)) {
      this.error(`WARNING : directory '${path}' does not exists. Please use a valid path to get logfiles.\n\n`);
      return;
    }
    this.logfilePath = `${
      path.slice(-1) !== "/" ? path + "/" : path
    }${name}-standard.log`;
    this.errorPath = `${
      path.slice(-1) !== "/" ? path + "/" : path
    }${name}-error.log`;
    this.standardStream = fs.createWriteStream(this.logfilePath, {
      flags: (overwrite ? "w+" : "a+"),
    });
    this.errorStream = fs.createWriteStream(this.errorPath, { flags: (overwrite ? "w+" : "a+") });
  }

  getDate() {
    const date = new Date();
    const yy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mn = String(date.getMinutes()).padStart(2, "0");
    return `${yy}-${mm}-${dd} . ${hh}:${mn}`;
  }

  message(content) {
    return `[${this.getDate()}] ${content}`;
  }

  makeLog(type, toPrint) {
    if (!toPrint) return;
    let content = "";
    if (typeof toPrint === "object" || toPrint instanceof Object) {
      content = `${type}${this.message(JSON.stringify(toPrint))}`;
    } else {
      content = `${type}${this.message(toPrint)}`;
    }
    if (this.logfilePath) {
      this.standardStream.write(content + "\n");
      if (
        type == "[ERR]" ||
        content.match(/error/gi) ||
        content.match(/erreur/gi)
      ) {
        this.errorStream.write(content + "\n");
      }
    }
    return content;
  }

  log(val) {
    console.log(this.makeLog("[LOG]", val));
  }

  info(val) {
    console.info(this.makeLog("[INF]", val));
  }

  debug(val) {
    console.debug(this.makeLog("[DEB]", val));
  }

  error(val) {
    console.error(this.makeLog("[ERR]", val));
  }
}

module.exports = Logger;
