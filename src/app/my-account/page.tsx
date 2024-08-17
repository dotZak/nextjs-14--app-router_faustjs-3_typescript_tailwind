import { PleaseLogin } from "@/components/PleaseLogin";
import { gql } from "@apollo/client";
import { getAuthClient, onLogout } from "@faustwp/experimental-app-router";

export default async function Page() {
  const client = await getAuthClient();

  if (!client) {
    return <PleaseLogin />;
  }

  const { data } = await client.query({
    query: gql`
      query GetViewer {
        viewer {
          name
          posts {
            nodes {
              id
              title
            }
          }
        }
      }
    `,
  });

  return (
    <>
      <header>
        <h1>Welcome {data.viewer.name}</h1>
      </header>
      <main>
        <section>
          <h2>My Posts</h2>
          <ul>
            {data.viewer.posts.nodes.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </section>

        <form action={onLogout}>
          <button type="submit">Logout</button>
        </form>
      </main>
    </>
  );
}
