<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })
</script>

<template>
    <section class="max-w-2xl mx-auto flex flex-col gap-8">
        <div class="text-center">
            <h1 class="text-3xl font-bold">Upload resume</h1>
            <p class="text-base-content/60 mt-2">
                Upload your resume and our AI will analyze it automatically for generating your custom career path.
            </p>
        </div>

        <DropZone />

        <div class="divider text-xs text-base-content/40">Available formats</div>

        <div class="grid grid-cols-2 gap-4">
            <FormatCard format="PDF" app="Adobe Acrobat" />
        </div>

        <!-- Linkedin URL parsing, out of scope.-->
        <div class="hidden">
            <div class="divider text-xs text-base-content/40">OR PASTE LINKEDIN URL</div>
        </div>
        <!-- End Linkedin URL parsing -->

        <button class="btn btn-neutral btn-lg w-full">
            Analyze resume with AI
        </button>
    </section>
</template>
<script lang="ts">
import DropZone from '~/components/DropZone.vue';
import FormatCard from '~/components/FormatCard.vue';
</script>