import { useMemo } from 'react'

export default function Today() {
  const today = useMemo(() => new Date(), [])
  const formattedToday = useMemo(() => {
    const krDate = new Intl.DateTimeFormat('ko-kr', {
      dateStyle: 'full',
    })
    return krDate.format(today)
  }, [today])

  return <div>{formattedToday}</div>
}
