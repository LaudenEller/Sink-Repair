//Import the querySelector variable from main.js
import { mainContainer } from "./main.js"

//Create an object with an empty array in it to hold transient state
const applicationState = {
    requests: []
}

//Export get* function that returns the transient state array
export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
}

//Save JSON url in a new variable
const API = "http://localhost:8088"

//Export a new function
export const fetchRequests = () => {
    //Fetch the "requests" section of the JSON database
    return fetch(`${API}/requests`)
    //Parse the returned JSON data into javascript
        .then(response => response.json())
        //Declare a function that accepts the external state as a parameter
        .then((serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

//Export a function that accepts the user input variable as a parameter
export const sendRequest = (userServiceRequest) => {
    //Declare a new variable as an object
    const fetchOptions = {
        //Add method key with value of "post" to let JSON server know a new object is coming in
        method: "POST",
        //Add headers key with value of an object
        headers: {
            //Add Content-Type key with value of application/json to give the api the header info it needs
            "Content-Type": "application/json"
        },
        //Add body key with value of a string created from the user input variable using JSON.stringify
        body: JSON.stringify(userServiceRequest)
    }

    //Use fetch to send the object from line 34 to the json server
    return fetch(`${API}/requests`, fetchOptions)
    //Parse the returned JSON data into javascript
        .then(response => response.json())
        //Declare a function that dispatches a custom event
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//Export a function that accepts a number as a parameter
export const deleteRequest = (id) => {
    //Use fetch to delete an object in the JSON database that has an id number that matches the parameter number
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
            //Declare a function that dispatches a custom event
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}