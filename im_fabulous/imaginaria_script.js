"use strict";

//const API = (window.navigator.vendor=="Google Inc.")? chrome : browser;

// CSS-styles

var oLocalSettings = {
	bHideCommentPlus: {
		val: true,
		css: ".comment-wrapper .vote-up{display: none !important;}"
	},
	bHideCommentMinus: {
		val: true,
		css: ".comment-wrapper .vote-down{display: none !important;}"
	},
	
	bHideCommentResult: {
		val: true,
		css: ".comment-wrapper .vote-count,  .comments .vote-count{display: none !important;}"
	},
	
	bHideCommentNegative: {
		val: true,
		css: ""
	},
	
	bHideCommentSidebar: {
		val: false,
		css: ".sideTransition{transition: all 0.5s;} #content.sideHidden{margin-right: 0}"
	},
	
	bShowCommentsTree: {
		val: false,
		css: ""
	},
	
	bHideCommentLeftPadding: {
		val: false,
		css: ".comment-wrapper{transition: padding-left 0.4s; } .hideCommentLeftPadding{padding-left: 5px !important;} .backgroundCommentGap{background-image: linear-gradient(90deg, #ffffff 43%, #e0e0e0c7 43.5%, #f0f6fa 43.6%, #ffffff 46.7%, #ffffff 98.08%, #f0f6fa 98.08%, #f0f6fa 100%);     background-size: 90.00px 100.00px;     background-repeat-x: no-repeat;} .comment-cur .comment-content {box-shadow: 0 0 1px 3px #8BC34A !important;} .comments, .comment, .comment-content{transition: background .8s, border-color .8s, box-shadow .6s} .firstCommentButton{margin: .1em;    color: #929aa4;    background: linear-gradient(#fafbfc, #f1f3f5);    padding: .2em .6em .3em;    margin-top: 1em;    border-radius: 5px;    border: 1px solid #d0d1d2;    outline: none;    cursor: pointer;     transition: background .3s, color .2s;} .firstCommentButton:hover{    color: #cfefff;     background: linear-gradient(#4cc3ff, #35bdfe);}"
	}	,
	
	bHidePostMinus: {
		val: true,
		css: ".vote-topic .vote-item.vote-down{display: none !important;}"
	},	
	
	bHidePostNegative: {
		val: true,
		css: ""
	},
	
	bCommentWidth: {
		val: false,
		css: ".reply, .comment{max-width: 700px}"
	},
	
	bOwnCarma: {
		val: true,
		css: ".dropdown-user-menu .item-stat{display: none} .vote-profile{display: none}"
	},
	
	bThemeReverse: {
		val: true,
		css: "html, body, #container{background: #222} #nav, #wrapper, #footer, aside.toolbar, .to_top{filter: invert(0.9) hue-rotate(190deg);} #nav img, #wrapper img, #footer img, #nav iframe, #wrapper iframe, #footer iframe{filter: invert(1.1) hue-rotate(-190deg);} .text{color: #444} .comment.comment-current .comment-content{background: #def4c8} .comment.comment-new .comment-content{ border-color: #4caf50} .content_bg{background: none !important} .text{padding: 0 3px} .comment{border-radius: 5px;}"
	},
	
	bNewCommnetOrderBranch: {
		val: false,
		css: "#new_comments_counter{display: none !important}"
	},
	
	// bHideSiteTitle: {
		// val: false,
		// css: "header#header > div.container:first-child{display: none !important;}"
	// },
	
	bSimpleOnAir: {
		val: false,
		css: ".block.block-type-stream .block-content .latest-list .stream-topic{text-decoration: none !important; font-weight: normal !important;}"
	},
	
	
	bNewComments: {
		val: false,
		css: ".comment.comment-new .comment-content {background: #83d40036}"
	}
};

