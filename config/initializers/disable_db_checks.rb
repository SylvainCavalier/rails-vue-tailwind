# Boilerplate mode: Disable database checks when SKIP_DB_CHECKS=true
# WARNING: Only use this for testing the boilerplate without a database!
# Remove this file or set SKIP_DB_CHECKS=false when setting up your real app.

if ENV['SKIP_DB_CHECKS'] == 'true'
  puts "🚀 BOILERPLATE MODE: Database checks disabled."
  puts "⚠️  Remove config/initializers/disable_db_checks.rb when setting up your real app!"
  
  Rails.application.configure do
    # Only disable the pending migration middleware - less invasive
    config.middleware.delete ActiveRecord::Migration::CheckPending
    
    # Don't dump schema when there's no DB
    config.active_record.dump_schema_after_migration = false
  end
else
  # Normal mode - ensure migration checks are active
  puts "✅ Normal mode: Database checks active."
end
