<template>
    <aside class="w-20 bg-neutral flex flex-col items-center py6 gap-6">
        <span class="text-white font-bold text-xs">miCoach Path</span>
        <ul class="flex flex-col gap-4 mt-4">
            <li v-for="item in navItems" :key="item.label">
                <NuxtLink :to="item.to" class="flex flex-col items-center gap-1 text-neutral-content opacity-60 hover:opacity-100 transition-opacity" active-class="!opacity-100">
                    <component :is="item.icon" class="w-5 h-5" />
                    <span class="text-[9px] uppercase tracking-widest">{{ item.label }}</span>
                </NuxtLink>
            </li>
        </ul>
    </aside>
</template>
<script setup lang="ts">
const navItems = [
    { label: 'Inicio', to: '/dashboard', icon: 'HomeIcon' },
    { label: 'Resume', to: '/resume/upload', icon: 'HomeIcon' },
    { label: 'Career Path', to: '/career-path', icon: 'HomeIcon' },
    { label: 'Skills Gap', to: '/skills-gap', icon: 'HomeIcon' },
    { label: 'OKRs', to: '/dashboard', icon: 'HomeIcon' },
];
</script>