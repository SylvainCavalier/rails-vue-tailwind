require "rails_helper"

RSpec.describe "Home page", type: :system do
  it "mounts the Vue page rendered by Inertia" do
    visit root_path

    expect(page).to have_css("h1", text: "Rails + Inertia + Vue + Tailwind")
    expect(page).to have_content("Rails #{Rails.version}")
    expect(page).to have_title("Home - MyApp")
  end
end
