<script setup lang="ts">
import { usePage } from '@inertiajs/vue3'

import FlashMessages from '@/components/FlashMessages.vue'

const page = usePage()
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <FlashMessages :flash="page.flash" />
    <main class="mx-auto max-w-5xl px-4 py-10">
      <slot />
    </main>
  </div>
</template>
