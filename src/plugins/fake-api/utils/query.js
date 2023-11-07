/**
 * @param {Array|String} fields 
 * @param {String} operator 
 * @param {Array|String} values 
 * @returns 
 */
export const genQueryObjFilter = (fields, operator, values) => {
  let query = {}

  function slicedField(field) {
    if (field.startsWith('||') || field.startsWith('v:')) {
      return field.slice(2)
    }

    return field
  }

  function prepareField(field) {
    if (field.startsWith('||')) {
      return `or[${slicedField(field)}]`
    } else if (field.startsWith('v:')) {
      return `${slicedField(field)}`
    } else {
      return `${slicedField(field)}[value]`
    }
  }

  function prepareOperator(field, value) {
    if (field.startsWith('v:') && !Array.isArray(value)) {
      return null
    } else if (field.startsWith('||')) {
      return `or[${slicedField(field)}][operator]`
    } else {
      return `${slicedField(field)}[operator]`
    }
  }

  function gen(field, value) {
    const query = {}

    if (value && value.length || typeof value === 'number') {
      if (operator === 'like') {
        value = '%' + value + '%'
      }

      let preparedField = prepareField(field)
      let preparedOperator = prepareOperator(field, value)

      if (preparedField.startsWith('or') && !Array.isArray(value)) {
        preparedField = preparedField + '[value]'
      }

      query[preparedField] = value
      if (preparedOperator) {
        query[preparedOperator] = operator
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

export function ensureArray(value) {
  if (!Array.isArray(value)) {
    return [value]
  }
  
  return value
}
