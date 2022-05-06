let button = document.querySelector(".onoff");
let seentext = document.querySelector(".status");

let reciever = chrome.storage.sync.get("status");
reciever.then((storage) => {
    let status = storage.status;
    console.log(status)
    if(status) {
        button.classList.add("active");
        button.innerText = "ON";
        seentext.classList.add("active"); 
        seentext.innerText = "Unseen";
    } else {
        button.classList.remove("active");
        button.innerText = "OFF";
        button.classList.remove("active");
        seentext.innerText = "Seen";
    }
});


button.addEventListener("click", () => {
    let reciever = chrome.storage.sync.get("status");
    reciever.then((storage) => {
        let status = storage.status;
        if(status) {
            chrome.storage.sync.set({ status: false });
            button.classList.remove("active");
            button.innerText = "OFF";
            seentext.classList.remove("active");
            seentext.innerText = "Seen";
        } else {
            chrome.storage.sync.set({ status: true });
            button.classList.add("active");
            button.innerText = "ON";
            seentext.classList.add("active");
            seentext.innerText = "Unseen";
        }
    })
});