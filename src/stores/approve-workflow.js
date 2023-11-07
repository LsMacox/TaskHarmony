import { useToast } from "vue-toast-notification"

export const useApproveWorkflowStore = defineStore('approve-workflow', () => {

  const toast = useToast()

  async function approveWorkflow(workflowId)
  {
    try {
      await $api(`user/user-workflow-approvals/${workflowId}/approve`, { 
        method: 'POST', 
      })

      toast.success('Workflow approved!')
    } catch(err) {}
  }

  async function rejectWorkflow(workflowId)
  {
    try {
      await $api(`user/user-workflow-approvals/${workflowId}/reject`, { 
        method: 'POST', 
      })

      toast.success('Workflow rejected!')
    } catch(err) {}
  }

  return {
    approveWorkflow,
    rejectWorkflow,
  }
})
