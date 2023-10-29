import { setupWorker } from 'msw'

// Handlers
import { handlerAuth } from '@db/auth/index'

const worker = setupWorker(...handlerAuth)
export default function () {
  const workerUrl = `${import.meta.env.BASE_URL ?? '/'}mockServiceWorker.js`

  if (Number(import.meta.env.VITE_ENABLE_MOCK_SERVER)) {
    worker.start({
      serviceWorker: {
        url: workerUrl,
      },
      onUnhandledRequest: 'bypass',
    })
  }
}
