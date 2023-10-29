import { router } from "@/plugins/1.router"
import { createFetch } from '@vueuse/core'
import { destr } from 'destr'

export const useApi = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  
  fetchOptions: {
    headers: {
      Accept: 'application/json',
    },
  },
  options: {
    refetch: true,
    async beforeFetch({ options }) {
      const accessToken = useCookie('accessToken').value

      if (!accessToken)
        router.push({ name: 'login' })

      if (accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        }
      }

      return { options }
    },
    afterFetch(ctx) {
      const { data, response } = ctx

      let parsedData = null
      try {
        parsedData = destr(data)
      } catch (error) {
        console.error(error)
      }

      return { data: parsedData, response }
    },
    onFetchError(ctx) {
      const toast = useToast()

      const { data, response } = ctx

      if (response.status === 401) {
        useLogout()
      }
  
      if (response.status === 422 || response.status === 500) {
        toast.open({
          message: destr(data).message,
          type: 'error',
        })
      }
    },
  },
})
