import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";

export default class extends Controller {
    static targets = ['items', 'form'];
    static values = { position: String }

    send(event) {
        event.preventDefault();
        // '/restaurants/1/reviews' == this.formTarget.action

        fetch(this.formTarget.action, {
            method: 'POST',
            headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken()
        },
            body: new FormData(this.formTarget)
        })
            // then, there is a response. since we are only accepting json, we need to parse it into useful data             
        .then(response => response.json())
            // then we will have data
            // JSON parse error may be the Restaurant#create error             

        .then((data) => {
            // console.log(data)
            // if our inserted_item json exists, insert it at the bottom of our reviews
            // replace our current form with a new form
            if (data.inserted_item) {
                this.itemsTarget.insertAdjacentHTML(this.positionValue, data.inserted_item);
            }
            this.formTarget.outerHTML = data.form;
        });
    }
}
