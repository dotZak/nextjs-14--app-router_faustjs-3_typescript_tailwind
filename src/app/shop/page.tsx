"use client";

import { gql } from "@/__generated__";
import { Product } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import Link from "next/link";

const GET_PRODUCTS = gql(`
  query GetProducts {
    products {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      found
      nodes {
        id
        databaseId
        slug
        name
        type
        ... on ProductUnion {
          shortDescription(format: RAW)
        }
        image {
          ... on MediaItem {
            id
            sourceUrl(size:WOOCOMMERCE_THUMBNAIL)
            altText
          }
        }
        ... on ProductWithPricing {
          price
          regularPrice
          salePrice
        }
        ... on InventoriedProduct {
          stockStatus
          stockQuantity
          soldIndividually
        }
      }
    }
  }
`);

export default function ShopPage() {
  const { data, error, loading } = useQuery(GET_PRODUCTS);

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
              {data?.products?.nodes.map((node) => {
                return (
                  <li key={node.id}>
                    <ShopProductCard product={node as Product} />
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

const ShopProductCard: React.FC<{
  product: Product;
}> = ({ product }) => {
  const { shortDescription, name, type, slug } = product;
  console.log(product);
  return (
    <article className="card flex flex-col items-center gap-y-4 px-4 py-4">
      <header>
        <h2>{name}</h2>
        <p>{type}</p>
      </header>
      <section>
        <div
          dangerouslySetInnerHTML={{
            __html: shortDescription as string,
          }}
        />
        {/* <div dangerouslySetInnerHTML={{ __html: price as string }} /> */}
      </section>
      <footer>
        <Link
          className="rounded-lg border border-solid border-gray-700 px-4 py-2"
          href={`/shop/${slug as string}`}
        >
          Read More
        </Link>
      </footer>
    </article>
  );
};
