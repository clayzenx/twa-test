
import {
  Card,
  StorefrontContainer
} from "./styled/styled";

import { useEffect, useState } from 'react'

export function Storefront() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(setProducts)
  }, [])
  console.log('products', products)

  return (
    <StorefrontContainer type="grid">
      {products.map(({ id, name, description }) =>
        <Card key={id}>
          <p>{name}</p>
          <p>{description}</p>
        </Card>
      )}
    </StorefrontContainer>
  )
}
