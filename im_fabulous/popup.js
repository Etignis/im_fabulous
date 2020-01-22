const API = (window.navigator.vendor=="Google Inc.")? chrome : browser;

var aParamNames = [];
var aInputs = document.querySelectorAll("#options input");
aInputs.forEach(function(oEl) {
	let sParam = oEl.dataset.param;
	aParamNames.push(sParam);
	oEl.onclick = inputPress;
});

function inputPress(){
	var sParam = this.dataset.param;
	var bVal = this.checked; 
	
	var o= {};
	o[sParam] = bVal;
	//o.val = bVal;
	
	API.runtime.sendMessage(o);
}

// show info
var oShowInfo = document.getElementById("showInfo");
oShowInfo.onclick = showInfo;
// hide info
var oHideInfo = document.getElementById("hideInfo");
oHideInfo.onclick = hideInfo;


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
	aInputs.forEach(function(oEl) {
		let sParam = oEl.dataset.param;
		oEl.checked = oSettings[sParam] || false;
	});
	
});

// version
var manifestData = chrome.runtime.getManifest();
var nVersion = manifestData.version;

var oNode = document.querySelector("#ext_version");
if(oNode) {
	oNode.innerText = nVersion;
}