/* Listen for messages */

chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    /* If the received message has the expected format... */
    var data;
    if (msg.text && (msg.text == "report_back")) {
        /* Call the specified callback, passing 
           the web-pages DOM content as argument */
	//var name = document.getElementsByClassName('full-name');
	//alert('ame');
	//console.log("come");
	//sendResponse("hello");
	//alert(sendResponse);
	data = {};
	data['full_name'] = document.getElementsByClassName('full-name')[0].innerHTML;
	try
	{
		data['linked-in-url']= document.getElementsByClassName('view-public-profile')[0].innerHTML;
	}
	catch(err)
	{
		data['linked-in-url'] = msg.tab_url; 
        }
	data['locality'] = document.getElementsByClassName('locality')[0].querySelectorAll('a')[0].innerHTML;
	var companiesList = document.getElementsByClassName("current-position");
	data['companies'] = [];
	
	for( var i=0;i<companiesList.length;i++ )
	{
		var temp = {};
		try{
		temp['CompanyName'] = companiesList[i].getElementsByTagName("header")[0].querySelectorAll("h5 strong a")[0].innerHTML;
		}
		catch(err)
		{
			temp['CompanyName'] = companiesList[i].getElementsByTagName("header")[0].querySelectorAll("h5 a")[0].innerHTML;
		}
		temp['Designation'] = companiesList[i].getElementsByTagName("header")[0].querySelectorAll("h4 a")[0].innerHTML;
		data['companies'].push(temp);	
	}
	console.log(data);
	//sendResponse("Hello");
	sendResponse(data);
    }
});
