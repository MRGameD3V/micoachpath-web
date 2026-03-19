<template>
    <div class="border border-base-200 rounded-xl p-4 flex items-center gap-4 hover:bg-base-50 transition-colors cursor-pointer">
        <!-- Icon -->
         <div class="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" :class="iconBg">
            <span class="text-xl font-bold" :class="iconColor">{{ format }}</span>
         </div>

         <div class="flex flex-col">
            <span class="font-semibold text-sm">{{ format }}</span>
            <span class="text-base-content/50 text-xs">{{ app }}</span>
         </div>
    </div>
</template>
<script setup lang="ts">
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