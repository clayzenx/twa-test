
import {
  Card,
  StorefrontContainer
} from "./styled/styled";

import { useEffect, useState } from 'react'

export function Storefront() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://mock.shop/api?query={products(first:%2020){edges%20{node%20{id%20title%20description%20featuredImage%20{id%20url}%20variants(first:%203){edges%20{node%20{price%20{amount%20currencyCode}}}}}}}}')
      .then(response => response.json())
      .then(({ data: { products: { edges } } }) => console.log('data', setProducts(edges)))
  }, [])
  console.log('products', products)

  return (
    <StorefrontContainer type="grid">
      {products.map(({ node }) =>
        <Card key={node.id}>
          <img src={node.featuredImage.url} style={{ width: '100%' }} />
          <p>{node.title}</p>
        </Card>
      )}
    </StorefrontContainer>
  )
}
