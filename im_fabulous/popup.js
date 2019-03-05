// hide comment +
var oCommentPlusCheckbox = document.getElementById("toggle_comment_plus");
oCommentPlusCheckbox.onchange = pressCommentPlus;
// hide comment -
var oCommentMinusCheckbox = document.getElementById("toggle_comment_minus");
oCommentMinusCheckbox.onchange = pressCommentMinus;

// comment votes 
var oCommentResultCheckbox = document.getElementById("toggle_comment_result");
oCommentResultCheckbox.onchange = pressCommentResult;
// coment negative
var oCommentNegativeCheckbox = document.getElementById("toggle_comment_negative");
oCommentNegativeCheckbox.onchange = pressCommentNegative;

// toggle sidebar
var oCommentSidebarCheckbox = document.getElementById("toggle_sidebar_comments");
oCommentSidebarCheckbox.onchange = pressCommentSidebar;
// comment tree
var oCommentTreeCheckbox = document.getElementById("toggle_comments_tree");
oCommentTreeCheckbox.onchange = pressCommentTree;
// comment left
var oCommentHideLeftPAddingCheckbox = document.getElementById("toggle_comments_left_padding");
oCommentHideLeftPAddingCheckbox.onchange = pressCommentHideLeftPadding;
// post -
var oPostMinusCheckbox = document.getElementById("toggle_post_minus");
oPostMinusCheckbox.onchange = pressPostMinus;
// post +
var oPostNegativeCheckbox = document.getElementById("toggle_post_negative");
oPostNegativeCheckbox.onchange = pressPostNegative;

// comment 700px
var oCommentMidthCheckbox = document.getElementById("toggle_comment_width");
oCommentMidthCheckbox.onchange = pressCommentWidth;

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

function pressPostMinus (oEvent){
	var bPostMinusCheckboxVal = oPostMinusCheckbox.checked;
	chrome.runtime.sendMessage({
		bHidePostMinus: bPostMinusCheckboxVal,
		val: bPostMinusCheckboxVal
	});
} 

function pressPostNegative (oEvent){
	var bVal = oPostNegativeCheckbox.checked;
	chrome.runtime.sendMessage({
		bHidePostNegative: bVal,
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
function pressCommentWidth (oEvent){
	var bVal = oCommentMidthCheckbox.checked;
	//alert(bVal);
	chrome.runtime.sendMessage({
		bCommentWidth: bVal
	});
}

var aParamNames = [
	'bHideCommentPlus', 
	'bHideCommentMinus', 
	'bHideCommentNegative', 
	'bHideCommentResult', 
	'bHidePostMinus', 
	'bHidePostNegative', 
	'bHideCommentSidebar', 
	'bShowCommentsTree', 
	'bHideCommentLeftPadding', 
	'bCommentWidth'
];

var oSettingsPropmise = new Promise (function(resolve, reject){
	chrome.storage.sync.get(/*[
		'bHideCommentPlus', 
		'bHideCommentMinus', 
		'bHideCommentNegative', 
		'bHideCommentResult', 
		'bHidePostMinus', 
		'bHidePostNegative', 
		'bHideCommentSidebar', 
		'bShowCommentsTree', 
		'bHideCommentLeftPadding'
	]*/aParamNames, function(result) {	
		var oResp = {};
		for (let key in result) {
			oResp[key] = result[key] || false;
		}
	
		resolve(oResp/*{
			bHideCommentPlus: result.bHideCommentPlus || false,
			bHideCommentMinus: result.bHideCommentMinus || false,
			bHideCommentNegative: result.bHideCommentNegative || false,
			bHideCommentResult: result.bHideCommentResult || false,			
			bHidePostMinus: result.bHidePostMinus || false,
			bHidePostNegative: result.bHidePostNegative || false,
			bHideCommentSidebar: result.bHideCommentSidebar || false,
			bShowCommentsTree: result.bShowCommentsTree || false,
			bHideCommentLeftPadding: result.bHideCommentLeftPadding || false
		}*/);
	})
})

oSettingsPropmise.then(function(oSettings){
	oCommentPlusCheckbox.checked = oSettings.bHideCommentPlus || false;
	oCommentMinusCheckbox.checked = oSettings.bHideCommentMinus || false;
	oCommentNegativeCheckbox.checked = oSettings.bHideCommentNegative || false;
	oCommentResultCheckbox.checked = oSettings.bHideCommentResult || false;
	oPostMinusCheckbox.checked = oSettings.bHidePostMinus || false;
	oPostNegativeCheckbox.checked = oSettings.bHidePostNegative || false;
	oCommentSidebarCheckbox.checked = oSettings.bHideCommentSidebar || false;
	oCommentTreeCheckbox.checked = oSettings.bShowCommentsTree || false;
	oCommentHideLeftPAddingCheckbox.checked = oSettings.bHideCommentLeftPadding || false;
	oCommentMidthCheckbox.checked = oSettings.bCommentWidth || false;
});