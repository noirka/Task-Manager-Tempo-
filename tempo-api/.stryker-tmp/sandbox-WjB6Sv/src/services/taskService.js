// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const TaskRepository = require('../repositories/taskRepository');
const TaskService = stryMutAct_9fa48("96") ? {} : (stryCov_9fa48("96"), {
  getAllTasks: stryMutAct_9fa48("97") ? () => undefined : (stryCov_9fa48("97"), async filter => TaskRepository.findAll(filter)),
  getTaskById: async id => {
    if (stryMutAct_9fa48("98")) {
      {}
    } else {
      stryCov_9fa48("98");
      const task = await TaskRepository.findById(id);
      if (stryMutAct_9fa48("101") ? false : stryMutAct_9fa48("100") ? true : stryMutAct_9fa48("99") ? task : (stryCov_9fa48("99", "100", "101"), !task)) {
        if (stryMutAct_9fa48("102")) {
          {}
        } else {
          stryCov_9fa48("102");
          throw new Error(stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), 'Task not found'));
        }
      }
      return task;
    }
  },
  createTask: async data => {
    if (stryMutAct_9fa48("104")) {
      {}
    } else {
      stryCov_9fa48("104");
      if (stryMutAct_9fa48("107") ? false : stryMutAct_9fa48("106") ? true : stryMutAct_9fa48("105") ? data.title : (stryCov_9fa48("105", "106", "107"), !data.title)) {
        if (stryMutAct_9fa48("108")) {
          {}
        } else {
          stryCov_9fa48("108");
          throw new Error(stryMutAct_9fa48("109") ? "" : (stryCov_9fa48("109"), 'Task title is required'));
        }
      }
      return TaskRepository.create(data);
    }
  },
  updateTask: async (id, data) => {
    if (stryMutAct_9fa48("110")) {
      {}
    } else {
      stryCov_9fa48("110");
      const task = await TaskRepository.findById(id);
      if (stryMutAct_9fa48("113") ? false : stryMutAct_9fa48("112") ? true : stryMutAct_9fa48("111") ? task : (stryCov_9fa48("111", "112", "113"), !task)) {
        if (stryMutAct_9fa48("114")) {
          {}
        } else {
          stryCov_9fa48("114");
          throw new Error(stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), 'Task not found'));
        }
      }
      const updatedData = stryMutAct_9fa48("116") ? {} : (stryCov_9fa48("116"), {
        ...data
      });
      delete updatedData.createdAt;
      return TaskRepository.update(id, updatedData);
    }
  },
  markTaskComplete: async id => {
    if (stryMutAct_9fa48("117")) {
      {}
    } else {
      stryCov_9fa48("117");
      const task = await TaskRepository.findById(id);
      if (stryMutAct_9fa48("120") ? false : stryMutAct_9fa48("119") ? true : stryMutAct_9fa48("118") ? task : (stryCov_9fa48("118", "119", "120"), !task)) {
        if (stryMutAct_9fa48("121")) {
          {}
        } else {
          stryCov_9fa48("121");
          throw new Error(stryMutAct_9fa48("122") ? "" : (stryCov_9fa48("122"), 'Task not found'));
        }
      }
      if (stryMutAct_9fa48("124") ? false : stryMutAct_9fa48("123") ? true : (stryCov_9fa48("123", "124"), task.isCompleted)) {
        if (stryMutAct_9fa48("125")) {
          {}
        } else {
          stryCov_9fa48("125");
          throw new Error(stryMutAct_9fa48("126") ? "" : (stryCov_9fa48("126"), 'Task is already completed'));
        }
      }
      return TaskRepository.update(id, stryMutAct_9fa48("127") ? {} : (stryCov_9fa48("127"), {
        isCompleted: stryMutAct_9fa48("128") ? false : (stryCov_9fa48("128"), true)
      }));
    }
  }
});
module.exports = TaskService;