const API = (window.navigator.vendor=="Google Inc.")? chrome : browser;

// show info
var oShowInfo = document.getElementById("showInfo");
oShowInfo.onclick = showInfo;
// hide info
var oHideInfo = document.getElementById("hideInfo");
oHideInfo.onclick = hideInfo;

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

// own carma
var oOwnCarmaCheckbox = document.getElementById("toggle_own_carma");
oOwnCarmaCheckbox.onchange = pressOwnCarma;

// own carma
var oThemeRevarseCheckbox = document.getElementById("toggle_theme_reverse");
oThemeRevarseCheckbox.onchange = pressThemeReverse;
// own carma
var oNewCommentOrderCheckbox = document.getElementById("toggle_new_comments_order");
oNewCommentOrderCheckbox.onchange = pressNewCommentOrder;


function showInfo() {
	document.getElementById("options").style.display = "none";
	document.getElementById("infoPanel").style.display = "block";
	return false;
}
function hideInfo() {
	document.getElementById("options").style.display = "block";
	document.getElementById("infoPanel").style.display = "none";
	return false;
}

function pressCommentPlus (oEvent){
	var bCommentPlusCheckboxVal = oCommentPlusCheckbox.checked;
	API.runtime.sendMessage({
		bHideCommentPlus: bCommentPlusCheckboxVal,
		val: bCommentPlusCheckboxVal
	});
}
function pressCommentMinus (oEvent){
	var bCommentMinusCheckboxVal = oCommentMinusCheckbox.checked;
	API.runtime.sendMessage({
		bHideCommentMinus: bCommentMinusCheckboxVal,
		val: bCommentMinusCheckboxVal
	});
} 

function pressCommentNegative (oEvent){
	var bVal = oCommentNegativeCheckbox.checked;
	API.runtime.sendMessage({
		bHideCommentNegative: bVal,
		val: bVal
	});
}

function pressPostMinus (oEvent){
	var bPostMinusCheckboxVal = oPostMinusCheckbox.checked;
	API.runtime.sendMessage({
		bHidePostMinus: bPostMinusCheckboxVal,
		val: bPostMinusCheckboxVal
	});
} 

function pressPostNegative (oEvent){
	var bVal = oPostNegativeCheckbox.checked;
	API.runtime.sendMessage({
		bHidePostNegative: bVal,
		val: bVal
	});
}
function pressCommentResult (oEvent){
	var bVal = oCommentResultCheckbox.checked;
	API.runtime.sendMessage({
		bHideCommentResult: bVal,
		val: bVal
	});
}

function pressCommentSidebar (oEvent){
	var bVal = oCommentSidebarCheckbox.checked;
	//alert(bVal);
	API.runtime.sendMessage({
		bHideCommentSidebar: bVal
	});
}

function pressCommentTree (oEvent){
	var bVal = oCommentTreeCheckbox.checked;
	//alert(bVal);
	API.runtime.sendMessage({
		bShowCommentsTree: bVal
	});
}
function pressCommentHideLeftPadding (oEvent){
	var bVal = oCommentHideLeftPAddingCheckbox.checked;
	//alert(bVal);
	API.runtime.sendMessage({
		bHideCommentLeftPadding: bVal
	});
}
function pressCommentWidth (oEvent){
	var bVal = oCommentMidthCheckbox.checked;
	//alert(bVal);
	API.runtime.sendMessage({
		bCommentWidth: bVal
	});
}

function pressNewCommentOrder (oEvent){
	var bVal = oNewCommentOrderCheckbox.checked;
	//alert(bVal);
	API.runtime.sendMessage({
		bNewCommnetOrderBranch: bVal
	});
}

function pressOwnCarma (oEvent){
	var bVal = oOwnCarmaCheckbox.checked;
	
	//alert(bVal);
	API.runtime.sendMessage({
		bOwnCarma: bVal
	});
}
function pressThemeReverse (oEvent){
	var bVal = oThemeRevarseCheckbox.checked;
	
	//alert(bVal);
	API.runtime.sendMessage({
		bThemeReverse: bVal
	});
	/*/
	if(bVal) {
		document.body.classList.add("reverse");
	} else {
		document.body.classList.remove("reverse");
	}
	/**/
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
	'bCommentWidth', 
	'bOwnCarma',
	'bThemeReverse',
	'bNewCommnetOrderBranch'
];

var oSettingsPropmise = new Promise (function(resolve, reject){
	API.storage.sync.get(aParamNames, function(result) {	
		var oResp = {};
		for (let key in result) {
			oResp[key] = result[key] || false;
		}
	
		resolve(oResp);
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
	oOwnCarmaCheckbox.checked = oSettings.bOwnCarma || false;
	oThemeRevarseCheckbox.checked = oSettings.bThemeReverse || false;
	oNewCommentOrderCheckbox.checked = oSettings.bNewCommnetOrderBranch || false;
});