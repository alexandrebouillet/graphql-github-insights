'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _request = require('./request');

var OrganizationType = new _graphql.GraphQLObjectType({
  name: 'Organization',
  description: 'A GitHub Organization',
  fields: function fields() {
    return {
      login: {
        type: _graphql.GraphQLString,
        description: 'A organization\'s  login',
        resolve: function resolve(org) {
          return org.login;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'A organization\'s gender',
        resolve: function resolve(org) {
          return org.name;
        }
      },
      description: {
        type: _graphql.GraphQLString,
        description: 'A organization\'s description',
        resolve: function resolve(org) {
          return org.description;
        }
      },
      blog: {
        type: _graphql.GraphQLString,
        description: 'A organization\'s blog',
        resolve: function resolve(org) {
          return org.blog;
        }
      },
      email: {
        type: _graphql.GraphQLString,
        description: 'A organization\'s email',
        resolve: function resolve(org) {
          return org.email;
        }
      },
      public_repos: {
        type: _graphql.GraphQLString,
        description: 'Number of public repos',
        resolve: function resolve(org) {
          return org.public_repos;
        }
      },
      avatar_url: {
        type: _graphql.GraphQLString,
        description: 'A organization\'s avatar url',
        resolve: function resolve(org) {
          return org.avatar_url;
        }
      },
      members: {
        type: (0, _graphql.GraphQLList)(MemberType),
        description: 'A list<Array> of members that a organization have',
        resolve: function resolve(root, args, context) {
          return context.memberLoader.load(root.login);
        }
      },
      repos: {
        type: (0, _graphql.GraphQLList)(RepoType),
        description: 'A list<Array> of repos that a organization have',
        resolve: function resolve(root, args, context) {
          return context.organizationRepoLoader.load(root.login);
        }
      }
    };
  }
});

var MemberType = new _graphql.GraphQLObjectType({
  name: 'Member',
  description: 'A GitHub member',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLString,
        description: 'A organization\'s id',
        resolve: function resolve(member) {
          return member.id;
        }
      },
      login: {
        type: _graphql.GraphQLString,
        description: 'A member\'s  login',
        resolve: function resolve(member) {
          return member.login;
        }
      },
      avatar_url: {
        type: _graphql.GraphQLString,
        description: 'A member\'s avatar url',
        resolve: function resolve(member) {
          return member.avatar_url;
        }
      },
      url: {
        type: _graphql.GraphQLString,
        description: 'A member\'s url',
        resolve: function resolve(member) {
          return member.url;
        }
      },
      repos: {
        type: (0, _graphql.GraphQLList)(RepoType),
        description: 'A member\'s repos',
        resolve: function resolve(member, args, context) {
          return context.membersRepoLoader.load(member.login);
        }
      }
    };
  }
});

var RepoType = new _graphql.GraphQLObjectType({
  name: 'Repo',
  description: 'A GitHub repo',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLString,
        description: 'Repo id',
        resolve: function resolve(repo) {
          return repo.id;
        }
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'Repo name',
        resolve: function resolve(repo) {
          return repo.name;
        }
      },
      html_url: {
        type: _graphql.GraphQLString,
        description: 'Repo url',
        resolve: function resolve(repo) {
          return repo.html_url;
        }
      },
      description: {
        type: _graphql.GraphQLString,
        description: 'Repo description',
        resolve: function resolve(repo) {
          return repo.description;
        }
      },
      languages: {
        type: (0, _graphql.GraphQLList)(LanguageType),
        description: 'Repo languages',
        resolve: function resolve(repo, args, context) {
          return context.repositoryLanguageLoader.load(repo);
        }
      },
      stars: {
        type: _graphql.GraphQLString,
        description: 'Repo star',
        resolve: function resolve(repo) {
          return repo.stargazers_count;
        }
      },
      forks: {
        type: _graphql.GraphQLString,
        description: 'Repo fork',
        resolve: function resolve(repo) {
          return repo.forks;
        }
      },
      created_at: {
        type: _graphql.GraphQLString,
        description: 'Repo creation date',
        resolve: function resolve(repo) {
          return repo.created_at;
        }
      }
    };
  }
});

var LanguageType = new _graphql.GraphQLObjectType({
  name: 'Language',
  description: 'Language',
  fields: function fields() {
    return {
      name: {
        type: _graphql.GraphQLString,
        description: 'Language name',
        resolve: function resolve(language) {
          return language.name;
        }
      },
      line_of_code: {
        type: _graphql.GraphQLString,
        description: 'Number lines of code',
        resolve: function resolve(language) {
          return language.line_of_code;
        }
      }
    };
  }
});

var QueryType = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'Root query of all',
  fields: function fields() {
    return {
      Organization: {
        type: OrganizationType,
        description: 'Fetch Github Organization info',
        args: {
          login: {
            type: _graphql.GraphQLString
          }
        },
        resolve: function resolve(root, _ref, context) {
          var login = _ref.login;
          return context.organizationLoader.load(login);
        }
      }
    };
  }
});

exports.default = new _graphql.GraphQLSchema({
  query: QueryType
});