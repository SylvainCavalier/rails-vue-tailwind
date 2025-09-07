# Pagy configuration
# https://ddnexus.github.io/pagy/docs/how-to

require 'pagy/extras/bootstrap'
require 'pagy/extras/overflow'

# Pagy::DEFAULT[:items] = 20        # items per page
# Pagy::DEFAULT[:size]  = [1,4,4,1] # nav bar size

# Set global default
Pagy::DEFAULT[:items] = 25
Pagy::DEFAULT[:size] = [1, 4, 4, 1]

# When you have a large number of pages, you may want to limit the page links shown
Pagy::DEFAULT[:max_pages] = 10

# Handle when page number is out of range
Pagy::DEFAULT[:overflow] = :last_page

# Enable bootstrap pagination styling
# Pagy::DEFAULT[:bootstrap] = { ... }

# Items per page selector (removed - not available in this version)
# Pagy::DEFAULT[:items_param] = :items
# Pagy::DEFAULT[:max_items] = 100

# Enable metadata for API responses (useful for JSON APIs)
# require 'pagy/extras/metadata'

# Enable search params preservation
# require 'pagy/extras/searchkick'  # if using searchkick
# require 'pagy/extras/elasticsearch_rails'  # if using elasticsearch

# Frontend helpers (uncomment the ones you need)
# require 'pagy/extras/bulma'
# require 'pagy/extras/foundation'
# require 'pagy/extras/materialize'
# require 'pagy/extras/navs'
# require 'pagy/extras/semantic'
# require 'pagy/extras/uikit'

# Backend extras (uncomment the ones you need)
# require 'pagy/extras/array'      # paginate arrays
# require 'pagy/extras/countless'  # paginate without count
# require 'pagy/extras/searchkick' # paginate searchkick results
# require 'pagy/extras/elasticsearch_rails' # paginate elasticsearch results
