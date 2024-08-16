import { getClient } from '@faustwp/experimental-app-router';
import { gql } from '@apollo/client';
import Link from 'next/link';

const GET_FRONT_PAGE_QUERY = gql`
  query GetFrontPage {
    page(id: "/", idType: URI) {
      editorBlocks {
        apiVersion
        blockEditorCategoryName
        clientId
        cssClassNames
        isDynamic
        name
        parentClientId
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

  return (
    <>
      <header>
        <h1>Posts</h1>
      </header>
      <main>
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </main>
    </>
  );
}
