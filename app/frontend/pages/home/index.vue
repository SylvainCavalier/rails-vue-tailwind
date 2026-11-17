<script setup lang="ts">
import { Head } from '@inertiajs/vue3'

// Props come straight from HomeController#index (render inertia: { ... }).
defineProps<{
  rails_version: string
  ruby_version: string
}>()
</script>

<template>
  <Head title="Home" />

  <section class="space-y-8">
    <header>
      <h1 class="text-4xl font-bold tracking-tight">Rails + Inertia + Vue + Tailwind</h1>
      <p class="mt-2 text-lg text-gray-600">
        Rails {{ rails_version }} &middot; Ruby {{ ruby_version }}
      </p>
    </header>

    <div class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <h2 class="text-xl font-semibold">How a page works</h2>
      <ol class="mt-4 list-decimal space-y-2 pl-5 text-gray-700">
        <li>A route points to a controller action (<code>config/routes.rb</code>).</li>
        <li>The action calls <code>render inertia: { ...props }</code>.</li>
        <li>
          Inertia renders <code>app/frontend/pages/&lt;controller&gt;/&lt;action&gt;.vue</code>
          with those props.
        </li>
        <li>Forms use <code>useForm</code> and post to regular Rails routes. Errors and flash come back via redirect.</li>
      </ol>
    </div>
  </section>
</template>
