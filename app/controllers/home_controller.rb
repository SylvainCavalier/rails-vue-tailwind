class HomeController < ApplicationController
  # Renders app/frontend/pages/home/index.vue (component path inferred from controller/action).
  def index
    render inertia: {
      rails_version: Rails.version,
      ruby_version: RUBY_VERSION
    }
  end
end
