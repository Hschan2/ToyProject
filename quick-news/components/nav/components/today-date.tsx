import { useMemo } from 'react'

export default function Today() {
  const formattedToday = useMemo(() => {
    const today = new Date()
    const krDate = new Intl.DateTimeFormat('ko-kr', {
      dateStyle: 'full',
    })
    return krDate.format(today)
  }, [])

  return <div>{formattedToday}</div>
}
