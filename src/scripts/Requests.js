import { getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

const convertRequestToListElement = (requestObj) => {
    let html = `<li>${requestObj.description}
    
    <button class="request__delete" id="request--${requestObj.id}">Delete</button>

</li>`

    return html
}

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul id="ul">
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})