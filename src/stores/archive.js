
import { saveAs } from 'file-saver'

export const useArchiveStore = defineStore('archive', () => {
  async function archiveDownloadPdf(workflowId)
  {
    try {
      const response = await $api(`user/archive/workflow/${workflowId}/download`, { 
        method: 'GET', 
      })

      const buffer = await response.arrayBuffer()

      const blob = new Blob([buffer], { type: 'application/pdf' })

      saveAs(blob, `archive-workflow-${workflowId}.pdf`)

      toast.success('Workflow approved!')
    } catch(err) {}
  }

  return {
    archiveDownloadPdf,
  }
})
