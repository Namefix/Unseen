function updateSeen(story, chat) { // TRUE = BLOCK / FALSE = ALLOW
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [
            {
                id: 1,
                condition: {
                    urlFilter: `https://www.instagram.com/api/v1/stories/reel/seen`,
                    resourceTypes: ['xmlhttprequest'],
                },
                action: { type: story?"block":"allow" },
            }
        ],
    });
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [2],
        addRules: [
            {
                id: 2,
                condition: {
                    urlFilter: `https://www.instagram.com/api/v1/direct_v2/threads/*/items/*/seen/`,
                    resourceTypes: ['xmlhttprequest'],
                },
                action: { type: chat?"block":"allow" },
            }
        ],
    });
    console.log(story, story?"block":"allow", chat, chat?"block":"allow")
}

chrome.runtime.onInstalled.addListener(async () => {
    chrome.storage.sync.set({ status: {story:true, chat:true} });

    let url = chrome.runtime.getURL("index.html");
  
    chrome.tabs.create({ url });

    updateSeen(true, true);
});

chrome.windows.onCreated.addListener(function() {
    let reciever = chrome.storage.sync.get("status");
    reciever.then((storage) => {
        let status = storage.status;
        
        console.log(status)
        updateSeen(status.story, status.chat);
        if(status.story || status.chat) chrome.action.setIcon({path: "icons/Unseen128.png"});
        else chrome.action.setIcon({path: "icons/Seen128.png"});
    });
})


chrome.storage.onChanged.addListener((changes, areaname) => {
    console.log("hey", changes)
    if(!changes.status) return;
    let reciever = chrome.storage.sync.get("status");
    reciever.then((storage) => {
        let status = storage.status;

        console.log(status)
        updateSeen(status.story, status.chat);
        if(status.story || status.chat) chrome.action.setIcon({path: "icons/Unseen128.png"});
        else chrome.action.setIcon({path: "icons/Seen128.png"});
    });
});
