export function useResumeUpload() {
    const { public: { apiBase } } = useRuntimeConfig()
    const steps = ref([
        { key: 'received_file', label: 'File received', status: 'pending' },
        { key: 'extracting_text', label: 'Extracting resume text', status: 'pending' },
        { key: 'ai_analysis', label: 'Analyzing with AI', status: 'pending' },
        { key: 'generating_path', label: 'Generating career path', status: 'pending' },
    ])

    const isAnalyzing = ref(false)
    const isDone = ref(false)
    const result = ref(null)

    let eventSource: EventSource | null = null

    async function analyze(file: File) {
        isAnalyzing.value = true
        isDone.value = false
        result.value = null
        resetSteps()

        // 1. Upload file first
        const formData = new FormData()
        formData.append('file', file)

        const { jobId } = await $fetch(`${apiBase}/analyze-cv`, {
            method: 'POST',
            body: formData
        })

        // 2. Open SSE for state listening
        eventSource = new EventSource(`${apiBase}/analyze-cv/status/${jobId}`)

        eventSource.onmessage = (event) => {
            const parsed = JSON.parse(event.data);

            if(parsed.type === 'result') {
                result.value = parsed.career_path
                isDone.value = true
                isAnalyzing.value = false

                steps.value.forEach(s => s.status = 'done')
                eventSource?.close()
                return
            }

            const found = steps.value.find(s => s.key === parsed.step)
            if(found) found.status = parsed.status

            const index = steps.value.findIndex(s => s.key === parsed.step)
            if(steps.value[index + 1]) steps.value[index + 1].status = 'loading'
        }

        eventSource.onerror = () => cancel()
    }

    function cancel() {
        eventSource?.close()
        isAnalyzing.value = false
        isDone.value = false
        result.value = null
        resetSteps()
    }

    function resetSteps() {
        steps.value.forEach(s => s.status = 'pending')
    }

    return { steps, isAnalyzing, result, isDone, analyze, cancel }
}