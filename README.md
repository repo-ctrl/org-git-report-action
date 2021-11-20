# Action: Get the git events from an Organization Audit Log

## Inputs:
`token`: A GitHub Token with the `admin:org` scopes to be able to call the Audit Log API
`githuborg`: Name of the GitHub Org 

## Usage:
1. Create a repository (Optional)
2. Add the personal access token as the repository secret ADMIN_TOKEN
3. Save the below workflow to `.github/workflows/gitevents.yml` 
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
        uses: rohitnb/org-git-report-action@v0.1
        with:
          token: '${{ secrets.ADMIN_TOKEN }}'
          githuborg: '${{ github.event.inputs.githuborg }}'
      - uses: actions/upload-artifact@v2
        with:
          name: git-events-reports
          path: git-events-report.csv
 ```
 4. Go to the Actions tab and select the "Git events audit log" job and run the workflow. Enter the required org name in the input box.
 5. The CSV report will be made available for download after the job successfully completes it's execution as git-events-reports.csv
 
**Note:** The user whose token is used with this workflow will need to be an Organization Admin. 
 
