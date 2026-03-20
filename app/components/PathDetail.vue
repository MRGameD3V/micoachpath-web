<template>
    <div class="flex flex-col gap-10">
        <div class="flex items-center gap-4">
            <h1 class="text-3xl font-bold">{{ path.title }}</h1>
            <span class="badge badge-lg font-semibold" :style="{ background: color, color: '#fff' }">
                {{ path.match_score }}% match
            </span>
        </div>

        <div class="rounded-2xl p-8 flex justify-between gap-6" :style="{backgroundColor: color}">
            <div class="flex flex-col gap-3">
                <p class="text-xs font-bold tracking-widest opacity-60 text-white">WHY THIS PATH ?</p>
                <p class="text-white text-lg leading-relaxed max-w-xl">{{ path.why_this_path }}</p>
            </div>
            <div class="text-white opacity-10 text-9xl font-black select-none self-center">
                <FontAwesomeIcon :icon="faFlagCheckered" />
            </div>
        </div>

        <div class="grid grid-cols-2 gap-6">
            <div class="border-l-4 border-success pl-6 flex flex-col gap-3">
                <p class="font-bold flex items-center gap-2">
                    <span class="text-success"><FontAwesomeIcon :icon="faCheck" /> Current Strengths</span>
                </p>
                <div class="flex flex-wrap gap-2">
                    <span v-for="strength in path.current_strengths" :key="strength" class="badge badge-outline badge-sm font-mono">
                        {{ strength }}
                    </span>
                </div>
            </div>

            <div class="border-l-4 border-error pl-6 flex flex-col gap-3">
                <p class="font-bold flex items-center gap-2">
                    <span class="text-error"><FontAwesomeIcon :icon="faExclamationTriangle" /> Skill gaps</span>
                </p>
                <div class="flex flex-wrap gap-2">
                    <span v-for="gap in path.skill_gaps" :key="gap" class="badge badge-outline badge-sm font-mono text-error border-error">
                        {{ gap }}
                    </span>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Your roadmap to {{ path.title }}</h2>
            <div class="flex flex-col gap-6">
                <div v-for="(phase, idx) in path.roadmap" :key="phase.phase" class="grid grid-cols-2 gap-6 items-start">
                    <div class="align-middle gap-4">
                        <div class="flex flex-col items-center gap-2 pt-1">
                            <span class="badge badge-sm font-mono uppercase" :style="idx === 0 ? { backgroundColor: color + '22', color } : {}">
                                {{ phase.duration }}
                            </span>
                            <p class="font-bold text-lg">{{ phase.phase }}</p>
                            <p class="text-base-content/60 text-sm">{{ phase.goal }}</p>
                        </div>
                    </div>

                    <div class="border border-base-200 rounded-xl p-4 flex flex-col gap-3">
                        <p class="text-xs font-bold tracking-widest text-base-content/40">MILESTONES</p>
                            <div v-for="milestone in phase.milestones" :key="milestone" class="flex items-start gap-2">
                            <span class="text-sm" :style="{ color: idx === 0 ? color : '#9CA3AF' }"> <FontAwesomeIcon :icon="faFlagCheckered" /></span>
                            <p class="text-sm">{{ milestone }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div v-for="project in path.suggested_projects" :key="project.title" class="border border-base-200 rounded-xl p-5 flex flex-col gap-3">
          <div class="flex justify-between items-start">
            <p class="font-bold">{{ project.title }}</p>
            <span class="badge badge-sm uppercase font-mono" :class="project.difficulty === 'Advanced' ? 'badge-warning' : 'badge-info'">
              {{ project.difficulty }}
            </span>
          </div>
          <p class="text-sm text-base-content/60">{{ project.description }}</p>
          <div class="flex flex-wrap gap-1">
            <span v-for="skill in project.skills_validated" :key="skill" class="badge badge-ghost badge-sm font-mono">
              {{ skill }}
            </span>
          </div>
          <div class="flex justify-between items-center mt-auto pt-2 border-t border-base-200">
            <span class="text-xs text-base-content/40 uppercase tracking-widest">Duration: {{ project.estimated_weeks }} weeks</span>
            <button class="btn btn-ghost btn-xs" :style="{ color }">View Spec</button>
          </div>
        </div>
      </div>
    </div>

    <div class="border border-base-200 rounded-2xl p-6 flex justify-between items-start gap-8">
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">Next 30 Days Plan</h2>
        <ol class="flex flex-col gap-2">
          <li v-for="(item, idx) in path.next_30_days_plan" :key="item" class="flex items-start gap-3 text-sm">
            <span class="font-bold text-base-content/40 w-4 shrink-0">{{ idx + 1 }}</span>
            <p>{{ item }}</p>
          </li>
        </ol>
      </div>

      <div class="flex flex-col gap-3 shrink-0">
        <button class="btn btn-lg btn-success font-semibold">
          Start This Roadmap
        </button>
        <button class="btn btn-lg btn-outline" @click="emit('back')">Back to Paths</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faExclamationTriangle, faFlag, faFlagCheckered } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps({
    path: { type: Object, required: true },
    icon: { type: String, default: '' },
    color: { type: String, default: '#111827' },
})

const emit = defineEmits(['back'])
</script>
