const Octokit = require('@octokit/rest')
  .plugin(require('@octokit/plugin-throttling'));
import {GITHUB_TOKEN} from './constants';

export const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  throttle: {
    onRateLimit: (retryAfter, options) => {
      octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);

      if (options.request.retryCount === 0) { // only retries once
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      // does not retry, only logs a warning
      octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`)
    }
  }});

export const fetchMember= async (login) => {
  return await octokit.paginate(octokit.orgs.listMembers.endpoint({org: login}));
};


export const fetchMemberRepositories= async (member) => {
  return await octokit.paginate(octokit.repos.listForUser.endpoint({username: member}));
};

export const fetchOrganizationRepositories= async (org) => {
  return await octokit.paginate(octokit.repos.listForOrg.endpoint({org}));
};


export const fetchRepoLanguages = async (repo) => {
  return octokit.repos.listLanguages({owner: repo.owner.login, repo: repo.name}).then((result) =>{
    let languages = [];
    for (let key in result.data) {
      languages.push({name: key, line_of_code: result.data[key]})
    }
    return languages;
  });
};

export const fetchOrganization = (login) => {
  return octokit.orgs.get({org: login}).then((result) => result.data)
};
