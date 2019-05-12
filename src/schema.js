import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql';

const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  description: 'A GitHub Organization',
  fields: () => ({
    login: {
      type: GraphQLString,
      description: 'A organization\'s  login',
      resolve: (org) => org.login
    },
    name: {
      type: GraphQLString,
      description: 'A organization\'s gender',
      resolve: (org) => org.name
    },
    description: {
      type: GraphQLString,
      description: 'A organization\'s description',
      resolve: (org) => org.description
    },
    blog: {
      type: GraphQLString,
      description: 'A organization\'s blog',
      resolve: (org) => org.blog
    },
    email: {
      type: GraphQLString,
      description: 'A organization\'s email',
      resolve: (org) => org.email
    },
    public_repos: {
      type: GraphQLString,
      description: 'Number of public repos',
      resolve: (org) => org.public_repos
    },
    avatar_url: {
      type: GraphQLString,
      description: 'A organization\'s avatar url',
      resolve: (org) => org.avatar_url
    },
    members: {
      type: GraphQLList(MemberType),
      description: 'A list<Array> of members that a organization have',
      resolve: (root, args, context) => {
        return context.memberLoader.load(root.login)
      }
    },
    repos: {
      type: GraphQLList(RepoType),
      description: 'A list<Array> of repos that a organization have',
      resolve: (root, args, context) => {
        return context.organizationRepoLoader.load(root.login)
      }
    },
  })
});

const MemberType = new GraphQLObjectType({
  name: 'Member',
  description: 'A GitHub member',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'A organization\'s id',
      resolve: (member) => member.id
    },
    login: {
      type: GraphQLString,
      description: 'A member\'s  login',
      resolve: (member) => member.login
    },
    avatar_url: {
      type: GraphQLString,
      description: 'A member\'s avatar url',
      resolve: (member) => member.avatar_url
    },
    url: {
      type: GraphQLString,
      description: 'A member\'s url',
      resolve: (member) => member.url
    },
    repos: {
      type: GraphQLList(RepoType),
      description: 'A member\'s repos',
      resolve: (member, args, context) => context.membersRepoLoader.load(member.login)
    },
  })
});

const RepoType = new GraphQLObjectType({
  name: 'Repo',
  description: 'A GitHub repo',
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'Repo id',
      resolve: (repo) => repo.id
    },
    name: {
      type: GraphQLString,
      description: 'Repo name',
      resolve: (repo) => repo.name
    },
    html_url: {
      type: GraphQLString,
      description: 'Repo url',
      resolve: (repo) => repo.html_url
    },
    description: {
      type: GraphQLString,
      description: 'Repo description',
      resolve: (repo) => repo.description
    },
    languages: {
      type: GraphQLList(LanguageType),
      description: 'Repo languages',
      resolve: (repo, args, context) => context.repositoryLanguageLoader.load(repo)
    },
    stars: {
      type: GraphQLString,
      description: 'Repo star',
      resolve: (repo) => repo.stargazers_count
    },
    forks: {
      type: GraphQLString,
      description: 'Repo fork',
      resolve: (repo) => repo.forks
    },
    created_at: {
      type: GraphQLString,
      description: 'Repo creation date',
      resolve: (repo) => repo.created_at
    },
  })
});




const LanguageType = new GraphQLObjectType({
  name: 'Language',
  description: 'Language',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'Language name',
      resolve: (language) => language.name
    },
    line_of_code: {
      type: GraphQLString,
      description: 'Number lines of code',
      resolve: (language) => language.line_of_code
    },
  })
});


const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query of all',
  fields: () => ({
    Organization: {
      type: OrganizationType,
      description: 'Fetch Github Organization info',
      args: {
        login: {
          type: GraphQLString
        }
      },
      resolve: (root, {login} , context) => context.organizationLoader.load(login)
    },
  })
});

export default new GraphQLSchema({
  query: QueryType
});
