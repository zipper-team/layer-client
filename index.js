const api = require("./api");

module.exports = {
  createClientWithCredentials: async ({ username, password }, opts = {url}) => {
    const client = api.createClient({
      url: opts.url
    });
    const res = await client.chain.query
      .auth0SignIn({
        username,
        password,
      })
      .get(true);
    const authorization = `Bearer ${res.access_token}`;
    return api.createClient({
      url: opts.url,
      headers: { authorization },
    });
  },
  ...api,
};
