import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.addEventListener("turbo:submit-start", event => {
      if (!navigator.onLine) {
        event.preventDefault()
        const formData = new FormData(this.element)
        const payload = Object.fromEntries(formData)
        queueOfflineSubmission(payload)
        alert("You are offline. Your submission has been saved.")
      }
    })
  }
}