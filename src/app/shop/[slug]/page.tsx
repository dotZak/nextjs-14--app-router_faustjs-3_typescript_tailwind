"use client";

import { gql, useQuery } from "@apollo/client";

export default function ProductPage(props) {
  const id = props.params.slug;

  const { data, error, loading } = useQuery(
    gql`
      query ProductBySlug($id: ID = "", $idType: ProductIdTypeEnum = SLUG) {
        product(id: $id, idType: $idType) {
          __typename
          id
          slug
          uri
          content
          name
          ... on Product {
            name
            title
          }
          ... on ProductUnion {
            name
            shortDescription
            sku
            slug
            onSale
            featured
          }
          ... on SimpleProduct {
            price
            salePrice
            regularPrice
          }
          ... on VariableProduct {
            price
            salePrice
            regularPrice
          }
        }
      }
    `,
    {
      variables: {
        id,
      },
    }
  );

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
    return <>Loading product…</>;
  }

  const { product } = data;

  return (
    <>
      {console.log(product)}
      <header>
        <h1>
          {product.__typename}: {product.name}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
      </header>
      <main id="MainContent">
        <div dangerouslySetInnerHTML={{ __html: product.content }} />
        <div dangerouslySetInnerHTML={{ __html: product.price }} />
        <div dangerouslySetInnerHTML={{ __html: product.salePrice }} />
        <div dangerouslySetInnerHTML={{ __html: product.regularPrice }} />
      </main>
    </>
  );
}
