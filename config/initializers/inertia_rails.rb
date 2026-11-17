InertiaRails.configure do |config|
  # Forces a full page reload when frontend assets change after a deploy.
  config.version = ViteRuby.digest

  # Required by Inertia.js v3 clients.
  config.use_script_element_for_initial_page = true
  config.use_data_inertia_head_attribute = true
  config.always_include_errors_hash = true

  # Encrypt page data stored in browser history (requires HTTPS).
  config.encrypt_history = Rails.env.production?
end
