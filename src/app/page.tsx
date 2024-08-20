"use client";

import { gql, useQuery } from "@apollo/client";
import { WPBlocksViewer } from "@/components/WPBlocksViewer";

export default function Home() {
  const { data, error, loading } = useQuery(gql`
    query GetFrontPage {
      generalSettings {
        title
      }
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
  `);

  if (error) {
    console.error("❌ Error:\n", error);
    return (
      <>
        <header>
          <h1>Error</h1>
        </header>
        <main>
          <div dangerouslySetInnerHTML={{ __html: error.name }} />
          <div dangerouslySetInnerHTML={{ __html: error.message }} />
        </main>
      </>
    );
  }

  if (loading) {
    return <>Loading…</>;
  }

  return (
    <>
      <header>
        <h1>{data?.page?.title}</h1>
      </header>
      <main>
        <WPBlocksViewer blocks={data?.page?.editorBlocks} />
      </main>
    </>
  );
}
