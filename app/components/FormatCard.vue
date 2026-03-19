<template>
    <div class="border border-base-200 rounded-xl p-4 flex items-center gap-4 hover:bg-base-50 transition-colors cursor-pointer">
        <!-- Icon -->
         <div class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" :class="iconBg">
            <FontAwesomeIcon class="text-xl" :class="iconColor" :icon="format === 'PDF' ? faFilePdf : faFile"/>
         </div>

         <div class="flex flex-col">
            <span class="font-semibold text-sm">{{ format }}</span>
            <span class="text-base-content/50 text-xs">{{ app }}</span>
         </div>
    </div>
</template>
<script setup lang="ts">
import { faFile, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
    format: { type: String, required: true },
    app: { type: String, required: true },
});

const iconBg = computed(() => 
    props.format === 'PDF' ? 'bg-red-50' : 'bg-blue-50'
)

const iconColor = computed(() => 
    props.format === 'PDF' ? 'text-red-500' : 'text-blue-500'
)
</script>