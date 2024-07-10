
import {
  Card,
  StorefrontContainer
} from "./styled/styled";

import { useEffect, useState } from 'react'

export function Storefront() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://engaging-birthday-6d0e6b30f8.strapiapp.com/api/products?populate=images')
      .then(response => response.json())
      .then(({ data, meta }) => setProducts(data))
  }, [])
  console.log('products', products)

  // const getImage = (url: string) => {
  //   return 'https://engaging-birthday-6d0e6b30f8.strapiapp.com' + url
  // }

  return (
    <StorefrontContainer type="grid">
      {products.map(({ id, attributes }) =>
        <Card key={id}>
          <img src={(attributes as any).images.data[0].attributes.url} style={{ width: "100%" }} />
          <h3>{(attributes as any).name}</h3>
        </Card>
      )}
    </StorefrontContainer>
  )
}
