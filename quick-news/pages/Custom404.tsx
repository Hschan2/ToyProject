import Image from 'next/image'
import { Wrapper } from '../styles/PageStyle'

export default function Custom404({
  statusCode,
  message,
}: {
  statusCode: number
  message: string
}) {
  return (
    <Wrapper>
      <Image
        src="https://png.pngtree.com/png-vector/20210827/ourmid/pngtree-error-404-page-not-found-png-image_3832696.jpg"
        width={400}
        height={400}
        loading="lazy"
        alt={`${statusCode}, ${message}`}
      />
    </Wrapper>
  )
}
