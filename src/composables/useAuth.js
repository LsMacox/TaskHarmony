import { router } from "@/plugins/1.router"
import { useCookie } from '@core/composable/useCookie'

export async function useLogout()
{
  useCookie('accessToken').value = null
  useCookie('userData').value = null
  await router.go('/login')
  useCookie('userAbilityRules').value = null
}
