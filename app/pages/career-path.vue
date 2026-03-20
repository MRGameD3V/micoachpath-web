<template>
    <section class="max-w-5xl mx-auto flex flex-col gap-8">
        <div>
            <h1 class="font-semibold text-4xl">My Career path</h1>
            <p class="text-md py-2">View and select your next greatest professional step, based on your current role.</p>
        </div>
        <div class="flex flex-col gap-8">
            <div v-if="!result" class="flex flex-col items-center justify-center py-24 gap-4 text-base-content/40">
                <FontAwesomeIcon :icon="faSadCry" class="text-5xl"/>
                <p class="text-lg font-medium">You haven't analyzed your resume yet.</p>
                <NuxtLink to="/resume/upload" class="btn btn-success btn-xl">Upload resume <FontAwesomeIcon :icon="faChevronCircleRight" /></NuxtLink>
            </div>
            <template v-else>
                <div class="alert bg-base-200 border-none">
                    <span class="text-sm">
                        <strong>{{ result.profile_summary.current_level }}</strong> ·
                        {{ result.profile_summary.estimated_experience_years }} years of experience ·
                        Recommended path: <strong>{{ result.recommended_paths.find(path => path.path_id === result.profile_summary.recommended_primary_path)?.title }}</strong>
                    </span>
                </div>

                <div class="tabs tabs-bordered">
                    <button v-for="tab in tabs" :key="tab" class="tab" :class="activeTab === tab ? 'tab-active font-semibold' : 'text-base-content/40'" @click="activeTab = tab">
                        {{ tab }}
                    </button>
                </div>

                <div v-if="!activePath" class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
                    <PathCard v-for="path in paths" :key="path.title" v-bind="path" @select="selectPath(path)"/>
                </div>
                <PathDetail v-else
                    :path="activePath"
                    :icon="iconByPath(activePath.path_id)"
                    :color="colorByPath(activePath.path_id)"
                    @back="activeTab = 'All paths'" />
            </template>
        </div>
    </section>
</template>
<script setup lang="ts">
import { faChevronCircleRight, faSadCry } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PathCard from '~/components/PathCard.vue';
import PathDetail from '~/components/PathDetail.vue';

const { result } = useResumeUpload()

const tabs = computed(() => [
    'All paths',
    ...result.value?.recommended_paths.map((path, i) => `Path ${i + 1}: ${path.title}`) ?? []
])

const activeTab = ref('All paths')

const activePath = computed(() => {
    if(activeTab.value === 'All paths') return null

    const idx = tabs.value.indexOf(activeTab.value) - 1
    return result.value?.recommended_paths[idx] ?? null
})

const paths = computed(() => 
    result.value?.recommended_paths.map(path => ({
        icon: iconByPath(path.path_id),
        score: path.match_score,
        title: path.title,
        description: path.candidate_fit_summary,
        skillsLabel: 'REQUIRED SKILLS',
        skills: path.current_strengths,
        highlight: [],
        ctaLabel: 'Explore this path',
        ctaIcon: '->',
        color: colorByPath(path.path),
        detail: path
    }))
)

function selectPath(path) {
    const idx = result.value.recommended_paths.findIndex(p => p.path_id === path.detail.path_id)
    activeTab.value = tabs.value[idx + 1]
}

/* Next steps: these methods should be on API or having a general way of assigning them. */
function iconByPath(id: string) {
    return {
        
    }
}

function colorByPath(id: string) {
    
}
</script>