const core = require('@actions/core');
const github = require('@actions/github');
const { Client } = require("@notionhq/client")
const fs = require('fs');
const {markdownToBlocks} = require('@tryfabric/martian');

async function run() {

  try {

      const staticTopText = core.getInput('static-top-text');
      const staticBottomText = core.getInput('static-bottom-text');
      const filePath = core.getInput('file-path');
      const notionToken = core.getInput('notion-token');
      const notionPageId = core.getInput('notion-page-id');

      // Initializing a client
      const client = new Client({
        auth: notionToken,
      })

      var localStaticTopText = ((staticTopText) ? staticTopText+'\n' : '');
      var localStaticBottomText = ((staticBottomText) ? '\n'+staticBottomText : '');

      const data = fs.readFileSync(filePath, 'utf8');
      
      // From Markdown to Notion Blocks
      notion_block = markdownToBlocks(localStaticTopText+data+localStaticBottomText, {
        strictImageUrls: false,
      });
  
      await clean(client, notionPageId, notion_block);
      await write(client, notionPageId, notion_block);

  } catch (error) {
    core.setFailed(error.message);
  }

}
async function write(client, blockId, content) {
  const response = await client.blocks.children.append({
    block_id: blockId,
    children: content,
  });
}


async function clean(client, blockId) {
      // Clean the current content of the page

      const response = await client.blocks.children.list({
        block_id: blockId,
        page_size: 100,
      });

      for (const item of response.results) {
        await client.blocks.delete({
          block_id: item.id,
        });
      }

}

run()
