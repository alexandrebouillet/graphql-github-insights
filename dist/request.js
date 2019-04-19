'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchOrganization = exports.fetchRepoLanguages = exports.fetchOrganizationRepositories = exports.fetchMemberRepositories = exports.fetchMember = exports.octokit = undefined;

var _rest = require('@octokit/rest');

var _rest2 = _interopRequireDefault(_rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var octokit = exports.octokit = new _rest2.default({ auth: {
    username: 'alexandrebouillet',
    password: 'c3ab5a1b7937'
  } });

var fetchMember = exports.fetchMember = function fetchMember(login) {
  return octokit.orgs.listMembers({ org: login, filter: "all", role: "all", per_page: 10, page: 1 }).then(function (result) {
    return result.data;
  });
};

var fetchMemberRepositories = exports.fetchMemberRepositories = function fetchMemberRepositories(member) {

  return octokit.repos.listForUser({ username: member, type: 'owner', per_page: 10, page: 1 }).then(function (result) {
    return result.data;
  });
};

var fetchOrganizationRepositories = exports.fetchOrganizationRepositories = function fetchOrganizationRepositories(org) {
  return octokit.repos.listForOrg({ org: org, per_page: 10, page: 1 }).then(function (result) {
    return result.data;
  });
};

var fetchRepoLanguages = exports.fetchRepoLanguages = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(repo) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', octokit.repos.listLanguages({ owner: repo.owner.login, repo: repo.name }).then(function (result) {
              var languages = [];
              for (var key in result.data) {
                languages.push({ name: key, line_of_code: result.data[key] });
              }
              return languages;
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchRepoLanguages(_x) {
    return _ref.apply(this, arguments);
  };
}();

var fetchOrganization = exports.fetchOrganization = function fetchOrganization(login) {
  return octokit.orgs.get({ org: login }).then(function (result) {
    return result.data;
  });
};