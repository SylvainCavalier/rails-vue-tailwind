require "rails_helper"

RSpec.describe "Home", type: :request do
  describe "GET /" do
    it "renders the home page with server props" do
      get root_path

      expect(response).to have_http_status(:ok)
      expect(inertia).to render_component("home/index")
      expect(inertia).to have_props(rails_version: Rails.version, ruby_version: RUBY_VERSION)
    end
  end
end
