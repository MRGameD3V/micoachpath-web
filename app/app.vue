<template>
  <div data-theme="micoach" class="flex min-h-screen bg-base-100">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Navbar />
      <main class="flex-1 p-8">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>