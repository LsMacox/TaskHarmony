/**
 * @param {Array|String} fields 
 * @param {String} operator 
 * @param {Array|String} values 
 * @returns 
 */
export const genQueryObjFilter = (fields, operator, values) => {
  let query = {}

  function gen(field, value) {
    const query = {}

    if (value) {
      if (operator == 'like') {
        value = '%' + value + '%'
      }

      if (field.startsWith('r:') || 
          field.startsWith('v:') || 
          Array.isArray(value)) 
      {
        if (Array.isArray(value)) {
          query[`${field}`] = value
        } else {
          field = field.slice(2)
          query[`${field}`] = value
        }
      } else {
        if (field.startsWith('||')) {
          field = field.slice(2)
          query[`or[${field}]`] = value
        } else {
          query[`${field}[value]`] = value
        }

        query[`${field}[operator]`] = operator
      }
    }
    
    return query
  }

  if (Array.isArray(fields) && Array.isArray(values)) {
    fields.forEach((field, index) => {
      let value = values[index]
      query = { ...query, ...gen(field, value) }
    })
  } else {
    query = gen(fields, values)
  }

  return query
}

/**
 * @param {Array} sortBy 
 * @returns 
 */
export const genQueryObjFSortBy = sortBy => {
  const query = {}

  if (sortBy) {
    query[`f_params[orderBy][field]`] = sortBy[0]?.key
    query[`f_params[orderBy][type]`] = sortBy[0]?.order
  }

  return query
}


