var tabUrl,tabId;
function getCurrentTabUrl() {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;
    tabUrl = tab.url;
    tabId = tab.id;
    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');
    //alert(tab.url); 
    //return tab.url;
  });

}
var urlRegex = /^https?:\/\/(?:[^\.]+\.)?linkedin\.com/;

getCurrentTabUrl();

/* A function creator for callbacks */
function doStuffWithDOM(d) {
    console.log(d);
    //console.log(d['companies'][0]['CompanyName']);
    console.log(JSON.stringify(d));
	var senddata = {
                'full_name' : d['full_name'],
                'companies' : d['companies'],
		'linkedin' : d['linked-in-url'],
                'city' : d['locality'],
		
            };
    $.ajax({
    	type: "POST",
    	url: 'http://ec2-54-165-188-58.compute-1.amazonaws.com/index.php/api/add_prospect',
    	data: senddata,
    	success: function(mydata){
	console.log("working");
	}
});
}
document.addEventListener( "DOMContentLoaded",function(){

$("#save_current_linked_value").click(function() {
    /*...check the URL of the active tab against our pattern and... */

    if (urlRegex.test(tabUrl)) {
	//alert(tabUrl);
        /* ...if it matches, send a message specifying a callback too */
        chrome.tabs.sendMessage(tabId, { text: "report_back",tab_url:tabUrl },
                                doStuffWithDOM);
    }
});

$("#get_all_details").click(function() {
console.log("pressed get");
//alert("clicked");
var num = 1;
/* $.ajax({
        type: "POST",
        url: 'http://ec2-54-165-188-58.compute-1.amazonaws.com/index.php/api/get_prospects',
        data: num,
        success: function(mydata){
    console.log("working");
    }
});
*/
chrome.downloads.download({
  url: "http://ec2-54-165-188-58.compute-1.amazonaws.com/index.php/api/get_prospects"//,
  //filename: "suggested/filename/with/relative.path" // Optional
});

});

},false);

