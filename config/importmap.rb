# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "workbox-core" # @7.3.0
pin "workbox-precaching" # @7.3.0
pin "workbox-routing" # @7.3.0
pin "workbox-strategies" # @7.3.0
