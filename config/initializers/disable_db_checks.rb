# Boilerplate demo mode: boot without a database when SKIP_DB_CHECKS=true.
# Remove this file when setting up a real app.

if ENV["SKIP_DB_CHECKS"] == "true"
  warn "[demo mode] Database checks disabled. Remove config/initializers/disable_db_checks.rb for a real app."

  Rails.application.configure do
    config.middleware.delete ActiveRecord::Migration::CheckPending
    config.active_record.dump_schema_after_migration = false
  end
end
