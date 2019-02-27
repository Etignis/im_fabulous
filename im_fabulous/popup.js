var oCommentPlusCheckbox = document.getElementById("toggle_comment_plus");
oCommentPlusCheckbox.onchange = pressCommentPlus;
var oCommentResultCheckbox = document.getElementById("toggle_comment_result");
oCommentResultCheckbox.onchange = pressCommentResult;

var oCommentSidebarCheckbox = document.getElementById("toggle_sidebar_comments");
oCommentSidebarCheckbox.onchange = pressCommentSidebar;

function pressCommentPlus (oEvent){
	var bCommentPlusCheckboxVal = oCommentPlusCheckbox.checked;
	//alert(bCommentPlusCheckboxVal);
	chrome.runtime.sendMessage({
		bHideCommentPlus: bCommentPlusCheckboxVal,
		val: bCommentPlusCheckboxVal
	});
} 

function pressCommentResult (oEvent){
	var bVal = oCommentResultCheckbox.checked;
	//alert(bVal);
	chrome.runtime.sendMessage({
		bHideCommentResult: bVal
	});
}

function pressCommentSidebar (oEvent){
	var bVal = oCommentSidebarCheckbox.checked;
	//alert(bVal);
	chrome.runtime.sendMessage({
		bHideCommentSidebar: bVal
	});
}


var oSettingsPropmise = new Promise (function(resolve, reject){
	chrome.storage.sync.get([
		'bHideCommentPlus', 
		'bHideCommentResult', 
		'bHideCommentSidebar'
	], function(result) {	
		resolve({
			bHideCommentPlus: result.bHideCommentPlus || false,
			bHideCommentResult: result.bHideCommentResult || false,
			bHideCommentSidebar: result.bHideCommentSidebar || false
		});
	})
})

oSettingsPropmise.then(function(oSettings){
	oCommentPlusCheckbox.checked = oSettings.bHideCommentPlus || false;
	oCommentResultCheckbox.checked = oSettings.bHideCommentResult || false;
	oCommentSidebarCheckbox.checked = oSettings.bHideCommentSidebar || false;
});