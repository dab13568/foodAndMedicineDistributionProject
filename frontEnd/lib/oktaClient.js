const okta = require("@okta/okta-sdk-nodejs");

const client = new okta.Client({
  orgUrl: "https://dev-38830019.okta.com",
  token: "0oa1itjywxlzZOifH5d7"
});

module.exports = client;
