import Image from 'next/image'
import { Wrapper } from '../../styles/nav/nav-link-style'

export default function Custom404({
  statusCode,
  message,
}: {
  statusCode: number
  message: string
}) {
  const image =
    statusCode === 500
      ? 'https://t4.ftcdn.net/jpg/05/92/91/99/360_F_592919939_IrEOZvIZuxDGZNsZlCfdOBBtEz8OoFkd.jpg'
      : 'https://png.pngtree.com/png-vector/20210827/ourmid/pngtree-error-404-page-not-found-png-image_3832696.jpg'

  return (
    <Wrapper>
      <Image
        src={image}
        width={400}
        height={400}
        loading="lazy"
        alt={`${statusCode}, ${message}`}
      />
    </Wrapper>
  )
}
