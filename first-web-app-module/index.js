'use strict';

const firstModule = require('./first-module');
firstModule.doIt();

const configModule = require('./configurable-module');
const configModuleA = configModule({ prefix: 'A>'});
configModuleA.log('test 1');

const configModuleB = configModule({prefix:"B>"});
configModuleB.log('test 2');

// using ES6 destructuring 
const {getItDone, doSomething : doS} = require('./first-module');
getItDone();
// using ES6 destructuring alias
doS();
