source "https://rubygems.org"

ruby "3.3.5"

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem "rails", "~> 7.1.5", ">= 7.1.5.1"

# Database PostgreSQL
gem "pg"

# Original database for Active Record used to be sqlite3
# gem "sqlite3", ">= 1.4"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Pipeline Vite for frontend build
gem "vite_rails"

# The original asset pipeline for Rails [https://github.com/rails/sprockets-rails]
# Generally not compatible with Vite !
# gem "sprockets-rails"

# Ostruct for handling nested attributes
gem "ostruct"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# .env file support
gem "dotenv-rails"

# Better jobs without Redis
gem "good_job"

# Better logs
gem "lograge"

# Content / SEO / Search / Media
gem "friendly_id", "~> 5.5" # Friendly URLs formatting
gem "meta-tags" # SEO tags
gem "paper_trail", "~> 16.0" # Version control for models
gem "pagy" # Light Pagination
gem "pg_search" # Full-text search for models
gem "image_processing", "~> 1.2" # Image processing for Active Storage

# Security / Auth / Authorization
gem "devise" # Auth users
gem "pundit" # Authorization for controllers
gem "rack-attack" # Rate limiting
gem "secure_headers" # Content security policy
gem "invisible_captcha" # Prevent bots from submitting forms

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri windows ]
  gem "rspec-rails" # RSpec for testing backend
  gem "factory_bot_rails" # FactoryBot for testing backend
  gem "faker" # Faker for testing backend
  gem "brakeman", require: false # Brakeman for security
  gem "bundler-audit", require: false # Bundler audit for security
  gem "annotate" # Annotate models with schema inside the model file
end

group :development do
  gem "web-console" # Use console on exceptions pages [https://github.com/rails/web-console]
  gem "letter_opener" # Preview fake emails in the browser instead of sending them
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem "capybara" # System testing
  gem "selenium-webdriver" # System testing
end