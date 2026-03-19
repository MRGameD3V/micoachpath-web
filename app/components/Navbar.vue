<template>
    <header class="navbar bg-base-100 shadow-sm px-6">
        <div class="navbar-start gap-6">
            <NuxtLink to="/dashboard" class="text-sm font-medium opacity-70 hover:opacity-100">Dashboard</NuxtLink>
            <NuxtLink to="/team" class="text-sm font-medium opacity-70 hover:opacity-100">My Team</NuxtLink>
            <NuxtLink to="/settings" class="text-sm font-medium opacity-70 hover:opacity-100">Settings</NuxtLink>
        </div>
        <div class="navbar-end gap-3">
            <span class="text-sm">Daniel Barrera</span>
            <div class="avatar placeholder">
                <div class="bg-primary text-primary-content ronded-full w-8 text-center">
                    <span class="text-xs">DB</span>
                </div>
            </div>
        </div>
    </header>
</template>
