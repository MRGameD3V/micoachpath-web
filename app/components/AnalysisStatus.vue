<template>
    <div class="border-1-4 border-primary pl-6 flex flex-col gap-4">
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
</template>
<script setup lang="ts">
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const steps = ref([
    { label: 'File received', status: 'loading' },
    { label: 'Extracting text from resume', status: 'pending' },
    { label: 'Analyzing with AI (Gemini Flash)', status: 'pending' },
    { label: 'Generating career paths', status: 'pending' },
])
</script>