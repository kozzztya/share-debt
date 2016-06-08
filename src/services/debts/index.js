const Service = require('../base-service');
const calcDebtTotal = require('../../hooks/calc-debt-totals');
const pay = require('./routes/pay');
const auth = require('feathers-authentication').hooks;

module.exports = function () {
  const app = this;

  app.service('/debts/pay', { create: pay })
    .before({
      // all: [auth.verifyToken(), auth.populateUser(), auth.restrictToAuthenticated()]
    });
  
  app.service('/debts', new Service({ Model: require('./model') }))
    .after({ create: calcDebtTotal() });

};
