!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=8)}([function(e,t){e.exports=require("fs")},function(e,t){var n;!function(e){var t=function(){function e(){this._map={}}return e.prototype.watch=function(e){this._map[e.uid]||(this._map[e.uid]=e)},e.prototype.notify=function(e){for(var t in this._map){this._map[t].update(e)}},e}();e.Dep=t}(n||(n={}));var n;!function(e){var t=function(){function t(n,r,i,o){this._disposed=!1,this._uid=t._uid++,this._target=n,this._exp=r,this._scope=i,this._expFunc=e.utils.createEvalFunc(r),this._callback=o,this.update()}return Object.defineProperty(t.prototype,"uid",{get:function(){return this._uid},enumerable:!0,configurable:!0}),t.prototype.getValue=function(){if(this._disposed)return null;var e=null;t.updating=this,Object.defineProperty(this._scope,"$target",{configurable:!0,enumerable:!1,value:this._target,writable:!1});try{e=this._expFunc(this._scope)}catch(e){console.error("表达式求值错误，exp："+this._exp+"，scope："+JSON.stringify(this._scope))}return delete this._scope.$target,t.updating=null,e},t.prototype.update=function(e){if(!this._disposed){var n=this.getValue();t.isEqual(n,this._value)||(this._callback&&this._callback(n,this._value,e),this._value=t.deepCopy(n))}},t.prototype.dispose=function(){this._disposed||(this._value=null,this._target=null,this._exp=null,this._scope=null,this._expFunc=null,this._callback=null,this._disposed=!0)},t.isEqual=function(e,n){return e==n||!(!t.isObject(e)||!t.isObject(n))&&JSON.stringify(e)==JSON.stringify(n)},t.isObject=function(e){return e&&"object"==typeof e},t.deepCopy=function(e){return t.isObject(e)?JSON.parse(JSON.stringify(e)):e},t}();t.updating=null,t._uid=0,e.Watcher=t}(n||(n={}));var n;!function(e){var t=function(){function t(){}return t.mutate=function(e){if(e&&"object"==typeof e){if(!e.__ares_mutated__){for(var n in e)t.mutateObject(e,n,e[n]);Object.defineProperty(e,"__ares_mutated__",{value:!0,writable:!1,enumerable:!1,configurable:!1})}return e}},t.mutateObject=function(n,r,i){var o=new e.Dep;Object.defineProperty(n,r,{enumerable:!0,configurable:!1,get:function(){var t=e.Watcher.updating;return t&&o.watch(t),i},set:function(e){e!=i&&(i=e,Array.isArray(e)?t.mutateArray(e,o):t.mutate(e),o.notify())}}),t.mutate(i)},t.mutateArray=function(e,n){e.__proto__=t.defineReactiveArray(n);for(var r=0,i=e.length;r<i;r++)t.mutate(e[r])},t.defineReactiveArray=function(e){var n=Array.prototype,r=Object.create(n);return t._arrMethods.forEach(function(i){var o=n[i];Object.defineProperty(r,i,{value:function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];var a,c=o.apply(this,n);switch(i){case"push":case"unshift":a=n;break;case"splice":a=n.slice(2)}return a&&a.length&&t.mutateArray(a,e),e.notify({method:n}),c}})}),Object.defineProperty(r,"$set",{value:function(e,t){return e>=this.length&&(e=this.length),this.splice(e,1,t)[0]}}),Object.defineProperty(r,"$remove",{value:function(e){var t=this.indexOf(e);return t>-1?this.splice(t,1):null}}),r},t}();t._arrMethods=["push","pop","unshift","shift","splice","sort","reverse"],e.Mutator=t}(n||(n={}));var n;!function(e){!function(e){function t(e){return Function("scope","with(scope){return "+e+"}")}function n(e,n){return t(e)(n)}function r(e){return Function("scope","with(scope){"+e+"}")}function i(e,t){r(e)(t)}e.createEvalFunc=t,e.evalExp=n,e.createRunFunc=r,e.runExp=i}(e.utils||(e.utils={}))}(n||(n={}));var n;!function(e){function t(e,t,r){return new n(e,t,r)}e.bind=t;var n=function(){function t(t,n,r){this._data=e.Mutator.mutate(t),this._compiler=n,this._options=r,this._compiler.init(this),this._options&&this._options.inited&&this._options.inited.call(this._data,this)}return Object.defineProperty(t.prototype,"data",{get:function(){return this._data},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"compiler",{get:function(){return this._compiler},enumerable:!0,configurable:!0}),t.prototype.createWatcher=function(t,n,r,i){return new e.Watcher(t,n,r,i)},t}();e.Ares=n}(n||(n={}));var e=e||{};e.exports=n},function(e,t){var n;!function(e){!function(e){function t(e){var t="",n=e.children;if(n)for(var r=0,i=n.length;r<i;r++)t+=n[r].value;return t}function n(e,t,n){e.children.forEach(function(e){n.compile(e,t)},this)}function r(t,n){e.commands[t]||(e.commands[t]=n)}e.getChildrenString=t,e.compileChildren=n,e.addCommand=r,e.commands={text:function(e){e.node.value=e.node.exp},exp:function(e){e.entity.createWatcher(e.node,e.node.exp,e.scope,function(t){e.node.value=t+""})},if:function(e){e.entity.createWatcher(e.node,e.node.exp,e.scope,function(r){r?(n(e.node,e.scope,e.compiler),e.node.value=t(e.node)):e.node.value=""})},for:function(e){var r=/^\s*(\S+)\s+in\s+(\S+)\s*$/,i=r.exec(e.node.exp);if(!i)return void console.error("for命令表达式错误："+e.node.exp);e.entity.createWatcher(e.node,i[2],e.scope,function(r){var o="";if(r)for(var a in r){var c=Object.create(e.scope);Object.defineProperty(c,"$index",{configurable:!0,enumerable:!1,value:a,writable:!1}),Object.defineProperty(c,i[1],{configurable:!0,enumerable:!0,value:r[a],writable:!1}),n(e.node,c,e.compiler),o+=t(e.node)}e.node.value=o})}}}(e.template||(e.template={}))}(n||(n={}));var n;!function(e){!function(e){var t=function(){function t(e,t,n){this._template=e,this._onUpdate=t,this._config=n}return t.prototype.init=function(e){this._entity=e,this._root=this.transformToNode(this._template),this.compile(this._root,e.data),this.update(),this.mutateValue(this._root)},t.prototype.compile=function(t,n){this._scope=n;var r=e.commands[t.cmd];if(r){r({node:t,scope:n,compiler:this,entity:this._entity})}t.children&&"if"!=t.cmd&&"for"!=t.cmd&&e.compileChildren(t,n,this)},t.prototype.update=function(){var t=e.getChildrenString(this._root);this._onUpdate(t)},t.prototype.mutateValue=function(e){var t=e.value,n=this;Object.defineProperty(e,"value",{configurable:!0,enumerable:!0,get:function(){return t},set:function(e){t=e,n.update()}}),e.children&&e.children.forEach(this.mutateValue,this)},t.prototype.transformToNode=function(e){function t(){var t=/[ \f\t\v]*/,r=/([ \f\t\v]*((\r\n)|[\r\n]))|([ \f\t\v]*)/g,i=a[a.length-1];if(i&&"text"==i.cmd){var o=Math.max(i.exp.lastIndexOf("\r"),i.exp.lastIndexOf("\n"));i.exp=i.exp.substring(0,o+1)+i.exp.substr(o+1).replace(t,"")}r.lastIndex=l.index+l[0].length;var c=r.exec(e);c&&(n=c[0].length)}for(var n,r=/\$a\-\{\s*(.*?)\s*\}/g,i=/^\s*([a-zA-Z0-9_]+?)\s*:\s*(.+?)\s*$/,o=/^\s*end\s+([a-zA-Z0-9_]+?)\s*$/,a=[],c=0,s=e.length,u=[],l=r.exec(e);null!=l;l=r.exec(e)){n=0,l.index>c&&a.push({cmd:"text",exp:e.substring(c,l.index)});var f=o.exec(l[1]);if(null!=f){t();var p=u.pop();null==p&&console.error("终结指令("+f[1]+")没有对应的起始指令"),p.cmd!=f[1]&&console.error("起始指令("+p.cmd+")与终结指令("+f[1]+")不匹配");var d=a.indexOf(p);p.children=a.splice(d+1)}else{var h=i.exec(l[1]);if(null!=h){t();var v={cmd:h[1],exp:h[2]};a.push(v),u.push(v)}else""==l[1]?t():a.push({cmd:"exp",exp:l[1]})}c=l.index+l[0].length+n}return c<s&&a.push({cmd:"text",exp:e.substr(c)}),u.length>0&&console.error("起始指令"+u[0].cmd+"没有对应的终结指令"),{cmd:null,exp:null,children:a}},t}();e.TemplateCompiler=t}(e.template||(e.template={}))}(n||(n={}));var e=e||{};e.exports=n.template},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";function r(e){for(var t={},n=a.readdirSync(e+"/messages"),r=0,o=n;r<o.length;r++){var u=o[r],l=a.readFileSync(e+"/messages/"+u,"utf-8"),f=JSON.parse(l);for(var p in f){var d=f[p],h=t[p];h||(t[p]=h=[]);for(var v=0,m=d.extra;v<m.length;v++){var g=m[v],y={fields:[]},_=i(d.default,y);_=i(g,_),_.file=u,_.field=p,h.push(_)}}console.log("读取消息配置["+u+"]成功")}var b=/^([a-zA-Z0-9_]+)\->([a-zA-Z0-9_]+)$/;for(var p in t)for(var h=t[p],x=0,O=h;x<O.length;x++){var j=O[x],S=function(e){var n=j[e];if("string"==typeof n){c.bind(j,new s.TemplateCompiler(n,function(e){n=e}));var r=b.exec(n);if(r)for(var i=t[r[1]],o=0,a=i;o<a.length;o++){var u=a[o];if(u.name==r[2]){j[e]=u;break}}}};for(var N in j)S(N)}return t}function i(e,t){t||(t={});for(var n in e)if("fields"==n)for(var r=0,i=e.fields;r<i.length;r++){var o=i[r];t.fields||(t.fields=[]),t.fields.push(o)}else t[n]=e[n];return t}function o(e,t,n){var r={};for(var i in e){var o=e[i];r[i]=o.filter(function(e){return t&&t.length>0?t.indexOf(e.file)>=0:!n||n.indexOf(e.file)<0},this)}return r}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),c=n(1),s=n(2);t.parserConfig=r,t.filterConfigs=o},function(e,t,n){"use strict";function r(e,t){try{var n=c.existsSync(e);if(n){c.readdirSync(e).forEach(function(t){var n=s.join(e,t);c.statSync(n).isDirectory()?r(n,!0):c.unlinkSync(n)}),t&&c.rmdirSync(e)}return n}catch(n){return console.warn("删除文件夹"+e+"失败，重试一次"),r(e,t)}}function i(e){try{return!!c.existsSync(e)||!!i(s.dirname(e))&&(c.mkdirSync(e),!0)}catch(t){return console.warn("重建文件夹"+e+"失败，重试一次"),i(e)}}function o(e){try{r(e,!1)||i(e),console.log("清空文件夹"+e+"成功")}catch(t){console.warn("清空文件夹"+e+"失败，1s后重试一次"),setTimeout(o,1e3,e)}}function a(e,t,n,r){var o=s.join(e,t,n);i(s.dirname(o)),c.writeFileSync(o,r)}Object.defineProperty(t,"__esModule",{value:!0});var c=n(0),s=n(3);t.emptyFolder=o,t.saveFile=a},function(e,t,n){"use strict";function r(e,t){for(var n=[],r=0,a=t.length;r<a;r++){var c=t[r],s=o.join(e,"configs",c,"config.json");if(i.existsSync(s)){var u=i.readFileSync(s,"utf-8"),l=JSON.parse(u);l.name=c;for(var f=/^[a-zA-Z0-9_]+$/,p=0,d=l.types;p<d.length;p++){var h=d[p];f.test(h.from)||(h.from=new RegExp(h.from)),h.customName=null,h.customTypes=[]}for(var v=0,m=l.templates;v<m.length;v++){var g=m[v];g.content=i.readFileSync(e+"/configs/"+c+"/"+g.file,"utf-8")}l.include=l.include||[],l.exclude=l.exclude||[],n.push(l),console.log("读取语言配置["+c+"]成功")}else console.warn("没有找到["+c+"]语言的配置文件")}return n}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n(3);t.parseConfig=r},function(e,t,n){"use strict";function r(e,t,n,r){function a(e){for(var t in n)for(var r=n[t],i=0,o=r.length;i<o;i++){var a=r[i];if(a.name==e)return a}return{}}function c(e){for(var t=[],n=0,r=e;n<r.length;n++){var i=r[n];t=t.concat(i.type.customTypes)}return s(t)}function s(e){for(var t=[],n=0,r=e.length;n<r;n++){for(var i=e[n],o=0,a=t.length;o<a;o++){var c=t[o];c.from==i.from&&c.to==i.to&&c.class==i.class&&(e.splice(n,1),n--,r--)}t.push(i)}return e}function u(t){for(var n=0,r=e;n<r.length;n++){var i=r[n];if(i.from==t)return{from:i.from,to:i.to,class:i.class,customName:null,customTypes:[]};if(i.from instanceof RegExp){var o=i.from.exec(t);if(o){var a=[],c=[],l=o[0],f=null;c.push(t.substring(0,o.index));for(var p=1,d=o.length;p<d;p++){var h=o[p],v=u(h),m=v.to,g=l.indexOf(h),y=h.length;c.push(l.substring(0,g)),c.push(m),l=l.substr(g+y),a=a.concat(v.customTypes),null!=v.customName&&a.push(v),f=f||u(h).customName}a=s(a),c.push(l),c.push(t.substr(o.index+o[0].length));return{from:t,to:c.join("").replace(i.from,i.to),class:i.class,customName:f,customTypes:a}}}}return{from:t,to:t,class:"custom",customName:t,customTypes:[]}}var l={};for(var f in r){var p=r[f];"fields"==f&&(p=p.map(function(e){var t={};for(var n in e)t[n]=e[n];return t.oriType=t.type,t.type=u(t.type),t},this)),l[f]=p}l.getConfigByName=a,l.getCustomTypes=c,l.removeDuplicate=s,l.transformType=u;var d={saveName:null,content:null};return i.bind(l,new o.TemplateCompiler(t.saveName,function(e){d.saveName=e})),i.bind(l,new o.TemplateCompiler(t.content,function(e){d.content=e})),d}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=n(2);t.replaceTemplate=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),i=n(4),o=n(7),a=n(5),c=process.argv.slice(2),s=c[0],u=c[1],l=c.slice(2),f=r.parseConfig(s,l);console.log("语言配置读取完毕");var p=i.parserConfig(s);console.log("消息配置读取完毕"),a.emptyFolder(u);for(var d=0,h=f;d<h.length;d++)for(var v=h[d],m=i.filterConfigs(p,v.include,v.exclude),g=0,y=v.templates;g<y.length;g++){var _=y[g];if("global"==_.field){var b=o.replaceTemplate(v.types,_,m,m);a.saveFile(u,v.name,b.saveName,b.content),console.log("生成["+v.name+"]文件["+b.saveName+"]成功")}else for(var x=m[_.field],O=0,j=x;O<j.length;O++){var S=j[O],b=o.replaceTemplate(v.types,_,m,S);a.saveFile(u,v.name,b.saveName,b.content),console.log("生成["+v.name+"]文件["+b.saveName+"]成功")}}}]);