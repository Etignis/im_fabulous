var oCommentPlusCheckbox = document.getElementById("toggle_comment_plus");
oCommentPlusCheckbox.onchange = pressCommentPlus;
var oCommentResultCheckbox = document.getElementById("toggle_comment_result");
oCommentResultCheckbox.onchange = pressCommentResult;

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


var oSettingsPropmise = new Promise (function(resolve, reject){
	chrome.storage.sync.get([
		'bHideCommentPlus', 
		'bHideCommentResult'
	], function(result) {	
		resolve({
			bHideCommentPlus: result.bHideCommentPlus || false,
			bHideCommentResult: result.bHideCommentResult || false
		});
	})
})

oSettingsPropmise.then(function(oSettings){
	oCommentPlusCheckbox.checked = oSettings.bHideCommentPlus || false;
	oCommentResultCheckbox.checked = oSettings.bHideCommentResult || false;
});