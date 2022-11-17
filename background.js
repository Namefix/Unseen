function allowSeen() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [
            {
                id: 1,
                condition: {
                    urlFilter: `https://i.instagram.com/api/v1/stories/reel/seen`,
                    resourceTypes: ['xmlhttprequest'],
                },
                action: { type: 'allow' },
            }
        ],
    });
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [2],
        addRules: [
            {
                id: 2,
                condition: {
                    urlFilter: `https://i.instagram.com/api/v1/direct_v2/threads/*/items/*/seen/`,
                    resourceTypes: ['xmlhttprequest'],
                },
                action: { type: 'allow' },
            }
        ],
      });
}

function denySeen() {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [
            {
                id: 1,
                condition: {
                    urlFilter: `https://i.instagram.com/api/v1/stories/reel/seen`,
                    resourceTypes: ['xmlhttprequest'],
                },
                action: { type: 'block' },
            }
        ],
    });
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [2],
        addRules: [
            {
                id: 2,
                condition: {
                    urlFilter: `https://i.instagram.com/api/v1/direct_v2/threads/*/items/*/seen/`,
                    resourceTypes: ['xmlhttprequest'],
                },
                action: { type: 'block' },
            }
        ],
      });
}

chrome.runtime.onInstalled.addListener(async () => {
    chrome.storage.sync.set({ status: true });

    let url = chrome.runtime.getURL("index.html");
  
    chrome.tabs.create({ url });

    denySeen();
});

chrome.windows.onCreated.addListener(function() {
    let reciever = chrome.storage.sync.get("status");
    reciever.then((storage) => {
        let status = storage.status;
        
        if(status) {
            denySeen();
            chrome.action.setIcon({path: "icons/Unseen128.png"});
        } else {
            allowSeen();
            chrome.action.setIcon({path: "icons/Seen128.png"});
        }
    });
})


chrome.storage.onChanged.addListener((changes, areaname) => {
    if(!changes.status) return;
    let reciever = chrome.storage.sync.get("status");
    reciever.then((storage) => {
        let status = storage.status;
        
        if(status) {
            denySeen();
            chrome.action.setIcon({path: "icons/Unseen128.png"});
        } else {
            allowSeen();
            chrome.action.setIcon({path: "icons/Seen128.png"});
        }
    });
});
