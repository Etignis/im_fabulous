var oCommentPlusCheckbox = document.getElementById("toggle_comment_plus");
oCommentPlusCheckbox.onchange = pressCommentPlus;
var oCommentMinusCheckbox = document.getElementById("toggle_comment_minus");
oCommentMinusCheckbox.onchange = pressCommentMinus;

var oCommentResultCheckbox = document.getElementById("toggle_comment_result");
oCommentResultCheckbox.onchange = pressCommentResult;
var oCommentNegativeCheckbox = document.getElementById("toggle_comment_negative");
oCommentNegativeCheckbox.onchange = pressCommentNegative;

var oCommentSidebarCheckbox = document.getElementById("toggle_sidebar_comments");
oCommentSidebarCheckbox.onchange = pressCommentSidebar;
var oCommentTreeCheckbox = document.getElementById("toggle_comments_tree");
oCommentTreeCheckbox.onchange = pressCommentTree;
var oCommentHideLeftPAddingCheckbox = document.getElementById("toggle_comments_left_padding");
oCommentHideLeftPAddingCheckbox.onchange = pressCommentHideLeftPadding;

function pressCommentPlus (oEvent){
	var bCommentPlusCheckboxVal = oCommentPlusCheckbox.checked;
	chrome.runtime.sendMessage({
		bHideCommentPlus: bCommentPlusCheckboxVal,
		val: bCommentPlusCheckboxVal
	});
}
function pressCommentMinus (oEvent){
	var bCommentMinusCheckboxVal = oCommentMinusCheckbox.checked;
	chrome.runtime.sendMessage({
		bHideCommentMinus: bCommentMinusCheckboxVal,
		val: bCommentMinusCheckboxVal
	});
} 

function pressCommentNegative (oEvent){
	var bVal = oCommentNegativeCheckbox.checked;
	chrome.runtime.sendMessage({
		bHideCommentNegative: bVal,
		val: bVal
	});
}
function pressCommentResult (oEvent){
	var bVal = oCommentResultCheckbox.checked;
	chrome.runtime.sendMessage({
		bHideCommentResult: bVal,
		val: bVal
	});
}

function pressCommentSidebar (oEvent){
	var bVal = oCommentSidebarCheckbox.checked;
	//alert(bVal);
	chrome.runtime.sendMessage({
		bHideCommentSidebar: bVal
	});
}

function pressCommentTree (oEvent){
	var bVal = oCommentTreeCheckbox.checked;
	//alert(bVal);
	chrome.runtime.sendMessage({
		bShowCommentsTree: bVal
	});
}
function pressCommentHideLeftPadding (oEvent){
	var bVal = oCommentHideLeftPAddingCheckbox.checked;
	//alert(bVal);
	chrome.runtime.sendMessage({
		bHideCommentLeftPadding: bVal
	});
}


var oSettingsPropmise = new Promise (function(resolve, reject){
	chrome.storage.sync.get([
		'bHideCommentPlus', 
		'bHideCommentMinus', 
		'bHideCommentNegative', 
		'bHideCommentResult', 
		'bHideCommentSidebar', 
		'bShowCommentsTree', 
		'bHideCommentLeftPadding'
	], function(result) {	
		resolve({
			bHideCommentPlus: result.bHideCommentPlus || false,
			bHideCommentMinus: result.bHideCommentMinus || false,
			bHideCommentNegative: result.bHideCommentNegative || false,
			bHideCommentResult: result.bHideCommentResult || false,
			bHideCommentSidebar: result.bHideCommentSidebar || false,
			bShowCommentsTree: result.bShowCommentsTree || false,
			bHideCommentLeftPadding: result.bHideCommentLeftPadding || false
		});
	})
})

oSettingsPropmise.then(function(oSettings){
	oCommentPlusCheckbox.checked = oSettings.bHideCommentPlus || false;
	oCommentMinusCheckbox.checked = oSettings.bHideCommentMinus || false;
	oCommentNegativeCheckbox.checked = oSettings.bHideCommentNegative || false;
	oCommentResultCheckbox.checked = oSettings.bHideCommentResult || false;
	oCommentSidebarCheckbox.checked = oSettings.bHideCommentSidebar || false;
	oCommentTreeCheckbox.checked = oSettings.bShowCommentsTree || false;
	oCommentHideLeftPAddingCheckbox.checked = oSettings.bHideCommentLeftPadding || false;
});