import { NextPageContext } from 'next'
import CustomError from '../../error/Error'

export default function Error({
  statusCode,
  message,
}: {
  statusCode: number
  message: string
}) {
  return <CustomError statusCode={statusCode} message={message} />
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404
  const message = err ? err.message : '에러가 발생하였습니다.'
  return { statusCode, message }
}
