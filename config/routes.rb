Rails.application.routes.draw do

root to: 'spa#index'

get '*path', to: 'spa#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
