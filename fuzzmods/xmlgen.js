cmxmldb = require('./Helpers/cmxmldb.js').cmxmldb
xmldb = require('./Helpers/xmldb.js').xmldb
tabledb = require('./Helpers/tabledb.js').tabledb
svginlinedb = require('./Helpers/svginlinedb.js').svginlinedb

//decode=require('base64').decode;

function ra(a){return a[rint(a.length)]}
function rint(upto){return Math.floor(Math.random()*upto);}

function genSensibleSvg(_iter){
var ret = 'document.body.innerHTML += "<svg>"\n'

for(var i=0;i< _iter;i++){
var s='';
s = new Buffer(ra(svginlinedb),'base64').toString();
r = "$1 id='test"+i+"' $2"
d=s.replace(/(<[a-zA-Z]+)(\s|>)/,r);
ret+= 'document.body.innerHTML += decode_base64("'+new Buffer(d).toString('base64')+'");\n'
}//for

return ret += 'document.body.innerHTML += "</svg>"\n';
}

module.exports.genSensibleSvg = genSensibleSvg

function genSensibleXml(_iter){
var ret =''
for(var i=0;i<_iter;i++)
{
var s='';
switch(rint(2)){
case 0:
s= new Buffer(ra(cmxmldb),'base64').toString();
break;

case 1:
s = new Buffer(ra(xmldb),'base64').toString();
break;
}

r="$1 id='test"+i+"' $2"
d=s.replace(/(<[a-zA-Z]+)(\s|>)/,r);

switch(rint(4)){

case 0:
case 1:
case 2:
ret += 'document.body.innerHTML += decode_base64("'+new Buffer(d).toString('base64')+'");\n'
break;

case 3:
ret += 'document.body.innerHTML += decode_base64("'+ra(tabledb) +'");\n'
	break;
}
}
return ret;
}

module.exports.genSensibleXml = genSensibleXml;



function genSensibleXmlDiv(_iter){

var ret =''
for(var i=0;i<_iter;i++)
{
var s='';
switch(rint(2)){
case 0:
s= new Buffer(ra(cmxmldb),'base64').toString();
break;

case 1:
s = new Buffer(ra(xmldb),'base64').toString();
break;
}

r="$1 id='test"+i+"' $2"
d=s.replace(/(<[a-zA-Z]+)(\s|>)/,r);

switch(rint(4)){

case 0:
case 1:
case 2:
ret += 'test.innerHTML += decode_base64("'+new Buffer(d).toString('base64')+'");\n'
break;

case 3:
ret += 'test.innerHTML += decode_base64("'+ra(tabledb) +'");\n'
	break;
}
}
return ret;
}

module.exports.genSensibleXmlDiv = genSensibleXmlDiv;