var aFormData = [
	{
		inputs: [
			{
				key: "bHidePostMinus",
				label: "скрыть кнопки минусов постов"
			},
			{
				key: "bHidePostNegative",
				label: "не показывать отрицательные оценки постов"
			}
		]
	}, 
	{
		inputs: [
			{
				key: "bHideCommentMinus",
				label: "скрыть кнопки минусов комментариев"
			},
			{
				key: "bHideCommentPlus",
				label: "скрыть кнопки плюсов комментариев"
			},
			{
				key: "bHideCommentResult",
				label: "скрыть оценки комментариев"
			},
			{
				key: "bHideCommentNegative",
				label: "не показывать отрицательные оценки"
			}
		]
	}, 
	{
		inputs: [
			{
				key: "bOwnCarma",
				label: "сскрыть карму (β)"
			}
		]
	}, 
	{
		inputs: [
			{
				key: "bHideCommentSidebar",
				label: "скрывать сайдбар при просмотре комментариев"
			},
			{
				key: "bCommentWidth",
				label: "максимальная ширина комментария 700 px"
			},
			{
				key: "bHideCommentLeftPadding",
				label: "прижимать комментарии к левому краю (β)"
			},
			{
				key: "bShowCommentsTree",
				label: "улучшенное отображение комментариев-ответов (β)"
			},
			{
				key: "bNewCommnetOrderBranch",
				label: "сортирвать новые комменты по <acronym title='Не в порядке появления коммента, а по веткам обсуждания'>веткам</acronym> (β)"
			}
		]
	}, 
	{
		inputs: [
			{
				key: "bThemeReverse",
				label: "тема \"Реверс\""
			},
			// {
				// key: "bSimpleOnAir",
				// label: "Упростить \"Прямой эфир\""
			// },
			{
				key: "bNewComments",
				label: "Подсвечивать непрочитанные комментарии"
			}
		]
	}
];

var sPanelStyle = `#extra_options{
				font-family: Verdana, "Helvetica Neue", Helvetica, Arial, sans-serif;
				background: #fbfcfc;
			}
			#extra_options h1{
				font-size: 18px;
				line-height: 1.1em;
				font-weight: normal;
				margin: 0 0 10px;
				font-family: 'PT Sans', Arial, sans-serif;
			}
			#extra_options hr{
				border: none;
				border-top: 1px solid #e7ebed;
			}
			#extra_options label{
				display: block;
				cursor: pointer;
				transition: background .3s, box-shadow .3s;
				padding: 2px 2px 3px;
				color: #444;
				margin: 3px 0;
				border-radius: 3px;
				position: relative;
			}
			#extra_options label:hover{
				background: #fff;
				box-shadow: 0 1px 4px 0 #00000030;
			}
			
			#extra_options input[type="checkbox"]{
				display: none;
			}
			#extra_options input[type="checkbox"] + label{
				padding-left: 23px;
			}
			#extra_options input[type="checkbox"] + label::before{
				content: "";
				position: absolute;
				top: calc(50% - 7px);
				left: 2px;
				width: 10px;
				height: 10px;
				border: 3px solid #ddd;
				border-radius: 3px;
				box-shadow: inset 0 0 0 1px #fff;
				transition: background .2s, border .3s;
			}
			#extra_options input[type="checkbox"]:checked + label::before{
				background: #275ec2;
			}
			#extra_options input[type="checkbox"] + label:hover::before{
				border-color: #bbb;
			}
			
			#extra_options .reverse{
				filter: invert(0.9) hue-rotate(190deg);
				background: #222;
			}
			
			#extra_options #showInfo, 
			#extra_options #hideInfo{
				cursor: pointer;
				color: #888;
				text-decoration: none;
				display: block;
				width: 1.5em;
				height: 1.5em;
				text-align: center;
				border-radius: 3px;
				background: #eee;
				transition: background .3s, color .3s;
			}
			#extra_options #showInfo:hover, 
			#extra_options #hideInfo:hover{
				color: #222;
				background: #ddd;
			}
			#extra_options #ext_version{
				position: absolute;
				bottom: 3px;
				right: 3px;
				color: silver;
				
			}`;

