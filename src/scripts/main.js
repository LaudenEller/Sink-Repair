import { fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

//Export a querySelector that targets the main container id
export const mainContainer = document.querySelector("#container")

//Declare a function that renders the HTML to the DOM
const render = () => {
    //Invoke the fetchRequests function to get the updated data from JSON,
        //and declare a new function that responds to the returned promise
    fetchRequests().then(
        () => {
            //Set the innerHTML of the main container to the SinkRepair function
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

//This initial invocation renders the HTML to the DOM when a user arrives at the URL
render()

//Add event lisener that rerenders the HTML once our customEvent is announced
mainContainer.addEventListener(
    "stateChanged",
    CustomEvent => {
        render()
    }
)