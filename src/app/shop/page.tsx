"use client";

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

export default function ShopPage() {
  const { data, error, loading } = useQuery(gql`
    query GetShopPage {
      products {
        found
        edges {
          cursor
          node {
            __typename
            key: id
            name
            sku
            shortDescription
            featured
            onSale
            purchasable
            ... on UniformResourceIdentifiable {
              uri
            }
            ... on SimpleProduct {
              content
              uri
              price
            }
            ... on VariableProduct {
              content
              uri
              price
            }
          }
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
    return <>Loading products catalog…</>;
  }

  return (
    <>
      <header>
        <h1>Shop {/* TODO Shop page title from CMS */}</h1>
      </header>
      <main>
        {/* <div>TODO: Search and filters</div> */}
        {/* <section>
            <div>TODO: Shop page content from CMS</div>
        </section> */}
        <section>
          <header>
            <h2>Products</h2>
            <p>{data?.products?.found} products found</p>
          </header>
          {data?.products && (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data?.products?.edges.map(({ node }) => {
                return (
                  <li key={node.key}>
                    <article className="card flex flex-col items-center gap-y-4 px-4 py-4">
                      <header>
                        <h2>{node.name}</h2>
                        <p>{node.__typename}</p>
                      </header>
                      <section>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: node.shortDescription,
                          }}
                        />
                        <div dangerouslySetInnerHTML={{ __html: node.price }} />
                      </section>
                      <footer>
                        <Link
                          className="rounded-lg border border-solid border-gray-700 px-4 py-2"
                          href={(node.uri as string) ?? ""}
                        >
                          Read More
                        </Link>
                      </footer>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}
          {/* <footer>TODO: Pagination</footer> */}
        </section>
      </main>
    </>
  );
}