var oTimer, oTimerPadding, oTimerNewComments;
var oLocalParameters = {
	bScrollActive: false
};

document.addEventListener("DOMContentLoaded", function(){oLocalParameters.DOMLoaded = true});
//document.addEventListener("onload ", );
window.onload = function(){
	oLocalParameters.Loaded = true; 
	minimiseLeftPadding(); 
	setNewCommentsCounterHandler(); 
	setCommentsTree();
	scrollToComment(null, null, true);
	createSettingsPanel();
	}
	
	
function implementSettings(oSettings){
	var aStyle = [];

	for(var key in oSettings) {
		oLocalSettings[key].val = oSettings[key].val || false;
	}
	for(var key in oLocalSettings) {
		if(oLocalSettings[key].val && oLocalSettings[key].css) {
			aStyle.push(oLocalSettings[key].css);
		}
	}
	/**/
	setGlobalCss(aStyle.join(" "));
	
	if(oLocalSettings.bHideCommentSidebar.val || oLocalSettings.bHideCommentLeftPadding.val) {
		startStalkScroll();
	}
	
	if(oSettings!=0) {
		if(oLocalSettings.bShowCommentsTree.val) {
			// tree comments
			setCommentsTree();
		}
		
		if(oLocalSettings.bHideCommentNegative.val) {
			// hide negative
			setVoteCounterHandler();
		} else {
			setVoteCounterHandler(false);
		}
		
		if(oLocalSettings.bHidePostNegative.val) {
			// hide negative
			setPostVoteCounterHandler();
		} else {
			setPostVoteCounterHandler(false);
		}
		
		if(oLocalSettings.bNewCommnetOrderBranch.val) {
			// hide negative
			setNewCommentsCounterHandler();
		} else {
			setNewCommentsCounterHandler(false);
		}
	}
	
	
}	

implementSettings(0);
startStalkScroll(true);

var oSettingsPropmise = new Promise (function(resolve, reject){
	var aNames = [];
	for (let key in oLocalSettings) {
		aNames.push(key)
	}
	// API.storage.sync.get(aNames, function(result) {
		// console.log('settings: ');
		// console.dir(result);
		// var oResp = {};
		// for (let key in oLocalSettings) {
			// oLocalSettings[key].val = result[key] || false;
		// }
		// resolve(oLocalSettings);
	// })
	
	console.log('settings: ');
	aNames.forEach(function(sKey){
		console.dir(sKey);
		oLocalSettings[key].val = localStorage.getItem(sKey) || false;
	});
	resolve(oLocalSettings);
}) 

oSettingsPropmise.then(implementSettings);

// API.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// if(request.src) {
		// var o = {};
		// o[request.src] = {val: request.val};
		// if(oLocalSettings[request.src] != undefined) {
			// implementSettings(o);
		// }
	// }
// });

// settings panel styles

function createPanelStyles(){
	function addStyle(styles) { 
				
			/* Create style element */ 
			var css = document.createElement('style'); 
			css.type = 'text/css'; 
 
			if (css.styleSheet)  
					css.styleSheet.cssText = styles; 
			else  
					css.appendChild(document.createTextNode(styles)); 
				
			/* Append style to the head element */ 
			document.getElementsByTagName("head")[0].appendChild(css); 
	} 

	addStyle(sPanelStyle)
}

function inputPress(){
	var sParam = this.dataset.param;
	var bVal = this.checked; 
	
	var o= {};
	o[sParam] = bVal;
	
	//API.runtime.sendMessage(o);
	
	if(oLocalSettings[sParam] != undefined) {
		implementSettings(o);
	}
}

// create settings panel

