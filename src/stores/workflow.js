import { useToast } from "vue-toast-notification"

export const useWorkflowStore = defineStore('workflow', () => {
  const workflows = ref([])
  const workflow = ref({})
  const approvalsCount = ref(0)

  const toast = useToast()

  async function fetchWorkflows(query)
  {
    try {
      const response = await $api(`/user/workflows`, { 
        method: 'GET', 
        query,
      })

      workflows.value = response

      return response
    } catch(err) {}
  }

  async function storeWorkflow(data)
  {
    try {
      await $api(`/user/workflows`, { 
        method: 'POST', 
        body: data,
      })

      toast.success('Success!')
    } catch(err) {}
  }

  async function showWorkflow(workflowId)
  {
    try {
      const response = await $api(`/user/workflows/${workflowId}`, { 
        method: 'GET', 
      })

      workflow.value = response.data

      return response
    } catch(err) {}
  }

  async function updateWorkflow(id, data)
  {
    try {
      await $api(`/user/workflows/${id}`, { 
        method: 'PATCH', 
        body: removeEmptyKeys(data),
      })

      toast.success('Success!')
    } catch(err) {}
  }

  async function deleteWorklow(id)
  {
    try {
      await $api(`/user/workflows/${id}`, { 
        method: 'DELETE', 
      })

      toast.success('Workflow deleted!')
    } catch(err) {}
  }

  async function getApprovalsCount(id)
  {
    try {
      const response = await $api(`user/workflows/${id}/approvals-count`, { 
        method: 'GET', 
      })

      approvalsCount.value = response
    } catch(err) {}
  }

  return {
    workflows,
    workflow,
    fetchWorkflows,
    storeWorkflow,
    showWorkflow,
    updateWorkflow,
    deleteWorklow,
    getApprovalsCount,
    approvalsCount,
  }
})
