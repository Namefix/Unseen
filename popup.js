let storyswitch = document.querySelector(".storyswitch input");
let chatswitch = document.querySelector(".chatswitch input");
let seentext = document.querySelector(".status");

function update() {
    let reciever = chrome.storage.sync.get("status");
    reciever.then((storage) => {
        let status = storage.status;
        console.log(status)
        let updated = false;
        if(status.story) {
            storyswitch.checked = true;
            updated=true;
        } else {
            storyswitch.checked = false;
        }
        if(status.chat) {
            chatswitch.checked = true;
            updated=true;
        } else {
            chatswitch.checked = false;
        }

        if(updated) {
            seentext.classList.add("active"); 
            seentext.innerText = "Unseen";
        } else {
            seentext.innerText = "Seen";
            seentext.classList.remove("active"); 
        }
    });
}
update();


storyswitch.addEventListener("click", () => {
    let reciever = chrome.storage.sync.get("status");
    reciever.then((storage) => {
        let status = storage.status;
        if(status.story) {
            chrome.storage.sync.set({ status: {story:false,chat:status.chat} });
            update();
        } else {
            chrome.storage.sync.set({ status: {story:true,chat:status.chat} });
            update();
        }
    })
});
chatswitch.addEventListener("click", () => {
    let reciever = chrome.storage.sync.get("status");
    reciever.then((storage) => {
        let status = storage.status;
        if(status.chat) {
            chrome.storage.sync.set({ status: {story:status.story,chat:false} });
            update();
        } else {
            chrome.storage.sync.set({ status: {story:status.story,chat:true} });
            update();
        }
    })
});