# InvisibleCaptcha configuration
# Protect forms from spam bots without showing a captcha to users

InvisibleCaptcha.setup do |config|
  # Honeypot field name (should be a field that humans won't fill)
  config.honeypots = [:subtitle, :tagline, :company_url]
  
  # Visual honeypots settings
  config.visual_honeypots = false
  
  # Timestamp threshold (how fast is too fast for a human)
  config.timestamp_threshold = 2 # seconds
  
  # Timestamp enabled
  config.timestamp_enabled = true
  
  # Spinner disabled by default (set to true if you want a visible spinner)
  config.spinner_enabled = false
  
  # Injectable styles for honeypots
  config.injectable_styles = false
  
  # Sentence for the hidden field
  config.sentence_for_humans = 'If you are human, ignore this field'
  
  # Secret key for timestamp encryption
  # config.secret_key = Rails.application.credentials.secret_key_base
end
