"use client";

import { gql, useQuery } from "@apollo/client";
import { hasPreviewProps } from "./hasPreviewProps";
import { WPBlocksViewer } from "@/components/WPBlocksViewer";

const GET_CONTENT_NODE_BY_URI = gql`
  query GetContentNode(
    $id: ID!
    $idType: ContentNodeIdTypeEnum!
    $asPreview: Boolean!
  ) {
    contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
      ... on Page {
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
      ... on Post {
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
      ... on SimpleProduct {
        __typename
        id
        slug
        uri
        content
      }
      date
    }
  }
`;

export default function Page(props) {
  const isPreview = hasPreviewProps(props);
  const id = isPreview ? props.searchParams.p : props.params.slug.join("/");

  const { data, loading, error } = useQuery(GET_CONTENT_NODE_BY_URI, {
    variables: {
      id,
      idType: isPreview ? "DATABASE_ID" : "URI",
      asPreview: isPreview,
    },
  });

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
      {console.log("DATA:\n", data)}
      <header>
        <h1>{data?.contentNode?.title}</h1>
        <p>Posted on: {data?.contentNode?.date}</p>
      </header>
      <main>
        <div dangerouslySetInnerHTML={{ __html: data?.contentNode?.content }} />

        <WPBlocksViewer blocks={data?.contentNode?.editorBlocks} />
      </main>
    </>
  );
}
