require "capybara/rspec"

RSpec.configure do |config|
  # System specs run in headless Chrome (Vite builds the frontend automatically in test).
  config.before(type: :system) do
    driven_by :selenium, using: :headless_chrome, screen_size: [ 1400, 1000 ]
  end
end
