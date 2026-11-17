<script setup lang="ts">
import { ref, watch } from 'vue'

import type { FlashData } from '@/types'

const props = defineProps<{ flash: FlashData }>()

const dismissed = ref(false)

// A new flash (after a redirect) makes the banner visible again.
watch(() => props.flash, () => { dismissed.value = false })
</script>

<template>
  <div v-if="!dismissed && (flash.notice || flash.alert)" class="mx-auto max-w-5xl px-4 pt-4">
    <div
      :class="flash.alert ? 'border-red-200 bg-red-50 text-red-800' : 'border-green-200 bg-green-50 text-green-800'"
      class="flex items-start justify-between gap-4 rounded-lg border px-4 py-3 text-sm"
      role="alert"
    >
      <div>
        <p v-if="flash.alert" data-testid="flash-alert">{{ flash.alert }}</p>
        <p v-if="flash.notice" data-testid="flash-notice">{{ flash.notice }}</p>
      </div>
      <button type="button" class="font-medium opacity-70 hover:opacity-100" aria-label="Dismiss" @click="dismissed = true">
        &times;
      </button>
    </div>
  </div>
</template>
