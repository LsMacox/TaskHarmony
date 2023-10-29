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
