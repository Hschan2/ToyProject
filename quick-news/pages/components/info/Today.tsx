export default function Today() {
  const today = new Date()
  const f = new Intl.DateTimeFormat('ko-kr', {
    dateStyle: 'full',
  })

  return (
    <>
      <div>{f.format(today)}</div>
    </>
  )
}
