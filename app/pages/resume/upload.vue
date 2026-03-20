<script setup lang="ts">
import AnalysisStatus from '~/components/AnalysisStatus.vue';
import DropZone from '~/components/DropZone.vue';
import FormatCard from '~/components/FormatCard.vue';

useHead({
    title: 'miCoach Path - Upload resume',
})

const selectedFile = ref(null)
const { steps, isAnalyzing, isDone, analyze, cancel } = useResumeUpload()

function handleAnalyze() {
    if(selectedFile.value) analyze(selectedFile.value)
}

function handleCancel() {
    isAnalyzing.value = false;
}

watch(isDone, (done) => {
    if(done) navigateTo('/career-path')
})
</script>

<template>
    <section class="max-w-2xl mx-auto flex flex-col gap-8">
        <div class="text-center">
            <h1 class="text-3xl font-bold">Upload resume</h1>
            <p class="text-base-content/60 mt-2">
                Upload your resume and our AI will analyze it automatically for generating your custom career path.
            </p>
        </div>

        <DropZone v-model="selectedFile" />

        <div class="divider text-xs text-base-content/40">Available formats</div>

        <div class="grid grid-cols-2 gap-4">
            <FormatCard format="PDF" app="Adobe Acrobat" />
        </div>

        <!-- Linkedin URL parsing, out of scope.-->
        <div class="hidden">
            <div class="divider text-xs text-base-content/40">OR PASTE LINKEDIN URL</div>
        </div>
        <!-- End Linkedin URL parsing -->

        <button class="btn btn-lg w-full transition-all"
            :class="selectedFile && !isAnalyzing ? 'btn-success' : 'btn-disabled'"
            :disabled="!selectedFile || isAnalyzing" 
            @click="handleAnalyze">
            <span v-if="isAnalyzing" class="loading loading-spinner loading-sm" />
            <span v-if="!selectedFile">Please select a file</span>
            <span v-else-if="isAnalyzing">Analyzing...</span>
            <span v-else>Analyze resume with AI</span>
        </button>

        
        <AnalysisStatus 
            :steps="steps" 
            :is-analyzing="isAnalyzing" 
            :is-done="isDone"
            @cancel="handleCancel" v-if="isAnalyzing" />
    </section>
</template>