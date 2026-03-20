export function useResumeUpload() {
    const steps = ref([
        { key: 'received_file', label: 'File received', status: 'pending' },
        { key: 'extracting_text', label: 'Extracting resume text', status: 'pending' },
        { key: 'ai_analysis', label: 'Analyzing with AI', status: 'pending' },
        { key: 'generating_path', label: 'Generating career path', status: 'pending' },
    ])

    const isAnalyzing = ref(false)
    const isDone = ref(false)
    let eventSource: EventSource | null = null

    async function analyze(file: File) {
        isAnalyzing.value = true
        isDone.value = false
        resetSteps()

        // 1. Upload file first
        const formData = new FormData()
        formData.append('file', file)

        const { jobId } = await $fetch('/api/analyze-resume', {
            method: 'POST',
            body: formData
        })

        // 2. Open SSE for state listening
        eventSource = new EventSource(`/api/analyze-resume/status/${jobId}`)

        eventSource.onmessage = (event) => {
            const { step, status } = JSON.parse(event.data);

            const found = steps.value.find(s => s.key === step)
            if(found) found.status = status

            const index = steps.value.findIndex(s => s.key === step)
            if(steps.value[index + 1]) {
                steps.value[index + 1].status = 'loading'
            }

            if(step === 'generating_path' && status === 'done') {
                isDone.value = true
                isAnalyzing.value = false
                eventSource?.close()
            }
        }

        eventSource.onerror = () => {
            cancel()
        }
    }

    function cancel() {
        eventSource?.close()
        isAnalyzing.value = false
        resetSteps()
    }

    function resetSteps() {
        steps.value.forEach(s => s.status = 'pending')
    }

    return { steps, isAnalyzing, isDone, analyze, cancel }
}