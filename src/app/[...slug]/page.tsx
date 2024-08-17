import { getAuthClient, getClient } from "@faustwp/experimental-app-router";
import { gql } from "@apollo/client";
import { hasPreviewProps } from "./hasPreviewProps";
import { PleaseLogin } from "@/components/please-login";

export default async function Page(props) {
  const isPreview = hasPreviewProps(props);
  const id = isPreview ? props.searchParams.p : props.params.slug.join("/");

  const client = isPreview ? await getAuthClient() : await getClient();

  if (!client) {
    return <PleaseLogin />;
  }

  const { data } = await client.query({
    query: gql`
      query GetContentNode(
        $id: ID!
        $idType: ContentNodeIdTypeEnum!
        $asPreview: Boolean!
      ) {
        contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
          ... on NodeWithTitle {
            title
          }
          ... on NodeWithContentEditor {
            content
          }
          ... on NodeWithEditorBlocks {
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
          date
        }
      }
    `,
    variables: {
      id,
      idType: isPreview ? "DATABASE_ID" : "URI",
      asPreview: isPreview,
    },
  });

  return (
    <>
      <header>
        <h1>{data?.contentNode?.title}</h1>
      </header>
      <main>
        <div
          dangerouslySetInnerHTML={{ __html: data?.contentNode?.content ?? "" }}
        />
      </main>
    </>
  );
}
