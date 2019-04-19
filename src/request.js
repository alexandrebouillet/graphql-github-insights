import Octokit from '@octokit/rest';

export const octokit = new Octokit();

export const fetchMember= (login) => {
  return octokit.orgs.listMembers({org: login, filter: "all", role: "all", per_page: 10, page: 1}).then((result) => result.data);
};


export const fetchMemberRepositories= (member) => {

  return octokit.repos.listForUser({username: member, type: 'owner', per_page: 10, page: 1}).then((result)=>result.data);
};

export const fetchOrganizationRepositories= (org) => {
  return octokit.repos.listForOrg({org: org, per_page: 10, page:1}).then((result) => result.data);
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
