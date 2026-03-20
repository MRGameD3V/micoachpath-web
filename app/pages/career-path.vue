<template>
    <section class="max-w-5xl mx-auto flex flex-col gap-8">
        <div>
            <h1 class="font-semibold text-4xl">My Career path</h1>
            <p class="text-md py-2">View and select your next greatest professional step, based on your current role.</p>
        </div>
        <div class="flex flex-col gap-8">
            <div class="tabs tabs-bordered">
                <button v-for="tab in tabs" :key="tab" class="tab" :class="activeTab === tab ? 'tab-active font-semibold' : 'text-base-content/40'" @click="activeTab = tab">
                    {{ tab }}
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PathCard v-for="path in paths" :key="path.title" v-bind="path" />
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import PathCard from '~/components/PathCard.vue';
const tabs = ['All paths', 'Path 1: Android Architect', 'Path 2: Manager', 'Path 3: Game Dev']
const activeTab = ref('All paths')

const paths = [
    {
        icon: '📐', 
        score: 95, 
        title: 'Android Architect', 
        description: 'Technical depth to design complex mobile systems and infrastructure.', 
        skillsLabel: 'REQUIRED SKILLS', 
        skills: ['Hilt/Koin', 'API Migrations', 'Unit Testing', 'UI Components'], 
        highlight: [], 
        ctaLabel: 'Explore This Path', 
        ctaIcon: '→', 
        color: '#111827', 
    }, 
    { 
        icon: '👥', 
        score: 88,
        title: 'Engineering Manager', 
        description: 'Leverage your background as a Development Lead, Professor, and Mentor.', 
        skillsLabel: 'LEADERSHIP SKILLS', 
        skills: ['Mentoring', 'Recruitment', 'Project Mgmt', 'Public Speaking'], 
        highlight: [], 
        ctaLabel: 'Explore This Path', 
        ctaIcon: '→', 
        color: '#4B5563', 
    }, 
    { 
        icon: '🎮', 
        score: 75, 
        title: 'Mobile Game Dev', 
        description: "Aligned with your Master's in Multimedia Design and personal passion.", 
        skillsLabel: 'MULTIMEDIA STACK', skills: ['Android Perf', 'UI/UX', 'WearOS'], 
        highlight: ['Android Perf'], 
        ctaLabel: 'Explore This Path', 
        ctaIcon: '→', 
        color: '#7C3AED',
    },
]
</script>