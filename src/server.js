import "@babel/polyfill";
import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import cors from 'cors';
import {APP_PORT} from './constants';
import schema from './schema';
import DataLoader from 'dataloader';
import {
  fetchMember,
  fetchMemberRepositories,
  fetchOrganization,
  fetchOrganizationRepositories,
  fetchRepoLanguages,
} from './request';


const app = express();
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
  extended: true,
}));




app.use(bodyParser.json());
app.use(graphqlHTTP(req => {

  const memberLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchMember)));

  const membersRepoLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchMemberRepositories)));

  const organizationRepoLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchOrganizationRepositories)));


  const repositoryLanguageLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchRepoLanguages)));

  const organizationLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchOrganization)));


  return {
    graphiql: true,
    schema,
    pretty: true,
    context: {
      memberLoader,
      membersRepoLoader,
      organizationRepoLoader,
      repositoryLanguageLoader,
      organizationLoader
    },
  };

}));

try {
  app.listen(APP_PORT, () => console.log(`GraphQL server running at http://localhost:${APP_PORT}`));
} catch (error) {
  console.log(`Something went wrong ${error}`);
}
