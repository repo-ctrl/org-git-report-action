# Action: Get the git events from an Organization Audit Log

## Prerequisites:

The GitHub git events audit log API is open only for **GitHub Enterprise** customers.

## Inputs:
`token`: A GitHub Token with the `admin:org` scopes to be able to call the Audit Log API. The user whose token is used with this workflow will need to be an Organization Admin. 

`githuborg`: Name of the GitHub Org 

## Demo Workflows:

### Secrets needed:

Create a Personal Access Token with relevant scopes and save it as a Repo Secret - ADMIN_TOKEN

```
name: Git events audit log
on: 
  workflow_dispatch:
    inputs:
      githuborg:
        description: 'GitHub Org Name'
        required: true

jobs:
  gitevents:
    runs-on: ubuntu-latest
    name: Audit log git events
    steps:
      # To use this repository's private action,
      # you must check out the repository
      - name: Checkout
        uses: actions/checkout@v2
      - name: Git events
        uses: repo-ctrl/org-git-report-action@vmain
        with:
          token: '${{ secrets.ADMIN_TOKEN }}'
          githuborg: '${{ github.event.inputs.githuborg }}'
      - uses: actions/upload-artifact@v2
        with:
          name: git-events-reports
          path: git-events-report.csv
 ```

### Downloading the Audit Logs:

The CSV report will be made available for download after the job successfully completes it's execution. 
