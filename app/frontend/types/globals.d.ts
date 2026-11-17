import type { FlashData } from '@/types'

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string
  }
}

declare module '@inertiajs/core' {
  export interface InertiaConfig {
    flashDataType: FlashData
    // Rails validation errors: one array of messages per field
    errorValueType: string[]
    // Uncomment once shared props are defined (see types/index.ts):
    // sharedPageProps: SharedProps
  }
}
