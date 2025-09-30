Rails.application.routes.draw do

root to: 'spa#index'

  # Simple API test endpoint used by the dashboard demo
  namespace :api do
    get 'test', to: 'test#index'
  end

get '*path', to: 'spa#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
