'use strict';

var fs = require('fs');
var vm = require('vm');

global.window = global; 

function processScriptFromFile(filename) {
    
    try {
        new vm.Script(fs.readFileSync(filename).toString(), {filename: filename}).runInThisContext();
    } catch (err) {
        console.error('Error processing', filename, ':', err.message);
    }
}

console.log('*********** Running cs142 Project #2 tests ***********');

var startingGlobalProperties = Object.keys(global);

console.log('*** Loading project files ....');
processScriptFromFile('./cs142-make-multi-filter.js');
processScriptFromFile('./cs142-template-processor.js');

console.log('*** Running tests ....');
processScriptFromFile('./cs142-test-project2.js');

var p1Message = global.cs142Project2Results.p1Message;
var p2Message = global.cs142Project2Results.p2Message;
var p3Message = global.cs142Project2Results.p3Message;


var testWorked =  (p1Message === 'SUCCESS') &&  (p2Message === 'SUCCESS') &&
    (p3Message === 'SUCCESS');

console.log('*********** Running cs142 Project #2 tests ***********:',
    testWorked ? 'Success' : 'Fail');
var endingGlobalProperties = Object.keys(global);

var arrayDiff = function(a,b) {
    return b.filter(function(i) {return a.indexOf(i) < 0;}).concat(a.filter(function(i) {return b.indexOf(i) < 0;}));
};

process.exit(Number(!testWorked));  
