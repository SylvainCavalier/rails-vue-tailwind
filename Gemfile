source "https://rubygems.org"

ruby "3.4.8"

gem "rails", "~> 8.1.0"

# Database PostgreSQL
gem "pg", ">= 1.5"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Vite integration for frontend build
gem "vite_rails"

# Inertia.js adapter: Rails controllers render Vue pages directly (no JSON API layer)
gem "inertia_rails", "~> 3.23"

# Standard library gems no longer bundled by default in recent Rubies
gem "ostruct"
gem "benchmark"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[ windows jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# .env file support
gem "dotenv-rails"

# Action Cable without Redis (PostgreSQL-based)
gem "solid_cable"

# Background jobs without Redis (PostgreSQL-based)
gem "good_job"

# Clean, structured logging for production
gem "lograge"

# Health check endpoint for monitoring and orchestration
gem "okcomputer"

# Content / SEO / Search / Media
gem "friendly_id"           # Friendly URLs formatting
gem "meta-tags"             # SEO tags
gem "paper_trail"           # Version control for models
gem "pagy"                  # Light Pagination
gem "pg_search"             # Full-text search for models
gem "image_processing", "~> 1.2" # Image processing for Active Storage

# Security / Auth / Authorization
gem "devise"           # Auth users
gem "pundit"           # Authorization for controllers
gem "rack-attack"      # Rate limiting
gem "secure_headers"   # Content security policy

group :development, :test do
  gem "debug", platforms: %i[ mri windows ]
  gem "factory_bot_rails"                    # Test factories
  gem "faker"                                # Fake data generation for tests
  gem "brakeman", require: false             # Static security analysis
  gem "bundler-audit", require: false        # Gem vulnerability check
  gem "annotaterb"                           # Annotate models with schema
  gem "rspec-rails", "~> 8.0"                # Test framework
  gem "rubocop-rails-omakase", require: false # Rails 8 official omakase ruleset
end

group :development do
  gem "web-console"          # Use console on exceptions pages
  gem "letter_opener"        # Preview emails in development
  gem "rack-mini-profiler"   # Request performance profiler
  gem "bullet"               # Detect N+1 queries
end

group :test do
  gem "capybara"           # System testing
  gem "selenium-webdriver" # Headless Chrome driver for system specs
  gem "shoulda-matchers"  # One-liners for validations/associations
end