function createSettingsPanel() {
	try{
		let sUser = document.querySelector("#dropdown-user .username").innerText;
		let bPage = window.location.pathname == "/settings/profile/";
		if(bPage && (sUser == 'shadeofsky' || sUser == 'Вомбат')){
			//let sForm = "";
			//let aGroups = [];
			let oPanel = document.createElement('div');
			oPanel.id = 'extra_options';
			
			aFormData.forEach(function(oGroup){
				//let aGroup = [];
				oGroup.inputs.forEach(function(oInput){
					let sParam = oInput.key;
					let sId = "toggle_"+sParam;
					let sLabel = oInput.label;
					//let sInput = `<input type="checkbox" data-param="${sParam}" id="${sId}"> <label for="${sId}">${sLabel}</label>`;
					
					let oCheckbox = document.createElement('input');
					oCheckbox.type = 'checkbox';
					oCheckbox.dataset.param = sParam;
					oCheckbox.id = sId;
					oCheckbox.onclick = inputPress;
					
					let oLabel = document.createElement('label');
					oLabel.setAttribute("for", sId);				
					oLabel.innerHTML = sLabel;
					
					oPanel.appendChild(oCheckbox);
					oPanel.appendChild(oLabel);
					//aGroup.push(sInput);
				});
				let oHR = document.createElement('hr');
				oPanel.appendChild(oHR);
				
				//aGroups.push(aGroup.join("\r\n"));
			});
			//sForm = aGroups.join("<hr>");
			//sForm = `<div id="extra_options">${sForm}</div>`;
			
			document.querySelector("#content").appendChild(oPanel);
			createPanelStyles();
		}	
	} catch (err) {
		
	}
}

// main functions

function setGlobalCss(sStyle) {
	var aStyles = document.querySelectorAll('head style[data-ext=IMF]');
	var oCustomStyle;
	if(aStyles[0]) {
		oCustomStyle = aStyles[0];		
		//var sCss = oCustomStyle.innerHTML;
		oCustomStyle.innerHTML = sStyle;
	} else {
		var sNewCss = document.createElement("style");
		sNewCss.setAttribute("data-ext", "IMF");
		sNewCss.appendChild(document.createTextNode(sStyle));
		if(document.head){
			document.head.appendChild(sNewCss);
		}
	}
}

function getMyId(){
	var sMyUsername = document.querySelector("#header .username").innerText;
	var sProfName = document.querySelector(".profile h2.user-login").innerText;
	if(sMyUsername == sProfName) {
		var oVoter = doqument.querySelector("#content .vote-topic");
		var sId = oVoter.getAttribute("Id");
		var oId = sId.match(/vote_area_user_(\d+)/);
		if(oId && oId[1]) {
			return oId[1];
		} else {			
			return -2;
		}
	}
	return -1;
}
function hideMyCarma() {
	var nId = getMyId();
	if(nId>-1) {
		
	}
}


var isInViewport = function (elem) {
	if(!elem) {
		return false;
	}
	if(elem.length && elem.length>0) {
		elem = elem[0];
	}
	try{
		var bounding = elem.getBoundingClientRect();
		return (
				bounding.top <= window.innerHeight-200 && bounding.top > 0
		);
	} catch (err) {
		console.dir(err);
		console.dir(elem);
	}
}
var isAboveViewport = function (elem) {
	var bounding = elem.getBoundingClientRect();
	return (
			bounding.top <= -90
	);
};

function startStalkScroll(bForce) {
	var oContent = document.getElementById("content");
	if(oContent && oContent.classList)
		oContent.classList.add("sideTransition");
	
	window.onscroll = scrollReaction;
	if(bForce) {
		scrollReaction();
	}
}
function scrollReaction() {
		clearTimeout(oTimer);
		if(oLocalParameters.bScrollActive) {
			oLocalParameters.bScrollActive = false;
		} else {
		oTimer = setTimeout(function(){
			
			hideSidebar();
			minimiseLeftPadding();
						
			clearTimeout(oTimer);
		}, 100);
	}
		
		// oCommentWrappers
}

function hideSidebar() {
	if(oLocalSettings.bHideCommentSidebar.val){
		var oComments = document.getElementById("comments");
		var oSidebar = document.getElementById("sidebar");
		var oContent = document.getElementById("content");
		
		if(isInViewport(oComments)) {
			oSidebar.style.display = "none";
			//oContent.style.marginRight = "0";
			if(oContent.classList)
				oContent.classList.add("sideHidden");
		} else {
			if(oSidebar)
				oSidebar.style.display = "block";	
			//oContent.style.marginRight = "";	
			if(oContent && oContent.classList)
				oContent.classList.remove("sideHidden");	
		}
	}
}

