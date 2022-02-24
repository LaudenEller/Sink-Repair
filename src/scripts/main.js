import { fetchRequests, fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

//declare a querySelector that targets the main container id
const mainContainer = document.querySelector("#container")

// fetchPlumbers()

//Declare a function that renders the HTML to the DOM
const render = () => {
    //Invoke fetches to update app stae from JSON
    fetchRequests()
    .then(fetchCompletions)
    .then(
        () => {
            //Set the innerHTML of the main container to the SinkRepair function
            mainContainer.innerHTML = SinkRepair()
        }
    )
}



render()

//Add event lisener that fetches latest data from JSON and rerenders the HTML once our customEvent is announced
mainContainer.addEventListener(
    "stateChanged",
    CustomEvent => {
        render()
    }
)