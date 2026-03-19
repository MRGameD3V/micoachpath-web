<template>
    <div class="border-2 border-dashed border-primary rounded-xl p-12 flex 
        flex-col items-center gap-3 cursor-pointer hover:bg-primary/5 transition-colors"
        :class="selectedFile ? 'border-success bg-success/5' : 'border-primary hover:bg-primary/5'"
        @dragover.prevent="isDragging = true" 
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
        @click="triggerInput">

        <template v-if="selectedFile">
            <font-awesome-icon :icon="faFileImport" class="fa-4x text-success" />
        </template>
        <template v-else>
            <font-awesome-icon :icon="faCloudArrowUp" class="fa-4x text-primary" />
        </template>

        <p class="font-semibold text-lg" :class="selectedFile ? 'text-success' : 'text-primary'">{{ selectedFile ? 'File ready' : 'Drag your CV here' }}</p>
        <p class="text-base-content/50 text-sm">{{ selectedFile ? 'Click to change your file' : 'or click to select' }}</p>
        <span class="badge badge-ghost badge-sm">PDF · 5MB max</span>

        <input ref="fileInput" type="file" accept=".pdf" class="hidden" @change="onFileSelected">
    </div>

    <Transition name="slide-down">
        <div v-if="selectedFile" class="mt-3 flex items-center justify-between bg-base-200 rounded-lg px-4 py-3">
            <div class="flex items-center gap-3">
                <FontAwesomeIcon v-if="fileExtension === 'pdf'" :icon="faFilePdf" class="text-red" />
                <FontAwesomeIcon v-else :icon="faFile" class="text-blue" />

                <div class="flex flex-col leading-tight">
                    <span class="text-sm font-medium truncate max-w-xs">{{ selectedFile.name }}</span>
                    <span class="text-xs text-base-content/50">{{ fileSize }}</span>
                </div>
            </div>
            <button class="btn btn-ghost btn-xs btn-circle" @click.stop="clearFile">
                <FontAwesomeIcon :icon="faXmark" />
            </button>
        </div>
    </Transition>
</template>
<script setup type="ts">
import { faCloudArrowUp, faFile, faFileImport, faFilePdf, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const emit = defineEmits(['file-selected']);

const fileInput = ref(null);
const selectedFile = ref(null);
const isDragging = ref(false);

const fileExtension = computed(() => selectedFile.value?.name.split('.').pop().toLowerCase() ?? '')

const fileSize = computed(() => {
    const bytes = selectedFile.value?.size ?? 0;
    if(bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
})

function triggerInput() {
    fileInput.value?.click()
}

function onFileSelected(e) {
    const file = e.target.files?.[0];
    if (file) setFile(file)
}

function onDrop(e) {
    isDragging.value = false
    const file = e.dataTransfer.files?.[0]
    if(file) setFile(file)
}

function setFile(file) {
    selectedFile.value = file
    emit('file-selected', file)
}

function clearFile() {
    selectedFile.value = null
    fileInput.value.value = ''
    emit('file-selected', null)
}
</script>