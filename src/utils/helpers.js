export function lg(...args)
{
  console.log(...args)
}

export function removeEmptyKeys(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => {
        if (value === 'none') {
          value = null
        }
        
        return [key, value]
      }),
  )
}

export function uniqueBy(array, key) {
  const seen = new Map()

  return array.filter(item => {
    const id = item[key]
    const isDuplicate = seen.has(id)

    if (!isDuplicate) {
      seen.set(id, true)
    }

    return !isDuplicate
  })
}

export function getStatusFromNumber(number, statuses) {
  for (const status in statuses) {
    if (statuses[status] === number) {
      return status
    }
  }
  
  return null
}