function minimiseLeftPadding() {
	if(!oLocalParameters.Loaded || !oLocalSettings.bHideCommentLeftPadding.val) {
		return;
	}
	try{
		var oCommentWrappers = document.getElementsByClassName("comment-wrapper");
		let nPad = 0;
		var bChange = false;
					
		for(let i=0; i<oCommentWrappers.length; i++){
			if(isAboveViewport(oCommentWrappers[i])) {
				if(oCommentWrappers[i].className.indexOf("hideCommentLeftPadding")<0) {
					const style = getComputedStyle(oCommentWrappers[i]);
					if(style['padding-left'].replace(/[^\d]/g,"")>10){
						oCommentWrappers[i].classList.add("hideCommentLeftPadding");
						nPad++;
						bChange = true;
					}
				}
			} else {
				if(oCommentWrappers[i].className.indexOf("hideCommentLeftPadding")>-1)
					oCommentWrappers[i].classList.remove("hideCommentLeftPadding");		
					bChange = true;			
			}
		}
		//console.log("nPad: "+nPad);
		oLocalParameters.bScrollActive = true;
		clearTimeout(oTimerPadding);
		oTimerPadding = setTimeout(function(){			
			if(/comment\d/.test(window.location.hash) && bChange){
				var oId = window.location.hash.match(/comment(\d+)/i);
				if(oId && oId[1]) {
					var oEl = document.getElementById("comment_content_id_"+oId[1]);
					if(oEl && !isInViewport(oEl)) {
						oLocalParameters.bScrollActive = false;
						scrollToComment(null, null, true, true);
					}
				}				
			}
			clearTimeout(oTimerPadding);;
		}, 250);
	} catch(err){
		
	}
}

	
// Прокрутка к комментарию
function scrollToComment (idComment, bRemoveNewnest, bShowFromUrl, bFromPadding) {
	
		var bAuto = false;
		if(bShowFromUrl){
			var sUrl = location.hash;
			var oId = sUrl.match(/comment(\d+)/i);
			if(oId && oId[1]) {
				idComment = oId[1];
				bAuto= true;
			}
		} else  if(!idComment) {
			var aNewComments = document.getElementsByClassName("comment-new");
			if(aNewComments && aNewComments.length) {
				var sId = aNewComments[0].getAttribute("id");
				var oId = sId.match(/comment_id_(\d+)/);
				if(oId && oId[1]) {
					idComment = oId[1];
					bAuto= true;
				}
			}
		} else {
			
		}
		
		if(!idComment) {
			return;
		}
		var element = document.getElementById('comment_id_' + idComment);
		try{
			var aCurrs = document.getElementsByClassName("comment-current");
			for(let i=0; i<aCurrs.length; i++) {
				aCurrs[i].classList.remove("comment-cur");
			}
		} catch (err) {
			
		}
		try{
			var aCurrs = document.getElementsByClassName("comment-cur");
			for(let i=0; i<aCurrs.length; i++) {
				aCurrs[i].classList.remove("comment-cur");
			}
		} catch (err) {
			
		}
		/**/
		/**/
		element.classList.add("comment-cur");
		var offset = getCoords(element).top; //$(element).offset().top;
		var h = window.innerHeight;
		//console.log('Scroll to comment: ', element, offset);
		
		
		window.scrollTo({
			top: offset-h/4-30/*/,
			behavior: "smooth"/**/
		});
		window.scrollTo({
			top: offset-h/4/**/,
			behavior: "smooth"/**/
		});
		oLocalParameters.bScrollActive = false;
		
		if(bFromPadding) {
			setTimeout(function(){
				removeHash();
			}, 1000);
		}
		
		var oProm = new Promise(function(resolve, reject) {
			if(element.classList && bRemoveNewnest){
				setTimeout(function(){element.classList.remove("comment-new"); resolve()}, 500);
			} else {
				resolve()
			}
		})
		return oProm;
		
};
function removeHash () { 
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
    else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}
