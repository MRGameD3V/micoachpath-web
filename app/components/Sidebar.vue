<template>
    <aside class="w-20 bg-white flex flex-col items-center py6">
        <img src="/favicon.png" alt="PathMaker" class="p-6">
        <ul class="flex flex-col gap-4 mt-4">
            <li v-for="item in navItems" :key="item.label">
                <NuxtLink :to="item.to" class="flex flex-col p-3 items-center gap-1 text-[#323232] opacity-60 hover:opacity-100 transition-opacity" active-class="!opacity-100">
                    <font-awesome-icon :icon="setIcon(item.icon)" />
                    <span class="text-[9px] p-2 uppercase tracking-widest text-center">{{ item.label }}</span>
                </NuxtLink>
            </li>
        </ul>
    </aside>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBrain, faChartColumn, faCloudArrowUp, faHome, faRoute, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

const navItems = [
    // { label: 'Home', to: '/dashboard', icon: 'faHome' },
    { label: 'Resume', to: '/resume/upload', icon: 'faCloudArrowUp' },
    { label: 'Career Path', to: '/career-path', icon: 'faRoute' },
    // { label: 'Skills Gap', to: '/skills-gap', icon: 'faBrain' },
    // { label: 'OKRs', to: '/okrs', icon: 'faChartColumn' },
];

function setIcon(iconName: String): IconDefinition {
    switch(iconName) {
        case 'faHome':
            return faHome
        break;
        case 'faCloudArrowUp':
            return faCloudArrowUp
        break;
        case 'faRoute':
            return faRoute
        break;
        case 'faBrain':
            return faBrain
        break;
        case 'faChartColumn':
            return faChartColumn
        break;

        default:
            return faHome
    }
}
</script>