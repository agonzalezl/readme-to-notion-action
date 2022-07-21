# Readme to Notion action
![](https://github.com/agonzalezl/test-github-actions/actions/workflows/main.yml/badge.svg)

This action uploads the content of a provided Markdown file (e.g. Readme file) to a Notion page.

# Inputs

##### `notion-token` (**Mandatory**)
Notion integration token. Access [here](https://www.notion.so/my-integrations) to get your own token. Don't forget to give your token [access to the page.](https://github.com/agonzalezl/test-github-actions#give-your-notion-integration-token-access-to-your-page)

##### `notion-page-id` (**Mandatory**)
Id of the Notion Page to be edited. This id is par of the URL of the page (`notion.so/blah-blah-blah-<page_id>`)

##### `file-path` (**Mandatory**)
Path to the Markdown file

##### `static-top-text` (**Optional**)
Static content added before the Markdown content

##### `static-bottom-text` (**Optional**)
Static content added after the Markdown content


# Example usage
Set in your GitHub repository Settings > Secrets (Actions) a secret `NOTION_TOKEN` with your Integration Token from Notion and `NOTION_PAGE_ID` with the id of your Notion Page. Don't forget to give your token [access to the page.](https://github.com/agonzalezl/test-github-actions#give-your-notion-integration-token-access-to-your-page).

Create the file `.github/workflows/main.yml` with the following content:
```yml
name: Main Workflow

on:
  workflow_dispatch: # Allow manual trigger
  push:
    branches:
      - 'master'
    paths:
      - './README.md'

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: Checkout and upload Readme to Notion
    steps:
      - name: checkout
        uses: "actions/checkout@2541b1294d2704b0964813337f33b291d3f8596b"
      - name: Upload to Notion
        uses: agonzalezl/readme-to-notion-action@88b6cb8eea354ac61c589f540e40cacadf0c8ecb
        with:
          static-top-text: '_This documentation is self-generated and will be overwritten. Please do not edit it manually._'
          static-bottom-text: '_This documentation is self-generated and will be overwritten. Please do not edit it manually._'
          file-path: './README.md'
          notion-token: ${{ secrets.NOTION_TOKEN }}
          notion-page-id: ${{ secrets.NOTION_PAGE_ID }}

```
Read more [here](https://julienrenaux.fr/2019/12/20/github-actions-security-risk/) about why to use commit hash instead of version in Github actions.

## Give your Notion Integration token access to your page
After creating a token in [my-integrations](https://www.notion.so/my-integrations), in your Notion page click `Share`, click in the `invite` search box and search for the name of your integration.

# Acknowledgements

Thanks to Notion for continuing to make cool stuff 💜

Notion SDK for JavaScript [makenotion/notion-sdk-js](https://github.com/makenotion/notion-sdk-js).

Martian: Markdown to Notion Parser [tryfabric/martian](https://github.com/tryfabric/martian).
