# logger-js

Free to use logger. It's a simple library that use console to print data and save it in files.

## How to use

As any other logger, you can use :

```js
log, warn, info, debug 
```

To use it in your project you can use it like:

```js
const logger = new Logger("onStdout"); // will write on your console
const loggerWith = new Logger("WithLogfile", "./log"); // will write on your console and save in a logfile
```

The first argument is the name given to the process, the logfile will be called `my_app.log` in that case. Second parameter is the path to your log directory, if it's not given, the Logger will just write on stdout. If the path given is invalid, logfile will not be created and the Logger will just log on stdout.

Furthermore, if an error occurred it will be logged in the standard logfile but also in a error logfile.

## Logging

Each method take a string or a variable as argument.

If it's an object, it will be stringify before output to make it readable in a logfile. This is to avoid `[Object Object]` in the middle of your file. (WARNING : in JS `a = [1,2,3]` has an Object type : `typeof a` will give object)

![log example](https://github.com/calvetalex/logger-js/blob/main/.images/output.png)

## COMMENTS / ISSUES / PR

Feel free to fork it and make your custom version

## LICENSE

MIT, see the source.