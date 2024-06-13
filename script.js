let myLeads = []
const inputEL = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("del-btn")
const tabBtn = document.getElementById("tab-btn")

//Storing the localstorage data into a variable by coverting it into array
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//rendering the list on the html page
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'> 
                ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

//Save tab btn 

tabBtn.addEventListener("click", () => {

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})




inputBtn.addEventListener("click", function () {
    myLeads.push(inputEL.value)
    inputEL.value = null
    // Save the myleads to localstorage
    //stringify converts element into string
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

//Del button event 
delBtn.addEventListener("click", () => {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


