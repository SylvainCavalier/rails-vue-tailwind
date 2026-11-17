class ApplicationController < ActionController::Base
  include Pundit::Authorization
  include Pagy::Method

  protect_from_forgery with: :exception

  # Data shared with every Inertia page (available as page.props in Vue).
  # Keep it small: it is sent on every request. Type it in app/frontend/types/globals.d.ts.
  # Example once Devise is installed:
  #   inertia_share auth: -> { { user: current_user&.as_json(only: %i[id email]) } }

  # Uncomment once Devise is installed (see README_DEVISE_INTEGRATION.md)
  # before_action :authenticate_user!

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from ActionController::InvalidAuthenticityToken, with: :page_expired

  private

  # Inertia follows redirects, so a redirect + flash is the right response for both
  # full page loads and Inertia visits. The flash is exposed as page.flash in Vue.
  def user_not_authorized
    redirect_back_or_to root_path, alert: "You are not authorized to perform this action."
  end

  def page_expired
    redirect_back_or_to root_path, alert: "The page expired, please try again."
  end
end
