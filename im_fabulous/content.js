"use strict";

const API = (window.navigator.vendor=="Google Inc.")? chrome : browser;

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
		css: ".comment-wrapper{transition: padding-left 0.4s; } .hideCommentLeftPadding{padding-left: 5px !important;} .backgroundCommentGap{background-image: linear-gradient(90deg, #ffffff 43%, #e0e0e0c7 43.5%, #f0f6fa 43.6%, #ffffff 46.7%, #ffffff 98.08%, #f0f6fa 98.08%, #f0f6fa 100%);     background-size: 90.00px 100.00px;     background-repeat-x: no-repeat;} .comment-cur .comment-content{box-shadow: 0 0 1px 3px #8BC34A !important;} .comments, .comment-content{transition: background .4s, border-color .4s, box-shadow .4s}"
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
		css: ".comment{max-width: 700px}"
	},
	
	bOwnCarma: {
		val: true,
		css: ".dropdown-user-menu .item-stat{display: none} .vote-profile{display: none}"
	},
	
	bThemeReverse: {
		val: true,
		css: "html, body, #container{background: #222} #nav, #wrapper, #footer, aside.toolbar, .to_top.mini{filter: invert(0.9) hue-rotate(190deg);} #nav img, #wrapper img, #footer img, #nav iframe, #wrapper iframe, #footer iframe{filter: invert(1.1) hue-rotate(-190deg);} .text{color: #444} .comment.comment-current .comment-content{background: #def4c8}"
	},
	
	bNewCommnetOrderBranch: {
		val: false,
		css: "#new_comments_counter{display: none !important}"
	}
};
var oTimer, oTimerPadding;
var oLocalParameters = {
	bScrollActive: false
};

document.addEventListener("DOMContentLoaded", function(){oLocalParameters.DOMLoaded = true});
//document.addEventListener("onload ", );
window.onload = function(){oLocalParameters.Loaded = true; minimiseLeftPadding(); setNewCommentsCounterHandler();}
	
	
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
	API.storage.sync.get(aNames, function(result) {
		console.log('settings: ');
		console.dir(result);
		var oResp = {};
		for (let key in oLocalSettings) {
			oLocalSettings[key].val = result[key] || false;
		}
		resolve(oLocalSettings);
	})
}) 

oSettingsPropmise.then(implementSettings);

