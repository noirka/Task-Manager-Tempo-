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
const TaskService = require('../services/taskService');
const TaskController = stryMutAct_9fa48("37") ? {} : (stryCov_9fa48("37"), {
  async getTasks(req, res) {
    if (stryMutAct_9fa48("38")) {
      {}
    } else {
      stryCov_9fa48("38");
      try {
        if (stryMutAct_9fa48("39")) {
          {}
        } else {
          stryCov_9fa48("39");
          const isCompleted = req.query.completed ? stryMutAct_9fa48("42") ? req.query.completed !== 'true' : stryMutAct_9fa48("41") ? false : stryMutAct_9fa48("40") ? true : (stryCov_9fa48("40", "41", "42"), req.query.completed === (stryMutAct_9fa48("43") ? "" : (stryCov_9fa48("43"), 'true'))) : undefined;
          const tasks = await TaskService.getAllTasks(stryMutAct_9fa48("44") ? {} : (stryCov_9fa48("44"), {
            isCompleted
          }));
          return res.status(200).json(tasks);
        }
      } catch (error) {
        if (stryMutAct_9fa48("45")) {
          {}
        } else {
          stryCov_9fa48("45");
          return res.status(500).json(stryMutAct_9fa48("46") ? {} : (stryCov_9fa48("46"), {
            message: stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), 'Internal server error'),
            error: error.message
          }));
        }
      }
    }
  },
  async createTask(req, res) {
    if (stryMutAct_9fa48("48")) {
      {}
    } else {
      stryCov_9fa48("48");
      try {
        if (stryMutAct_9fa48("49")) {
          {}
        } else {
          stryCov_9fa48("49");
          if (stryMutAct_9fa48("52") ? false : stryMutAct_9fa48("51") ? true : stryMutAct_9fa48("50") ? req.body.title : (stryCov_9fa48("50", "51", "52"), !req.body.title)) {
            if (stryMutAct_9fa48("53")) {
              {}
            } else {
              stryCov_9fa48("53");
              return res.status(400).json(stryMutAct_9fa48("54") ? {} : (stryCov_9fa48("54"), {
                message: stryMutAct_9fa48("55") ? "" : (stryCov_9fa48("55"), 'Title is required for a new task.')
              }));
            }
          }
          const newTask = await TaskService.createTask(req.body);
          return res.status(201).json(newTask);
        }
      } catch (error) {
        if (stryMutAct_9fa48("56")) {
          {}
        } else {
          stryCov_9fa48("56");
          return res.status(400).json(stryMutAct_9fa48("57") ? {} : (stryCov_9fa48("57"), {
            message: error.message
          }));
        }
      }
    }
  },
  async completeTask(req, res) {
    if (stryMutAct_9fa48("58")) {
      {}
    } else {
      stryCov_9fa48("58");
      try {
        if (stryMutAct_9fa48("59")) {
          {}
        } else {
          stryCov_9fa48("59");
          const {
            id
          } = req.params;
          const updatedTask = await TaskService.markTaskComplete(id);
          return res.status(200).json(updatedTask);
        }
      } catch (error) {
        if (stryMutAct_9fa48("60")) {
          {}
        } else {
          stryCov_9fa48("60");
          const status = error.message.includes(stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), 'not found')) ? 404 : 400;
          return res.status(status).json(stryMutAct_9fa48("62") ? {} : (stryCov_9fa48("62"), {
            message: error.message
          }));
        }
      }
    }
  }
});
module.exports = TaskController;