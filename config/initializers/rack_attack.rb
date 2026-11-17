# Rack::Attack configuration for rate limiting and blocking

class Rack::Attack
  # Allow requests from localhost during development
  Rack::Attack.safelist("allow-localhost") do |req|
    Rails.env.development? && [ "127.0.0.1", "::1" ].include?(req.ip)
  end

  # Throttle login attempts by IP address
  # Compatible with Devise default routes
  Rack::Attack.throttle("login attempts by ip", limit: 5, period: 60.seconds) do |req|
    if (req.path == "/users/sign_in" || req.path.match(%r{^/users/sign_in})) && req.post?
      req.ip
    end
  end

  # Throttle login attempts by email address
  # Inertia forms post JSON, which Rack does not parse into req.params: read the body too.
  Rack::Attack.throttle("login attempts by email", limit: 5, period: 60.seconds) do |req|
    if req.path.start_with?("/users/sign_in") && req.post?
      Rack::Attack.email_param(req)
    end
  end

  def self.email_param(req)
    email = req.params.dig("user", "email") || req.params["email"]

    if email.nil? && req.media_type == "application/json"
      body = req.body.read
      req.body.rewind
      json = JSON.parse(body) rescue {}
      email = json.dig("user", "email") || json["email"] if json.is_a?(Hash)
    end

    email.to_s.downcase.presence
  end

  # Throttle password reset attempts
  Rack::Attack.throttle("password reset attempts", limit: 3, period: 60.seconds) do |req|
    if (req.path == "/users/password" || req.path.match(%r{^/users/password})) && req.post?
      req.ip
    end
  end

  # Throttle registration attempts
  Rack::Attack.throttle("registration attempts", limit: 3, period: 60.seconds) do |req|
    if (req.path == "/users" || req.path == "/users/sign_up" || req.path.match(%r{^/users/sign_up})) && req.post?
      req.ip
    end
  end

  # General request throttling
  Rack::Attack.throttle("req/ip", limit: 300, period: 5.minutes) do |req|
    req.ip unless req.path.start_with?("/assets", "/vite")
  end

  # Response when throttled
  self.throttled_responder = lambda do |_request|
    [ 429, { "Content-Type" => "application/json" }, [ { error: "Rate limit exceeded. Try again later." }.to_json ] ]
  end
end

# Enable Rack::Attack logging (only for throttles and blocks, not safelists)
ActiveSupport::Notifications.subscribe("rack.attack") do |name, start, finish, request_id, payload|
  req = payload[:request]
  match_type = payload[:match_type]
  next if match_type == :safelist

  Rails.logger.warn "[Rack::Attack] #{req.ip} #{req.request_method} #{req.fullpath} #{match_type}: #{payload[:match_discriminator]}"
end
