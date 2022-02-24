import { getRequests, deleteRequest, getPlumbers, sendCompletion, getCompletions } from "./dataAccess.js"

const plumbers = getPlumbers()

//Declare a function that accepts a service request object as a parameter,
    //and returns the object description, a delete button and a plumber dropdown box as an li in an interpolated string
const convertRequestToListElement = (requestObj) => {
    //save an li element to a new variable without a style-type
    //add the paramter object's description to the li element
    //check every oject on the requests array to see if the complete property is set to true or false, 
        //when false, add a plumber dropdown box
    let html = `<li style="list-style-type: none;">
    ${requestObj.description}
    ${checkCompleted(parseInt(requestObj.id))}
   <button class="request__delete" id="request--${requestObj.id}">Delete</button>
    </li>`

    return html
}

const convertCompletionstoListElement = (completionObj) => {
    let html = `<li style="list-style-type: none;">${completionObj.description}</li>`
    return html
}

//export a function that sorts the requests and completions arrays 
    //then returns a copy of each array within their own ul in an interpolated string 
export const Requests = () => {
    const requests = getRequests()
    const completeRequests = getCompletions()
    //use .sort method to create ascending list of recent to old requests
    const requestsSortedByDate = requests.sort((a, b) => b.neededBy < a.neededBy)
    
    //    const requestsSortedByStatus = requestsSortedByDate.sort((a, b) => b.complete - a.complete)
    
    //use .map method to invoke the convertRequestToListElement function on every request in the requests array
    let html = `
    <ul>
    ${requestsSortedByDate.map(request => convertRequestToListElement(request)).join("")}
    </ul>`
     
    //do the same thing for completions
    const completedRequestsSortedByDate = completeRequests.sort((a, b) => b.date_created < a.date_created)
    html += `<ul>
    ${completedRequestsSortedByDate.map(completion => convertCompletionstoListElement(completion)).join("")}
    </ul>`

    return html
}


//Declare a function that accepts a number as a parameter and checks all of the requests 
    //in the application state to see if they are completed, if not, add a select a plumber dropdown box
const checkCompleted = (requestId) => {
    const requests = getRequests()
    const foundRequest = requests.find(request => {
        // console.log("test")
        return request.id === parseInt(requestId)
    })

    // if (!foundRequest) {
    //     console.log(requestId)
    // }


    //check if found request has a key completed with value of true
    if (foundRequest.complete === true) {
        //if true, use zombie code to get the function to do something innocuous
        return `${foundRequest.plumberId}`
        //if not true, return html for plumber dropdown box with a value === to their plumber id for each option that isn't completed
            //use in-line display strategy to show button or not - ADVICE FROM WILL
    } else {
        return `<select name="plumberSelected" id="idOfRequest--${requestId}">
        <option value = "0">Select Plumber</option>
        <option value = "1">Maude</option>
        <option value = "2">Merle</option>
        </select>`
    }
}

//Use querySelctor to target the main container
const mainContainer = document.querySelector("#container")

//Add a click event listener to the main container that checks 
//to see if a user selects any of the items on the request list
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        //Invoke the deleteRequest function and pass the selected request id as a parameter
        deleteRequest(parseInt(requestId))
    }
})
//Add event listener that listens for a change to the plumber dropdown box on requests in the request list
//and invokes the deleteRequest function and passes the id of the targeted request
mainContainer.addEventListener("change", (event) => {
    if (event.target.id.startsWith("idOfRequest--")) {
        const [, requestId] = event.target.id.split("--")

        const requests = getRequests()
        
        //iterate through the requests list and add a matching plumberId property and
        for (const request of requests) {
            //find the request that matches the selected request
            if (request.id === parseInt(requestId)) {
                //Add a plumberId that matches the name the user selects in the plumber dropdown box
                request.plumberId = parseInt(event.target.value)
                //Change value of the complete key on target request object to true
                request.complete = true
                // //Iterate through the completion array and get the index number of the most recent object
                // const completeRequests = getCompletions()
                // const lastIndex = completeRequests.length
                
                const completion = {
                    //Set the new completion object's id to the most recent object's index number + 1
                    // id: lastIndex + 1,
                    description: request.description,
                    requestId: parseInt(requestId),
                    plumberId: parseInt(event.target.value),
                    date_created: Date.now()
                }
                // POST new completion object to JSON by invoking the sendCompletion function and passing the completion object as a parameter
                sendCompletion(completion)
            }
        }
    //     //Invoke the deleteRequest function and pass the selected request id as a parameter to render html and delete targeted request from request list
    // deleteRequest(parseInt(requestId))
    }
}
)