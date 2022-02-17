import { fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    CustomEvent => {
        render()
    }
)