import { getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

//Declare a function that accepts an the request objects from JSON as a parameter,
    //and returns the object description and a delete button as an li in an interpolated string
const convertRequestToListElement = (requestObj) => {
    let html = `<li>${requestObj.description}
    
    <button class="request__delete" id="request--${requestObj.id}">Delete</button>

</li>`

    return html
}

//Export a function that returns a copy of the request array within a ul in an interpolated string 
export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `

    return html
}

//Use querySelctor to target the main container
const mainContainer = document.querySelector("#container")

//Add a click event listener to the main container that checks 
    //to see if a user selects any of the items on the request list
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        //Invoke the deleteRequest function and pass the selected request id as a parameter
        deleteRequest(parseInt(requestId))
    }
})