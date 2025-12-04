/* eslint-disable consistent-return */
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
  MongoClient
} = require('mongodb');
const uri = stryMutAct_9fa48("11") ? process.env.MONGO_URI && 'mongodb://localhost:27017' : stryMutAct_9fa48("10") ? false : stryMutAct_9fa48("9") ? true : (stryCov_9fa48("9", "10", "11"), process.env.MONGO_URI || (stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), 'mongodb://localhost:27017')));
const client = new MongoClient(uri);
let db;
async function connectDB() {
  if (stryMutAct_9fa48("13")) {
    {}
  } else {
    stryCov_9fa48("13");
    try {
      if (stryMutAct_9fa48("14")) {
        {}
      } else {
        stryCov_9fa48("14");
        await client.connect();
        db = client.db(stryMutAct_9fa48("15") ? "" : (stryCov_9fa48("15"), 'tempoDB'));
        // eslint-disable-next-line no-console
        console.log(stryMutAct_9fa48("16") ? "" : (stryCov_9fa48("16"), 'Successfully connected to MongoDB.'));
        return db;
      }
    } catch (error) {
      if (stryMutAct_9fa48("17")) {
        {}
      } else {
        stryCov_9fa48("17");
        // eslint-disable-next-line no-console
        console.error(stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), 'Failed to connect to MongoDB:'), error);
        if (stryMutAct_9fa48("21") ? process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'development' : stryMutAct_9fa48("20") ? false : stryMutAct_9fa48("19") ? true : (stryCov_9fa48("19", "20", "21"), (stryMutAct_9fa48("23") ? process.env.NODE_ENV === 'test' : stryMutAct_9fa48("22") ? true : (stryCov_9fa48("22", "23"), process.env.NODE_ENV !== (stryMutAct_9fa48("24") ? "" : (stryCov_9fa48("24"), 'test')))) && (stryMutAct_9fa48("26") ? process.env.NODE_ENV === 'development' : stryMutAct_9fa48("25") ? true : (stryCov_9fa48("25", "26"), process.env.NODE_ENV !== (stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), 'development')))))) {
          if (stryMutAct_9fa48("28")) {
            {}
          } else {
            stryCov_9fa48("28");
            process.exit(1);
          }
        } else {
          if (stryMutAct_9fa48("29")) {
            {}
          } else {
            stryCov_9fa48("29");
            throw error;
          }
        }
      }
    }
  }
}
function getDB() {
  if (stryMutAct_9fa48("30")) {
    {}
  } else {
    stryCov_9fa48("30");
    if (stryMutAct_9fa48("33") ? false : stryMutAct_9fa48("32") ? true : stryMutAct_9fa48("31") ? db : (stryCov_9fa48("31", "32", "33"), !db)) {
      if (stryMutAct_9fa48("34")) {
        {}
      } else {
        stryCov_9fa48("34");
        throw new Error(stryMutAct_9fa48("35") ? "" : (stryCov_9fa48("35"), 'Database not initialized. Call connectDB first.'));
      }
    }
    return db;
  }
}
module.exports = stryMutAct_9fa48("36") ? {} : (stryCov_9fa48("36"), {
  connectDB,
  getDB
});