function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

function setCommentsTree(){
	if(!oLocalSettings.bShowCommentsTree.val) {
		return;
	}
	var aCommentWrappers = document.getElementsByClassName("comment-wrapper");
	var oComData={};
	for(let i=0; i<aCommentWrappers.length; i++) {
		let aChildNodes = aCommentWrappers[i].childNodes;
		for(let j=0; j<aChildNodes.length; j++) {
			
			let oCurrentNode = aChildNodes[j];// debugger;
			if(oCurrentNode.className == "comment-wrapper"){
				try{
					let nChildrenCount = oCurrentNode.getElementsByClassName("comment-wrapper").length;
					if(nChildrenCount==0) {
						
						let aComments = oCurrentNode.getElementsByClassName("comment");
						
						for(let k=0; k<aComments.length; k++) {
							let sScriptLink = aComments[k].getElementsByClassName("comment-info")[0].getElementsByClassName("goto-comment-parent")[0].getElementsByTagName("a")[0].getAttribute("onclick");
							
							let oLink = sScriptLink.match(/goToParentComment\(\d+,(\d+)\)/);
							if(oLink && oLink[1]){
								
								var sRootId = "comment_wrapper_id_"+oLink[1];
								
								if(document.getElementById(sRootId).parentNode == oCurrentNode.parentNode){
									console.log(document.getElementById(sRootId).parentNode.getAttribute('id'));
									console.log(oCurrentNode.parentNode.getAttribute('id'));
									
									// commentBefore

									aComments[k].parentNode.classList.add("backgroundCommentGap");
									
									const style = getComputedStyle(document.getElementById(sRootId));
									
									var nPadding = 1;
									if(oComData[sRootId]) {
										nPadding = oComData[sRootId];
									}
									var nNewPadding = nPadding+1;
									oComData[aComments[k].parentNode.getAttribute('id')] = nNewPadding;
									aComments[k].parentNode.style.paddingLeft = Number(getComputedStyle(aComments[k].parentNode).paddingLeft.replace(/[^\d]/g,"")) + (nNewPadding * 10)+"px";
								}
							}
						}
					}
					
					
				} catch(err) {
					
				}
			}
		}
	}
	

}

///////////////////////////////
// votes update handler

function setVoteCounterHandler(bActive){
	var aCounters = document.getElementsByClassName("comment-wrapper");
	var config = { attributes: true, childList: true, subtree: true };
	
	for (let i=0; i<aCounters.length; i++) {
		// Create an observer instance linked to the callback function
		var observer = new MutationObserver(handleVoteCount);

		// Start observing the target node for configured mutations
		if(bActive != undefined && bActive == false) {
			observer.disconnect();
		} else {
			observer.observe(aCounters[i], config);
			processVoteCount(aCounters[i]);
		}
	}
}

function handleVoteCount(mutationsList, observer){
	var aSelectors = [];
	for(var mutation of mutationsList) {
		if (mutation.type == 'childList') {
				//console.log('A child node has been added or removed.');
				for (let j=0; j<mutationsList.length; j++) {
					var oElem = mutationsList[j].target;
					var id = oElem.getAttribute("id");
					if(aSelectors.indexOf(id)<0) {
						aSelectors.push(id);
						processVoteCount(oElem);
					}
				}
		}
		else if (mutation.type == 'attributes') {
				//console.log('The ' + mutation.attributeName + ' attribute was modified.');
		}
	}
}

function processVoteCount(oElem){
	var sId = oElem.getAttribute("id");
	var oEl = document.querySelector("#"+sId+" .vote-count a") || document.querySelector("#"+sId+" .vote-count");
	if(oEl) {
		var sText = oEl.textContent;
		if(Number(sText)<0) {
			oEl.textContent = 0;
		}
	}
}

