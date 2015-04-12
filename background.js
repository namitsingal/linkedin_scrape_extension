/* Regex-pattern to check URLs against. 
   It matches URLs like: http[s]://[...]stackoverflow.com[...] */
var urlRegex = /^https?:\/\/(?:[^\.]+\.)?linkedin\.com/;

/* A function creator for callbacks */
function doStuffWithDOM(domContent) {
    alert("I received the following DOM content:\n" + domContent);
}

/* When the browser-action button is clicked... */
$("#click-me").onClicked.addListener(function(tab) {
    /*...check the URL of the active tab against our pattern and... */
    if (urlRegex.test(tab.url)) {
	
        /* ...if it matches, send a message specifying a callback too */
        chrome.tabs.sendMessage(tab.id, { text: "report_back" },
                                doStuffWithDOM);
    }
});



chrome.runtime.onMessage.addListener(function(msg, sender) {
    /* First, validate the message's structure */
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        /* Enable the page-action for the requesting tab */
        chrome.pageAction.show(sender.tab.id);
    }
});
