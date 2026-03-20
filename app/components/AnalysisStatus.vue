<template>
    <div class="flex flex-col gap-4">
        <div class="border-l-4 border-primary rounded-lg p-6 flex flex-col gap-4">
            <p class="font-semibold">Analyzing status</p>

            <div v-for="step in steps" :key="step.label" class="flex items-center gap-3">

                <span v-if="step.status === 'done'" class="badge badge-success badge-sm p-0 w-6 h-6"><FontAwesomeIcon :icon="faCheck" class="text-white" /></span>
                <span v-else-if="step.status === 'loading'" class="loading loading-spinner loading-sm text-primary" />
                <span v-else class="badge badge-ghost badge-sm w-6 h-6" />

                <span :class="step.status === 'loading' ? 'text-primary font-medium' : 'text-base-content/60'">
                    {{ step.label }}
                </span>
            </div>
        </div>

        <Transition name="slide-down">
            <button v-if="isAnalyzing" class="btn btn-ghost btn-sm text-error w-full" @click="emit('cancel')">
                <FontAwesomeIcon :icon="faXmark" /> Cancel analysis
            </button>
        </Transition>
    </div>
</template>
<script setup lang="ts">
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
    isAnalyzing: { type: Boolean, default: false },
    steps: { type: Array, default: []},
    isDone: { type: Boolean, default: false },
})

const emit = defineEmits(['cancel'])

const steps = ref([
    { label: 'File received', status: 'loading' },
    { label: 'Extracting text from resume', status: 'pending' },
    { label: 'Analyzing with AI (Gemini Flash)', status: 'pending' },
    { label: 'Generating career paths', status: 'pending' },
])
</script>