import { useToast } from '@/plugins/toast/composables/useToast'
import { ofetch } from 'ofetch'

export const $api = ofetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
  onResponse({ request, response, options }) {
    const toast = useToast()

    if (response.status === 200 && response.message) {
      toast.success({
        message: response.message,
        type: 'success',
      })
    }
  },
  onResponseError({ request, response, options }) {
    const toast = useToast()

    if (response.status === 401) {
      useLogout()
    }

    if (response.status === 422) {
      toast.error(response._data.message)
    }
  },
})
