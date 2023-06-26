import { NextPageContext } from 'next'
import Custom404 from './Custom404'

export default function Error({
  statusCode,
  message,
}: {
  statusCode: number
  message: string
}) {
  return <Custom404 statusCode={statusCode} message={message} />
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404
  const message = err ? err.message : '에러가 발생하였습니다.'
  return { statusCode, message }
}
