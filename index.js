const express = require('express');
const bodyParser = require('body-parser');
const request = require('superagent');

const { jiraStatuses } = require('./constants');

const app = express();
const PORT = process.env.PORT || 8080;
const JIRA_URL = process.env.JIRA_URL;
const MATTERMOST_URL = process.env.MATTERMOST_URL;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('JIRA Mattermost Bridge - You got it right');
});

app.post('/hooks/:hookid', (req, res) => {
  const hookId = req.params.hookid;
  const webevent = req.body.webhookEvent;

  const displayName = req.body.user.displayName;
  const issueID = req.body.issue.key;
  const issueUrl = `${JIRA_URL}/browse/${issueID}`;
  const summary = req.body.issue.fields.summary;

  const changedItems = req.body.changelog.items;

  let content;

  switch (webevent) {
    case jiraStatuses.ISSUE_UPDATED:
      content = `${displayName} updated [${issueID}](${issueUrl}): ${summary}`;
      break;
    case jiraStatuses.ISSUE_CREATED:
      content = `${displayName} created [${issueID}](${issueUrl}): ${summary}`;
      break;
    case jiraStatuses.ISSUE_DELETED:
      content = `${displayName} created [${issueID}](${issueUrl}): ${summary}`;
      break;
    default:
      break;
  }

  const changesHeader = `\n| Field | Previous Value | New Value |\n|:-----|:-----|:-----|\n`;
  const changes = changedItems.map(change => `|${change.field}|${change.fromString}|${change.toString}|`);

  request
    .post(`${MATTERMOST_URL}/hooks/${hookId}`)
    .send({ text: `${content} ${changesHeader} ${changes}`, username: 'JIRA' })
    .end(() => res.send(content + changesHeader + changes));

  res.send('OK');
});

const listen = app.listen(PORT);
console.log(`Application started on port: ${listen.address().port}`);
