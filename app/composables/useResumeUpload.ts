export function useResumeUpload() {
    const { public: { apiBase } } = useRuntimeConfig()
    const steps = useState('resume-steps', () =>[
        { key: 'file_received', label: 'File received', status: 'pending' },
        { key: 'parsing_pdf', label: 'Extracting resume text', status: 'pending' },
        { key: 'extracting_data', label: 'Analyzing with AI', status: 'pending' },
        { key: 'generate_career_path', label: 'Generating career path', status: 'pending' },
    ])

    const isAnalyzing = useState('resume-is-analyzing', () => false)
    const isDone = useState('resume-is-done', () => false)
    const result = useState('resume-result', () => null)

    let abortController: AbortController | null = null

    async function analyze(file: File) {
        isAnalyzing.value = true
        isDone.value = false
        result.value = null
        resetSteps()

        abortController = new AbortController()

        // 1. Upload file first
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch(`${apiBase}/analyze-cv`, {
                method: 'POST',
                body: formData,
                signal: abortController.signal
            })

            if(!response.ok) {
                console.error('Error del servidor: ', response.status, response.statusText)
                cancel()
                return
            }

            if(!response.body) {
                console.error('Backend did not return a stream')
                cancel()
                return
            }

            const reader = response.body.getReader()
            const decoder = new TextDecoder()

            let buffer = ''

            while(true) {
                const {done, value} = await reader.read()
                if(done) break

                const raw = decoder.decode(value, {stream: true})
                buffer += raw

                const lines = buffer.split('\n')
                buffer = lines.pop() ?? ''

                for(const line of lines) {
                    if(line.length === 0) continue;

                    try {
                        const parsed = JSON.parse(line.replace('data:', '').trim())
                        handleEvent(parsed)
                    } catch {
                        console.warn('Non parseable line:', line)
                    }
                }
            }
        } catch(err: any) {
            if(err.name !== 'AbortError') {
                console.error('Stream error:', err)
                cancel()
            }
        }
    }

    function handleEvent(parsed: any) {
        if (parsed.type === 'start') return

        if (parsed.type === 'result') {
            result.value = parsed.career_path
            isDone.value = true
            isAnalyzing.value = false
            steps.value.forEach(s => s.status = 'done')
            return
        }

        if(parsed.type === 'error') {
            alert(parsed.message)
            cancel()
            return
        }

        if(parsed.type === 'step') {
            const found = steps.value.find(s => s.key === parsed.step)
            if(found) found.status = parsed.status

            const idx = steps.value.findIndex(s => s.key === parsed.step)
            if(steps.value[idx + 1]) steps.value[idx + 1].status = 'loading'
        }
    }

    function cancel() {
        abortController?.abort()
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