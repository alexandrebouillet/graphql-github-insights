'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _constants = require('./constants');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _request = require('./request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use((0, _cors2.default)(corsOptions));
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

app.use(_bodyParser2.default.json());
app.use((0, _expressGraphql2.default)(function (req) {

  var memberLoader = new _dataloader2.default(function (keys) {
    return Promise.all(keys.map(_request.fetchMember));
  });

  var membersRepoLoader = new _dataloader2.default(function (keys) {
    return Promise.all(keys.map(_request.fetchMemberRepositories));
  });

  var organizationRepoLoader = new _dataloader2.default(function (keys) {
    return Promise.all(keys.map(_request.fetchOrganizationRepositories));
  });

  var repositoryLanguageLoader = new _dataloader2.default(function (keys) {
    return Promise.all(keys.map(_request.fetchRepoLanguages));
  });

  var organizationLoader = new _dataloader2.default(function (keys) {
    return Promise.all(keys.map(_request.fetchOrganization));
  });

  return {
    graphiql: true,
    schema: _schema2.default,
    pretty: true,
    context: {
      memberLoader: memberLoader,
      membersRepoLoader: membersRepoLoader,
      organizationRepoLoader: organizationRepoLoader,
      repositoryLanguageLoader: repositoryLanguageLoader,
      organizationLoader: organizationLoader
    }
  };
}));

try {
  app.listen(_constants.APP_PORT, function () {
    return console.log('GraphQL server running at http://localhost:' + _constants.APP_PORT);
  });
} catch (error) {
  console.log('Something went wrong ' + error);
}