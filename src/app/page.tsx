import { getClient } from "@faustwp/experimental-app-router";
import { gql } from "@apollo/client";
import { WPBlocksViewer } from "./WPBlocksViewer";

const GET_FRONT_PAGE_QUERY = gql`
  query GetFrontPage {
    page(id: "/", idType: URI) {
      title
      content
      editorBlocks {
        __typename
        name
        id: clientId
        parentId: parentClientId
        apiVersion
        blockEditorCategoryName
        cssClassNames
        isDynamic
        renderedHtml
      }
    }
  }
`;

export default async function Home() {
  const client = await getClient();

  const { data } = await client.query({
    query: GET_FRONT_PAGE_QUERY,
  });

  const { title, editorBlocks } = data.page;

  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>
      <main>
        <WPBlocksViewer blocks={editorBlocks} />
      </main>
    </>
  );
}
