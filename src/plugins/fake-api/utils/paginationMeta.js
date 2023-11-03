export const paginationMeta = (options, total) => {
  const start = (options.page - 1) * options.perpage + 1
  const end = Math.min(options.page * options.perpage, total)
  
  return `Showing ${total === 0 ? 0 : start} to ${end} of ${total} entries`
}
