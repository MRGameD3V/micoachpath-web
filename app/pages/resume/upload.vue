<script setup lang="ts">
useHead({
    title: 'miCoach Path - Upload resume',
})

const selectedFile = ref(null)
</script>

<template>
    <section class="max-w-2xl mx-auto flex flex-col gap-8">
        <div class="text-center">
            <h1 class="text-3xl font-bold">Upload resume</h1>
            <p class="text-base-content/60 mt-2">
                Upload your resume and our AI will analyze it automatically for generating your custom career path.
            </p>
        </div>

        <DropZone />

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
            :class="selectedFile ? 'btn-success' : 'btn-disabled'"
            :disabled="!selectedFile" 
            @click="submitResume" v-if="submitted === false">
            Analyze resume with AI
        </button>

        <div v-if="submitted === true">
            <AnalysisStatus />
        </div>
    </section>
</template>
<script lang="ts">
import AnalysisStatus from '~/components/AnalysisStatus.vue';
import DropZone from '~/components/DropZone.vue';
import FormatCard from '~/components/FormatCard.vue';

const submitted = ref(false)

export default {
    methods: {
        submitResume() {
            submitted.value = !submitted.value;
        }
    }
}
</script>
