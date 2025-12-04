/* eslint-disable no-underscore-dangle */
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
const {
  ObjectId
} = require('mongodb');
const {
  getDB
} = require('../config/db');
const TaskRepository = stryMutAct_9fa48("58") ? {} : (stryCov_9fa48("58"), {
  findAll: async (filter = {}) => {
    if (stryMutAct_9fa48("59")) {
      {}
    } else {
      stryCov_9fa48("59");
      const db = getDB();
      const collection = db.collection(stryMutAct_9fa48("60") ? "" : (stryCov_9fa48("60"), 'tasks'));
      const query = {};
      if (stryMutAct_9fa48("63") ? filter.isCompleted === undefined : stryMutAct_9fa48("62") ? false : stryMutAct_9fa48("61") ? true : (stryCov_9fa48("61", "62", "63"), filter.isCompleted !== undefined)) {
        if (stryMutAct_9fa48("64")) {
          {}
        } else {
          stryCov_9fa48("64");
          query.isCompleted = filter.isCompleted;
        }
      }
      return collection.find(query).toArray();
    }
  },
  findById: async id => {
    if (stryMutAct_9fa48("65")) {
      {}
    } else {
      stryCov_9fa48("65");
      const db = getDB();
      const collection = db.collection(stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), 'tasks'));
      try {
        if (stryMutAct_9fa48("67")) {
          {}
        } else {
          stryCov_9fa48("67");
          return collection.findOne(stryMutAct_9fa48("68") ? {} : (stryCov_9fa48("68"), {
            _id: new ObjectId(id)
          }));
        }
      } catch (e) {
        if (stryMutAct_9fa48("69")) {
          {}
        } else {
          stryCov_9fa48("69");
          return null;
        }
      }
    }
  },
  create: async taskData => {
    if (stryMutAct_9fa48("70")) {
      {}
    } else {
      stryCov_9fa48("70");
      const db = getDB();
      const collection = db.collection(stryMutAct_9fa48("71") ? "" : (stryCov_9fa48("71"), 'tasks'));
      const newTask = stryMutAct_9fa48("72") ? {} : (stryCov_9fa48("72"), {
        title: taskData.title,
        description: stryMutAct_9fa48("75") ? taskData.description && null : stryMutAct_9fa48("74") ? false : stryMutAct_9fa48("73") ? true : (stryCov_9fa48("73", "74", "75"), taskData.description || null),
        isCompleted: stryMutAct_9fa48("76") ? true : (stryCov_9fa48("76"), false),
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      const result = await collection.insertOne(newTask);
      return stryMutAct_9fa48("77") ? {} : (stryCov_9fa48("77"), {
        ...newTask,
        _id: result.insertedId
      });
    }
  },
  update: async (id, updateData) => {
    if (stryMutAct_9fa48("78")) {
      {}
    } else {
      stryCov_9fa48("78");
      const db = getDB();
      const collection = db.collection(stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), 'tasks'));
      const updatedFields = stryMutAct_9fa48("80") ? {} : (stryCov_9fa48("80"), {
        ...updateData,
        updatedAt: new Date()
      });
      delete updatedFields._id;
      const result = await collection.updateOne(stryMutAct_9fa48("81") ? {} : (stryCov_9fa48("81"), {
        _id: new ObjectId(id)
      }), stryMutAct_9fa48("82") ? {} : (stryCov_9fa48("82"), {
        $set: updatedFields
      }));
      if (stryMutAct_9fa48("85") ? result.matchedCount !== 0 : stryMutAct_9fa48("84") ? false : stryMutAct_9fa48("83") ? true : (stryCov_9fa48("83", "84", "85"), result.matchedCount === 0)) return null;
      return TaskRepository.findById(id);
    }
  },
  delete: async id => {
    if (stryMutAct_9fa48("86")) {
      {}
    } else {
      stryCov_9fa48("86");
      const db = getDB();
      const collection = db.collection(stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), 'tasks'));
      const result = await collection.deleteOne(stryMutAct_9fa48("88") ? {} : (stryCov_9fa48("88"), {
        _id: new ObjectId(id)
      }));
      return stryMutAct_9fa48("92") ? result.deletedCount <= 0 : stryMutAct_9fa48("91") ? result.deletedCount >= 0 : stryMutAct_9fa48("90") ? false : stryMutAct_9fa48("89") ? true : (stryCov_9fa48("89", "90", "91", "92"), result.deletedCount > 0);
    }
  }
});
module.exports = TaskRepository;