# jira-mattermost-bridge

Bridge app for translating JIRA webhooks to Mattermost format.

## Configuration

Set the following environment variables to provide the Mattermost and JIRA server details:
* PORT - Port on which the bridge will listen. Default: 8080
* MATTERMOST_URL - URL where your Mattermost instance is deployed, it has to contain protocol. Example: https://mattermost.my-domain.com
* JIRA_URL - URL to JIRA. Example: https://my-company.atlassian.net

## Integration
* Install the required modules by running `npm install`
* Start the app by running `npm start`
* Configure Mattermost server and create a new [incoming webhooks](https://github.com/mattermost/platform/blob/master/doc/integrations/webhooks/Incoming-Webhooks.md) and note the hook-id (the part that appears after `hooks` in the hook URL.
* Configure [JIRA Webhooks](https://developer.atlassian.com/server/jira/platform/webhooks/) to forward the hook (for the required JQL) to `http://<jira-mattermost-bridge url>:<port>/hooks/<mattermost hook id>`
* That's it.

## Docker Version
Pull the image from Docker Hub and run a container:
```sh
docker run --rm -p 8080:8080 adamgolab/jira-mattermost-bridge
```

## TODO

* Support other JIRA event (for now it support only `issue_updated`, `issue_created` and `issue_deleted` events)
