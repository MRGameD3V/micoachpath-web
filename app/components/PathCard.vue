<template>
    <div class="card bg-base-100 border border-base-200 rounded-2xl overflow-hidden">
        <div class="h-2 w-full" :style="{ backgroundColor: color }" />

        <div class="card-body p-6 flex flex-col gap-4">
            <div class="flex items-start justify-between">
                <div class="w-14 h-14 rounded-xl bg-base-200 flex items-center justify-center text-2xl">
                    <FontAwesomeIcon :icon="faCompass" />
                </div>
                <div class="text-right">
                    <p class="text-xs font-semibold tracking-widest text-base-content/40">MATCH SCORE</p>
                    <p class="text-3xl font-bold" :style="{ color }">{{ score }}</p>
                </div>
            </div>

            <div>
                <h2 class="text-xl font-bold">{{ title }}</h2>
                <p class="text-base-content/60 text-sm mt-1">{{ description }}</p>
            </div>

            <progress class="progress w-full" 
                :value="score"
                max="100"
                :style="{ accentColor: color }"
            />

            <div>
                <p class="text-xs font-semibold tracking-widest text-base-content/40 mb-2">
                    {{ skillsLabel }}
                </p>
                <div class="flex flex-wrap gap-2">
                    <span v-for="skill in skills" 
                        :key="skill" 
                        class="badge badge-outline font-mono text-xs"
                        :style="highlight.includes(skill) ? { borderColor: color, color } : {}">
                        {{ skill }}
                    </span>
                </div>
            </div>

            <button class="btn btn-lg btn-primary w-full mt-auto font-semibold" @click="emit('select')">
                {{ ctaLabel }}
                <span>{{ ctaIcon }}</span>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps({
    icon: {type: String, required: true },
    score: {type: Number, required: true },
    title: {type: String, required: true },
    description: {type: String, required: true },
    skillsLabel: {type: String, default: 'REQUIRED SKILLS' },
    skills: {type: Array, default: [] },
    highlight: {type: Array, default: [] },
    ctaLabel: {type: String, default: 'Explore this path' },
    ctaIcon: {type: String, default: '->' },
    color: {type: String, default: '##0082ce' },
})

const emit = defineEmits(['select'])
</script>