///////////////////////////////
// POST votes update handler

function setPostVoteCounterHandler(bActive){
	var aCounters = document.getElementsByClassName("vote-topic");
	var config = { attributes: true, childList: true, subtree: true };
	
	for (let i=0; i<aCounters.length; i++) {
		// Create an observer instance linked to the callback function
		var observer = new MutationObserver(handlePostVoteCount);

		// Start observing the target node for configured mutations
		if(bActive != undefined && bActive == false) {
			observer.disconnect();
		} else {
			observer.observe(aCounters[i], config);
			processPostVoteCount(aCounters[i]);
		}
	}
}

function handlePostVoteCount(mutationsList, observer){
	var aSelectors = [];
	for(var mutation of mutationsList) {
		if (mutation.type == 'childList') {
			//console.log('A child node has been added or removed.');
			for (let j=0; j<mutationsList.length; j++) {
				var oElem = mutationsList[j].target;
				var id = oElem.getAttribute("id");
				if(aSelectors.indexOf(id)<0) {
					aSelectors.push(id);
					processPostVoteCount(oElem);
				}
			}
		}
		else if (mutation.type == 'attributes') {
				//console.log('The ' + mutation.attributeName + ' attribute was modified.');
		}
	}
}

function processPostVoteCount(oElem){
	var sId = oElem.getAttribute("id");
	var oId = sId.match(/vote_area_topic_(\d+)/);
	if(oId && oId[1]) {
		var nId = oId[1];
		var oEl = document.querySelector("#vote_total_topic_"+nId);
		if(oEl) {
			var sText = oEl.textContent;
			if(Number(sText)<0) {
				oEl.textContent = 0;
			}
		}
	}
	
}

///////////////////////////////
// newComments update handler

function setNewCommentsCounterHandler(bActive){
	var oCounter = document.getElementById("update");
	if(oCounter){
		var config = { attributes: true, childList: true, subtree: true };
		var observer = new MutationObserver(handleNewCommentsCount);

		if(bActive != undefined && bActive == false) {
			observer.disconnect();
		} else {
			observer.observe(oCounter, config);
			//reorderNewCommentsByBranches();
		}
			redefineNewxtCommentButton();
			defineGoToFirstCommentButton();
	}	
}

