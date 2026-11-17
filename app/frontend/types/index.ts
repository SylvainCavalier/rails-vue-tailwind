// Shared frontend types. Mirror here the shape of the props sent by Rails.

// Rails flash keys exposed to Inertia (config.flash_keys, default: notice + alert).
export interface FlashData {
  notice?: string
  alert?: string
}

// Example once Devise is installed and `inertia_share auth:` is enabled in ApplicationController:
// export interface User {
//   id: number
//   email: string
// }
//
// export interface SharedProps {
//   auth: { user: User | null }
// }
