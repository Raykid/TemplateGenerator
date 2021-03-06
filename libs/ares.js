(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ares"] = factory();
	else
		root["ares"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Raykid on 2016/12/22.
 */
/**
 * 创建一个表达式求值方法，用于未来执行
 * @param exp 表达式
 * @returns {Function} 创建的方法
 */
function createEvalFunc(exp) {
    var func;
    try {
        func = Function("scope", "with(scope){return " + exp + "}");
    }
    catch (err) {
        // 可能是某些版本的解释器不认识模板字符串，将模板字符串变成普通字符串
        var sepStr = (exp.indexOf('"') < 0 ? '"' : "'");
        // 将exp中的·替换为'
        var reg = /([^\\]?)`/g;
        exp = exp.replace(reg, "$1" + sepStr);
        // 将exp中${...}替换为" + ... + "的形式
        reg = /\$\{(.*?)\}/g;
        exp = exp.replace(reg, sepStr + "+($1)+" + sepStr);
        // 重新生成方法并返回
        func = Function("scope", "with(scope){return " + exp + "}");
    }
    return func;
}
exports.createEvalFunc = createEvalFunc;
/**
 * 表达式求值，无法执行多条语句
 * @param exp 表达式
 * @param scope 表达式的作用域
 * @returns {any} 返回值
 */
function evalExp(exp, scope) {
    return createEvalFunc(exp)(scope);
}
exports.evalExp = evalExp;
/**
 * 创建一个执行方法，用于未来执行
 * @param exp 表达式
 * @returns {Function} 创建的方法
 */
function createRunFunc(exp) {
    return createEvalFunc("(function(){" + exp + "})()");
}
exports.createRunFunc = createRunFunc;
/**
 * 直接执行表达式，不求值。该方法可以执行多条语句
 * @param exp 表达式
 * @param scope 表达式的作用域
 */
function runExp(exp, scope) {
    createRunFunc(exp)(scope);
}
exports.runExp = runExp;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(0);
/**
 * Created by Raykid on 2016/12/22.
 * 数据更新订阅者，当依赖的数据有更新时会触发callback通知外面
 */
var Watcher = (function () {
    function Watcher(entity, target, exp, scope, callback) {
        this._disposed = false;
        // 记录entity
        this._entity = entity;
        // 生成一个全局唯一的ID
        this._uid = Watcher._uid++;
        // 记录作用目标、表达式和作用域
        this._target = target;
        this._exp = exp;
        this._scope = scope;
        // 将表达式和作用域解析为一个Function
        this._expFunc = Utils_1.createEvalFunc(exp);
        // 记录回调函数
        this._callback = callback;
        // 进行首次更新
        this.update();
    }
    Object.defineProperty(Watcher.prototype, "uid", {
        /** 获取Watcher的全局唯一ID */
        get: function () {
            return this._uid;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 获取到表达式当前最新值
     * @returns {any} 最新值
     */
    Watcher.prototype.getValue = function () {
        if (this._disposed)
            return null;
        var value = null;
        // 记录自身
        Watcher.updating = this;
        // 设置通用属性
        // 这里一定要用defineProperty将目标定义在当前节点上，否则会影响context.scope
        Object.defineProperty(this._scope, "$root", {
            configurable: true,
            enumerable: false,
            value: this._entity.compiler.root,
            writable: false
        });
        // 这里一定要用defineProperty将目标定义在当前节点上，否则会影响context.scope
        Object.defineProperty(this._scope, "$target", {
            configurable: true,
            enumerable: false,
            value: this._target,
            writable: false
        });
        // 表达式求值
        try {
            value = this._expFunc.call(this._scope, this._scope);
        }
        catch (err) {
            // 输出错误日志
            console.warn("表达式求值错误\nerr: " + err.toString() + "\nexp：" + this._exp + "，scope：" + JSON.stringify(this._scope));
        }
        // 移除通用属性
        delete this._scope["$root"];
        delete this._scope["$target"];
        // 移除自身记录
        Watcher.updating = null;
        return value;
    };
    /**
     * 当依赖的数据有更新时调用该方法
     * @param extra 可能的额外数据
     */
    Watcher.prototype.update = function (extra) {
        if (this._disposed)
            return;
        var value = this.getValue();
        if (!Watcher.isEqual(value, this._value)) {
            this._callback && this._callback(value, this._value, extra);
            this._value = Watcher.deepCopy(value);
        }
    };
    /** 销毁订阅者 */
    Watcher.prototype.dispose = function () {
        if (this._disposed)
            return;
        this._value = null;
        this._target = null;
        this._exp = null;
        this._scope = null;
        this._expFunc = null;
        this._callback = null;
        this._disposed = true;
    };
    /**
     * 是否相等，包括基础类型和对象/数组的对比
     */
    Watcher.isEqual = function (a, b) {
        return (a == b || (Watcher.isObject(a) && Watcher.isObject(b)
            ? JSON.stringify(a) == JSON.stringify(b)
            : false));
    };
    /**
     * 是否为对象(包括数组、正则等)
     */
    Watcher.isObject = function (obj) {
        return (obj && typeof obj == "object");
    };
    /**
     * 复制对象，若为对象则深度复制
     */
    Watcher.deepCopy = function (from) {
        if (Watcher.isObject(from)) {
            // 复杂类型对象，先字符串化，再对象化
            return JSON.parse(JSON.stringify(from));
        }
        else {
            // 基本类型对象，直接返回之
            return from;
        }
    };
    return Watcher;
}());
/** 记录当前正在执行update方法的Watcher引用 */
Watcher.updating = null;
Watcher._uid = 0;
exports.Watcher = Watcher;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by Raykid on 2016/12/22.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Watcher_1 = __webpack_require__(1);
var Dep_1 = __webpack_require__(8);
var Mutator = (function () {
    function Mutator() {
    }
    /**
     * 将用户传进来的数据“变异”成为具有截获数据变更能力的数据
     * @param data 原始数据
     * @returns {any} 变异后的数据
     */
    Mutator.mutate = function (data) {
        // 如果是简单类型，则啥也不做
        if (!data || typeof data != "object")
            return;
        // 是个复杂类型对象，但是以前变异过了就不再重做一遍了
        if (!data.__ares_mutated__) {
            // 针对每个内部变量都进行一次变异
            for (var key in data) {
                Mutator.mutateObject(data, key, data[key]);
            }
            // 打一个标记表示已经变异过了
            Object.defineProperty(data, "__ares_mutated__", {
                value: true,
                writable: false,
                enumerable: false,
                configurable: false
            });
        }
        return data;
    };
    Mutator.mutateObject = function (data, key, value) {
        // 对每个复杂类型对象都要有一个对应的依赖列表
        var dep = new Dep_1.Dep();
        // 变异过程
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function () {
                // 如果Watcher.updating不是null，说明当前正在执行表达式，那么获取的变量自然是其需要依赖的
                var watcher = Watcher_1.Watcher.updating;
                if (watcher)
                    dep.watch(watcher);
                // 利用闭包保存原始值
                return value;
            },
            set: function (v) {
                if (v == value)
                    return;
                value = v;
                // 如果是数组就走专门的数组变异方法，否则递归变异对象
                if (Array.isArray(v))
                    Mutator.mutateArray(v, dep);
                else
                    Mutator.mutate(v);
                // 触发通知
                dep.notify();
            }
        });
        // 递归变异
        Mutator.mutate(value);
    };
    Mutator.mutateArray = function (arr, dep) {
        // 变异当前数组
        arr["__proto__"] = Mutator.defineReactiveArray(dep);
        // 遍历当前数组，将内容对象全部变异
        for (var i = 0, len = arr.length; i < len; i++) {
            Mutator.mutate(arr[i]);
        }
    };
    Mutator.defineReactiveArray = function (dep) {
        var proto = Array.prototype;
        var result = Object.create(proto);
        // 遍历所有方法，一个一个地变异
        Mutator._arrMethods.forEach(function (method) {
            // 利用闭包记录一个原始方法
            var oriMethod = proto[method];
            // 开始变异
            Object.defineProperty(result, method, {
                value: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    // 首先调用原始方法，获取返回值
                    var result = oriMethod.apply(this, args);
                    // 数组插入项
                    var inserted;
                    switch (method) {
                        case "push":
                        case "unshift":
                            inserted = args;
                            break;
                        case "splice":
                            inserted = args.slice(2);
                            break;
                    }
                    // 监视数组插入项，而不是重新监视整个数组
                    if (inserted && inserted.length) {
                        Mutator.mutateArray(inserted, dep);
                    }
                    // 触发更新
                    dep.notify({ method: args });
                    // 返回值
                    return result;
                }
            });
        });
        // 提供替换数组设置的方法，因为直接设置数组下标的方式无法变异
        Object.defineProperty(result, "$set", {
            value: function (index, value) {
                // 超出数组长度默认追加到最后
                if (index >= this.length)
                    index = this.length;
                return this.splice(index, 1, value)[0];
            }
        });
        // 提供替换数组移除的方法，因为直接移除的方式无法变异
        Object.defineProperty(result, "$remove", {
            value: function (item) {
                var index = this.indexOf(item);
                if (index > -1)
                    return this.splice(index, 1);
                return null;
            }
        });
        return result;
    };
    return Mutator;
}());
// 记录数组中会造成数据更新的所有方法名
Mutator._arrMethods = [
    "push",
    "pop",
    "unshift",
    "shift",
    "splice",
    "sort",
    "reverse"
];
exports.Mutator = Mutator;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by Raykid on 2016/12/16.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Mutator_1 = __webpack_require__(3);
var Watcher_1 = __webpack_require__(1);
/**
 * 将数据模型和视图进行绑定
 * @param model 数据模型
 * @param compiler 视图解析器，不同类型的视图需要使用不同的解析器解析后方可使用
 * @param options 一些额外参数
 * @returns {core.AresEntity} 绑定实体对象
 */
function bind(data, compiler, options) {
    return new Ares(data, compiler, options);
}
exports.bind = bind;
var Ares = (function () {
    function Ares(data, compiler, options) {
        // 记录变异对象
        this._data = Mutator_1.Mutator.mutate(data);
        this._compiler = compiler;
        this._options = options;
        // 初始化Compiler
        this._compiler.init(this);
        // 调用回调
        if (this._options && this._options.inited) {
            this._options.inited.call(this._data, this);
        }
    }
    Object.defineProperty(Ares.prototype, "data", {
        /** 获取ViewModel */
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ares.prototype, "compiler", {
        /** 获取编译器 */
        get: function () {
            return this._compiler;
        },
        enumerable: true,
        configurable: true
    });
    Ares.prototype.createWatcher = function (target, exp, scope, callback) {
        return new Watcher_1.Watcher(this, target, exp, scope, callback);
    };
    return Ares;
}());
exports.Ares = Ares;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by Raykid on 2016/12/22.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Dep = (function () {
    function Dep() {
        this._map = {};
    }
    /**
     * 添加数据变更订阅者
     * @param watcher 数据变更订阅者
     */
    Dep.prototype.watch = function (watcher) {
        if (!this._map[watcher.uid]) {
            this._map[watcher.uid] = watcher;
        }
    };
    /**
     * 数据变更，通知所有订阅者
     * @param extra 可能的额外数据
     */
    Dep.prototype.notify = function (extra) {
        for (var uid in this._map) {
            var watcher = this._map[uid];
            watcher.update(extra);
        }
    };
    return Dep;
}());
exports.Dep = Dep;


/***/ })
/******/ ]);
});