API.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.src) {
		var o = {};
		o[request.src] = {val: request.val};
		if(oLocalSettings[request.src] != undefined) {
			implementSettings(o);
		}
	}
});
/*
API.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.src) {
		var o = {};
		o[request.src] = {val: request.val};
		if(oLocalSettings[request.src] != undefined) {
			implementSettings(o);
		}
	}
});
*/


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
		var oId = sId.match("/vote_area_user_(\d+)/");
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
				bounding.top <= window.innerHeight-200
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
				oLocalParameters.bScrollActive = false;
				scrollToComment();
			}
			clearTimeout(oTimerPadding);;
		}, 50);
	} catch(err){
		
	}
}

	
// Прокрутка к комментарию
function scrollToComment (idComment, bRemoveNewness) {
	
		var bAuto = false;
		if(!idComment) {
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
		
		var oProm = new Promise(function(resolve, reject) {
			if(element.classList && bRemoveNewness){
				setTimeout(function(){element.classList.remove("comment-new"); resolve()}, 500);
			} else {
				resolve()
			}
		})
		return oProm;
		
};
function getCoords(elem) { // кроме IE8-
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

function setCommentsTree(){
	var aCommentWrappers = document.getElementsByClassName("comment-wrapper");
	var oComData={};
	for(let i=0; i<aCommentWrappers.length; i++) {
		let aChildNodes = aCommentWrappers[i].childNodes;
		for(let j=0; j<aChildNodes.length; j++) {
			//			console.log("j: "+j);
			//			console.log("aChildNodes.length: "+aChildNodes.length);
			let oCurrentNode = aChildNodes[j];// debugger;
			if(oCurrentNode.className == "comment-wrapper"){
				try{//debugger;
					let nChildrenCount = oCurrentNode.getElementsByClassName("comment-wrapper").length;
					if(nChildrenCount==0) {
						//console.log(oCurrentNode.getAttribute('id'));
						//continue;
						let aComments = oCurrentNode.getElementsByClassName("comment");
						//if(aComments.length>1) console,log(aComments.length);
						for(let k=0; k<aComments.length; k++) {
							let sScriptLink = aComments[k].getElementsByClassName("comment-info")[0].getElementsByClassName("goto-comment-parent")[0].getElementsByTagName("a")[0].getAttribute("onclick");
							// "ls.comments.goToParentComment(219740,219674); return false;"
							let oLink = sScriptLink.match(/goToParentComment\(\d+,(\d+)\)/);
							if(oLink && oLink[1]){
								//debugger;
								//aComments[k].style.backgroundColor = "red";
								// comment_wrapper_id_219950
								var sRootId = "comment_wrapper_id_"+oLink[1];
								//.parentNode
								if(document.getElementById(sRootId).parentNode == oCurrentNode.parentNode){
									console.log(document.getElementById(sRootId).parentNode.getAttribute('id'));
									console.log(oCurrentNode.parentNode.getAttribute('id'));
									
									// commentBefore

									aComments[k].parentNode.classList.add("backgroundCommentGap");
									//backgroundCommentGap
									const style = getComputedStyle(document.getElementById(sRootId));
									
									//var nPadding = style['padding-left'].replace(/[^\d]/g,"") ;//aComments[k].parentNode.style.paddingLeft.replace(/[^\d]/g,"");
									var nPadding = 1;
									//var nTranslate = style['padding-left'].replace(/[^\d]/g,"") ;//aComments[k].parentNode.style.paddingLeft.replace(/[^\d]/g,"");
									if(oComData[sRootId]) {
										nPadding = oComData[sRootId];
									}
									var nNewPadding = nPadding+1;
									oComData[aComments[k].parentNode.getAttribute('id')] = nNewPadding;
									aComments[k].parentNode.style.paddingLeft = (nNewPadding * 10)+"px";
									//aComments[k].parentNode.style.transform = "translate("+nNewPadding+"px)";
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

	}	
}

function handleNewCommentsCount(mutationsList, observer){
	if( mutationsList[0].target != document.getElementById("newest_comments_counter") &&
		(!mutationsList[2] || mutationsList[2] && mutationsList[2].removedNodes[0].getAttribute("id") != "newest_comments_counter")
	) {
		redefineNewxtCommentButton();
	}
	//reorderNewCommentsByBranches();
}
function redefineNewxtCommentButton(){
	var oOldButton = document.getElementById("new_comments_counter");
	var oNewButton = document.getElementById("newest_comments_counter");
	if(oOldButton && oLocalSettings.bNewCommnetOrderBranch.val) {
		let aNewComments = document.getElementsByClassName("comment-new");
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
		}
		
	} else {
		if(oNewButton) {
			oOldButton.parentNode.removeChild(oNewButton);
		}
	}
}
function goToNextNewComment() {
	var oButton = document.getElementById("new_comments_counter");
	var aNewComments = document.getElementsByClassName("comment-new");
	/*if(oLocalParameters.latestNewCommentId && aNewComments && aNewComments.length>0) {
		aNewComments[0].classList.remove("comment-new");
		aNewComments = document.getElementsByClassName("comment-new");
	}*/
	if(aNewComments.length>0) {
		var sId = aNewComments[0].getAttribute("id");
		var oId = sId.match(/comment_id_(\d+)/);
		if(oId && oId[1]) {			
			oLocalParameters.latestNewCommentId = oId[1];
			var oWait = scrollToComment(oId[1], true);
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
	} else {
		try{
			var aCurrs = document.getElementsByClassName("comment-cur");
			for(let i=0; i<aCurrs.length; i++) {
				aCurrs[i].classList.remove("comment-cur");
			}
		} catch (err) {
			
		}
		redefineNewxtCommentButton();
	}
	return false;
}