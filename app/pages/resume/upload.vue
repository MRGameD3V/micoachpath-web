<template>
    <section class="max-w-2xl mx-auto flex flex-col gap-8">
        <div class="text-center">
            <h1 class="text-3xl font-bold">Upload resume</h1>
            <p class="text-base-content/60 mt-2">
                Upload your resume and our AI will analyze it automatically for generating your custom career path.
            </p>
        </div>

        <DropZone />

        <!-- Linkedin URL parsing, out of scope.-->
        <div class="hidden">
            <div class="divider text-xs text-base-content/40">OR PASTE LINKEDIN URL</div>
        </div>
        <!-- End Linkedin URL parsing -->
    </section>
</template>
<script lang="ts">
import DropZone from '~/components/DropZone.vue';
</script>