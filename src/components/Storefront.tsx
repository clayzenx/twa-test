
import {
  Card,
  StorefrontContainer
} from "./styled/styled";

import { useEffect, useState } from 'react'

export function Storefront() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://6ddf-38-180-115-28.ngrok-free.app/api/products')
      .then(response => response.json())
      .then(console.log)
  }, [])
  console.log('products', products)

  return (
    <StorefrontContainer type="grid">
      {/* {products.map(({ node }) => */}
      {/*   <Card key={node.id}> */}
      {/*     <img src={node.featuredImage.url} style={{ width: '100%' }} /> */}
      {/*     <p>{node.title}</p> */}
      {/*   </Card> */}
      {/* )} */}
    </StorefrontContainer>
  )
}
