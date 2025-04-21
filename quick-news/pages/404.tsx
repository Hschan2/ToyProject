import Link from 'next/link'

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h1>🚫 404 - 페이지를 찾을 수 없습니다.</h1>
      <p>존재하지 않는 경로이거나, 잘못된 접근입니다.</p>
      <button type="button" style={{ width: '150px', padding: '12px' }}>
        <Link href="/">홈으로</Link>
      </button>
    </div>
  )
}