function handleNewCommentsCount(mutationsList, observer){
	if( mutationsList[0].target != document.getElementById("newest_comments_counter") &&
		(!mutationsList[2] || 
		mutationsList[2] && mutationsList[2].removedNodes[0] && mutationsList[2].removedNodes[0].getAttribute && mutationsList[2].removedNodes[0].getAttribute("id") != "newest_comments_counter") ||
		mutationsList[3] && mutationsList[3].addedNodes && mutationsList[3].addedNodes[0] && mutationsList[3].addedNodes[0].data && mutationsList[3].addedNodes[0].data >0
	) {
		clearTimeout(oTimerNewComments);
		oTimerNewComments = setTimeout(function(){
			redefineNewxtCommentButton();			
			defineGoToFirstCommentButton();
			clearTimeout(oTimerNewComments);
		}, 100);
	}
	//reorderNewCommentsByBranches();
}
function redefineNewxtCommentButton(){
	var oOldButton = document.getElementById("new_comments_counter");
	var oNewButton = document.getElementById("newest_comments_counter");
	if(oOldButton && oLocalSettings.bNewCommnetOrderBranch.val) {
		let aNewComments = document.getElementsByClassName("comment-new");
		let nNewComments = document.getElementById("new_comments_counter").innerText;
		let nNewComs =  aNewComments.length;
		if(oNewButton) {
		} else {
			let sNewButton = '<a href="#" class="new-comments" id="newest_comments_counter" title="Число новых комментариев">'+nNewComs+'</a>';
			oNewButton = document.createElement('a');
			oNewButton.setAttribute("href", "#");
			oNewButton.setAttribute("class", "new-comments");
			oNewButton.setAttribute("id", "newest_comments_counter");
			oNewButton.setAttribute("title", "Число новых комментариев");
			oOldButton.parentNode.appendChild(oNewButton);
			oNewButton.onclick = goToNextNewComment;
		}
		
		oNewButton.innerHTML = nNewComs;
		if(nNewComs == 0) {
			oOldButton.parentNode.removeChild(oNewButton);
			// try{
				// var aCurrs = document.getElementsByClassName("comment-cur");
				// for(let i=0; i<aCurrs.length; i++) {
					// aCurrs[i].classList.remove("comment-cur");
				// }
			// } catch (err) {
				
			// }
		}
		
	} else {
		if(oNewButton) {
			oOldButton.parentNode.removeChild(oNewButton);
		}
	}
	
}
function defineGoToFirstCommentButton(){
	var oOldButton = document.getElementById("new_comments_counter");
	var oFirstCommentButton = document.getElementById("first_comment_button");
	if(oOldButton && oLocalSettings.bHideCommentLeftPadding.val) {
		let aNewComments = document.getElementsByClassName("comment-new");
		let nNewComments = document.getElementById("new_comments_counter").innerText;
		let nNewComs =  aNewComments.length;
		
		if(!oFirstCommentButton){
			oFirstCommentButton = document.createElement('button');
			oFirstCommentButton.setAttribute("id", "first_comment_button");
			oFirstCommentButton.setAttribute("class", "firstCommentButton");
			oFirstCommentButton.setAttribute("title", "Перейти к первому/выбранному комментарию");
			oFirstCommentButton.innerHTML ="§";
			oFirstCommentButton.addEventListener('click', function(){
					goToNextNewComment(false);
			});
			oOldButton.parentNode.appendChild(oFirstCommentButton);

		}
		
		if(nNewComs == 0 && !/comment\d+/.test(location.hash) && !document.getElementsByClassName("comment-cur")) {
			oOldButton.parentNode.removeChild(oFirstCommentButton);
		}
		
	} else {
		if(oFirstCommentButton) {
			oOldButton.parentNode.removeChild(oFirstCommentButton);
		}
	}
}

function goToNextNewComment(bFull) {
	var oButton = document.getElementById("new_comments_counter");
	var aNewComments = document.getElementsByClassName("comment-new");

	if(aNewComments.length>0) {
		var sId = aNewComments[0].getAttribute("id");
		var oId = sId.match(/comment_id_(\d+)/);
		if(oId && oId[1]) {			
			oLocalParameters.latestNewCommentId = oId[1];
			var oWait = scrollToComment(oId[1], true);
			if(bFull !== false){
				if(history.pushState) {
					history.pushState(null, null, "#comment"+oId[1]);
				}
				else {
					location.hash = "#comment"+oId[1];
				}
				//window.location.hash = "#comment"+oId[1];
				oWait.then(function(){
					setTimeout(function(){
						redefineNewxtCommentButton();
					}, 100);
				});
			}
			
		}
	} else {
		if(bFull !== false) {
			try{
				var aCurrs = document.getElementsByClassName("comment-cur");
				for(let i=0; i<aCurrs.length; i++) {
					aCurrs[i].classList.remove("comment-cur");
				}
			} catch (err) {
				
			}
			redefineNewxtCommentButton();
		} else {
			var oId = window.location.hash.match(/comment(\d+)/i);
			// comment comment-cur
			var aCurrs = document.getElementsByClassName("comment-cur");
			if(aCurrs && aCurrs[0]) {
				var sId = aCurrs[0].getAttribute("Id");
				var oId2 = sId.match(/comment_id_(\d+)/);				
			}
			let sNormId = oId && oId[1] || oId2 && oId2[1];
			if(sNormId) {
				var oEl = document.getElementById("comment_content_id_"+sNormId);
				if(oEl && !isInViewport(oEl)) {
					oLocalParameters.bScrollActive = false;
					scrollToComment(sNormId, true);
				}
			}				
		}
	}
	return false;
}