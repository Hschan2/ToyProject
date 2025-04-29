import { useMemo } from 'react'
import { format } from 'date-fns'

export function useFormattedDate(
  dateValue: string | number | null | undefined,
  dateFormat = 'yyyy-MM-dd HH:mm',
) {
  return useMemo(() => {
    if (!dateValue) return null

    let date: Date

    if (typeof dateValue === 'string') {
      try {
        date = new Date(dateValue)
        if (Number.isNaN(date.getTime())) return null
      } catch {
        return null
      }
    } else {
      date = new Date(dateValue)
    }

    return format(date, dateFormat)
  }, [dateValue, dateFormat])
}
