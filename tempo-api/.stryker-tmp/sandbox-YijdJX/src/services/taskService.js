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
const TaskService = stryMutAct_9fa48("107") ? {} : (stryCov_9fa48("107"), {
  getAllTasks: stryMutAct_9fa48("108") ? () => undefined : (stryCov_9fa48("108"), async filter => TaskRepository.findAll(filter)),
  getTaskById: async id => {
    if (stryMutAct_9fa48("109")) {
      {}
    } else {
      stryCov_9fa48("109");
      const task = await TaskRepository.findById(id);
      if (stryMutAct_9fa48("112") ? false : stryMutAct_9fa48("111") ? true : stryMutAct_9fa48("110") ? task : (stryCov_9fa48("110", "111", "112"), !task)) {
        if (stryMutAct_9fa48("113")) {
          {}
        } else {
          stryCov_9fa48("113");
          throw new Error(stryMutAct_9fa48("114") ? "" : (stryCov_9fa48("114"), 'Task not found'));
        }
      }
      return task;
    }
  },
  createTask: async data => {
    if (stryMutAct_9fa48("115")) {
      {}
    } else {
      stryCov_9fa48("115");
      if (stryMutAct_9fa48("118") ? false : stryMutAct_9fa48("117") ? true : stryMutAct_9fa48("116") ? data.title : (stryCov_9fa48("116", "117", "118"), !data.title)) {
        if (stryMutAct_9fa48("119")) {
          {}
        } else {
          stryCov_9fa48("119");
          throw new Error(stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), 'Task title is required'));
        }
      }
      return TaskRepository.create(data);
    }
  },
  updateTask: async (id, data) => {
    if (stryMutAct_9fa48("121")) {
      {}
    } else {
      stryCov_9fa48("121");
      const task = await TaskRepository.findById(id);
      if (stryMutAct_9fa48("124") ? false : stryMutAct_9fa48("123") ? true : stryMutAct_9fa48("122") ? task : (stryCov_9fa48("122", "123", "124"), !task)) {
        if (stryMutAct_9fa48("125")) {
          {}
        } else {
          stryCov_9fa48("125");
          throw new Error(stryMutAct_9fa48("126") ? "" : (stryCov_9fa48("126"), 'Task not found'));
        }
      }
      const updatedData = stryMutAct_9fa48("127") ? {} : (stryCov_9fa48("127"), {
        ...data
      });
      delete updatedData.createdAt;
      return TaskRepository.update(id, updatedData);
    }
  },
  markTaskComplete: async id => {
    if (stryMutAct_9fa48("128")) {
      {}
    } else {
      stryCov_9fa48("128");
      const task = await TaskRepository.findById(id);
      if (stryMutAct_9fa48("131") ? false : stryMutAct_9fa48("130") ? true : stryMutAct_9fa48("129") ? task : (stryCov_9fa48("129", "130", "131"), !task)) {
        if (stryMutAct_9fa48("132")) {
          {}
        } else {
          stryCov_9fa48("132");
          throw new Error(stryMutAct_9fa48("133") ? "" : (stryCov_9fa48("133"), 'Task not found'));
        }
      }
      if (stryMutAct_9fa48("135") ? false : stryMutAct_9fa48("134") ? true : (stryCov_9fa48("134", "135"), task.isCompleted)) {
        if (stryMutAct_9fa48("136")) {
          {}
        } else {
          stryCov_9fa48("136");
          throw new Error(stryMutAct_9fa48("137") ? "" : (stryCov_9fa48("137"), 'Task is already completed'));
        }
      }
      return TaskRepository.update(id, stryMutAct_9fa48("138") ? {} : (stryCov_9fa48("138"), {
        isCompleted: stryMutAct_9fa48("139") ? false : (stryCov_9fa48("139"), true)
      }));
    }
  }
});
module.exports = TaskService;