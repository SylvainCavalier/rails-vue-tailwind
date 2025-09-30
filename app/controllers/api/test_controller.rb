module Api
  class TestController < ApplicationController
    protect_from_forgery with: :null_session

    def index
      render json: {
        ok: true,
        message: 'Test endpoint works',
        time: Time.current
      }
    end
  end
end


