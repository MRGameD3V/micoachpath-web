<template>
    <div class="border-2 border-dashed border-primary rounded-xl p-12 flex flex-col items-center gap-3 cursor-pointer hover:bg-primary/5 transition-colors">
        <!-- Upload icon from FontAwesome -->
        <p class="text-primary font-semibold text-lg">Drag your CV here</p>
        <p class="text-base-content/50 text-sm">or click to select</p>
        <span class="badge badge-ghost badge-sm">PDF · 5MB max</span>

        <input ref="fileInput" type="file" accept=".pdf" class="hidden" @change="onFileSelected">
    </div>
</template>
<script setup type="ts">
const fileInput = ref(null);
const emit = defineEmits(['file-selected']);

function onFileSelected(e) {
    const file = e.target.files?.[0];
    if (file) emit('file-selected', true);
}
</script>