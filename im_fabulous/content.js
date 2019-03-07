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
		css: ".comment-wrapper .vote-count{display: none !important;}"
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
		css: ".comment-wrapper{transition: padding-left 0.4s; } .hideCommentLeftPadding{padding-left: 5px !important;} .backgroundCommentGap{background-image: linear-gradient(90deg, #ffffff 43%, #e0e0e0c7 43.5%, #f0f6fa 43.6%, #ffffff 46.7%, #ffffff 98.08%, #f0f6fa 98.08%, #f0f6fa 100%);     background-size: 90.00px 100.00px;     background-repeat-x: no-repeat;} .comment-cur .comment-content{box-shadow: 0 0 1px 3px #8BC34A;} "
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
		css: "html, #container{background: #222} #nav, #wrapper, #footer, aside.toolbar{filter: invert(0.9) hue-rotate(210deg);} #nav img, #wrapper img, #footer img{filter: invert(1.1) hue-rotate(-210deg);}"
	}
};
var oTimer;
var oLocalParameters = {
	bScroolActive: false
};

document.addEventListener("DOMContentLoaded", function(){oLocalParameters.DOMLoaded = true});
//document.addEventListener("onload ", );
window.onload = function(){oLocalParameters.Loaded = true; minimiseLeftPadding();}
	
	
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
	}
	
	
}	

implementSettings(0);
startStalkScroll(true);

var oSettingsPropmise = new Promise (function(resolve, reject){
	var aNames = [];
	for (let key in oLocalSettings) {
		aNames.push(key)
	}
	//oLocalSettings.map(el => el.)
	chrome.storage.sync.get(aNames/*[
		'bHideCommentPlus', 
		'bHideCommentMinus',
		'bHideCommentNegative', 
		'bHideCommentResult', 
		'bHidePostMinus',
		'bHidePostNegative', 
		'bHideCommentSidebar', 
		'bShowCommentsTree', 
		'bHideCommentLeftPadding'
	]*/, function(result) {
		console.log('settings: ');
		console.dir(result);
		var oResp = {};
		for (let key in oLocalSettings) {
			oLocalSettings[key].val = result[key] || false;
		}/*
		oLocalSettings.bHideCommentPlus.val = result.bHideCommentPlus || false;
		oLocalSettings.bHideCommentMinus.val = result.bHideCommentMinus || false;
		oLocalSettings.bHideCommentNegative.val = result.bHideCommentNegative || false;
		oLocalSettings.bHideCommentResult.val = result.bHideCommentResult || false;
		oLocalSettings.bHidePostMinus.val = result.bHidePostMinus || false;
		oLocalSettings.bHidePostNegative.val = result.bHidePostNegative || false;
		oLocalSettings.bHideCommentSidebar.val = result.bHideCommentSidebar || false;
		oLocalSettings.bShowCommentsTree.val = result.bShowCommentsTree || false;
		oLocalSettings.bHideCommentLeftPadding.val = result.bHideCommentLeftPadding || false;*/
		resolve(oLocalSettings);
	})
}) 

oSettingsPropmise.then(implementSettings);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.src) {
		var o = {};
		o[request.src] = {val: request.val};
		if(oLocalSettings[request.src] != undefined) {
			implementSettings(o);
		}
		
		/*
		switch(request.src) {
			case "bHideCommentPlus":
				implementSettings({bHideCommentPlus: {val: request.val}});
				break;
			case "bHideCommentMinus":
				implementSettings({bHideCommentMinus: {val: request.val}});
				break;
			case "bHideCommentNegative":
				implementSettings({bHideCommentNegative: {val: request.val}});
				break;
			case "bHideCommentResult":
				implementSettings({bHideCommentResult: {val: request.val}});
				break;
			case "bHidePostMinus":
				implementSettings({bHidePostMinus: {val: request.val}});
				break;
			case "bHidePostNegative":
				implementSettings({bHidePostNegative: {val: request.val}});
				break;
			case "bHideCommentSidebar":
				implementSettings({bHideCommentSidebar: {val: request.val}});
				break;
			case "bShowCommentsTree":
				implementSettings({bShowCommentsTree: {val: request.val}});
				break;
			case "bHideCommentLeftPadding":
				implementSettings({bHideCommentLeftPadding: {val: request.val}});
				break;
		}
		*/
	}
});


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
	var sProfName = doqument.querySelector(".profile h2.user-login").innerText;
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
	/*var oComments = document.getElementById("comments");
	var oCommentWrappers = document.getElementsByClassName("comment-wrapper");
	var oSidebar = document.getElementById("sidebar");*/
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
		if(oLocalParameters.bScroolActive) {
			oLocalParameters.bScroolActive = false;
		} else {
			oTimer = setTimeout(function(){
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
				
				minimiseLeftPadding();
				setTimeout(function(){
					// focus on current comment
					var oCurrCom = document.querySelector(".comment-current");
					var sHash = location.hash;
					var sId;
					
					if(oCurrCom) {
						var sElementId = oCurrCom.getAttribute("id");
						var oId = sElementId.match(/comment_id_(\d+)/);
						if(oId && oId[1]) {
							sId = oId[1];
						}
					}
					if(sHash) {
						var oHash = sHash.match(/comment(\d+)/);
						if(oHash && oHash[1] /*&& oHash[1] != oLocalParameters.sHashComment*/) {
							sId = oHash[1];
							//oLocalParameters.sHashComment = sId
							//location.hash = "";
						}
					}
					
					if(sId /*&& sId != oLocalParameters.sHashComment*/ && oLocalParameters.bScroolActive == false) {
						oLocalParameters.bScroolActive = true;
						scrollToComment(sId);
					}
				}, 1500);
				
				
				clearTimeout(oTimer);
			}, 100);
		}
		
		// oCommentWrappers
}

function minimiseLeftPadding() {
	if(!oLocalParameters.Loaded)
		return;
	try{
		var oCommentWrappers = document.getElementsByClassName("comment-wrapper");
		let nPad = 0;
					
		for(let i=0; i<oCommentWrappers.length; i++){
			if(isAboveViewport(oCommentWrappers[i])) {
				if(oCommentWrappers[i].className.indexOf("hideCommentLeftPadding")<0) {
					const style = getComputedStyle(oCommentWrappers[i]);
					if(style['padding-left'].replace(/[^\d]/g,"")>10){
						oCommentWrappers[i].classList.add("hideCommentLeftPadding");
						nPad++;
					}
				}
			} else {
				if(oCommentWrappers[i].className.indexOf("hideCommentLeftPadding")>-1)
					oCommentWrappers[i].classList.remove("hideCommentLeftPadding");					
			}
		}
		//console.log("nPad: "+nPad);
		oLocalParameters.bScroolActive = true;
	} catch(err){
		
	}
}

	
// Прокрутка к комментарию
function scrollToComment (idComment) {
	if(!oLocalParameters.Loaded || oLocalParameters.sHashComment == idComment)
		return;
	
	oLocalParameters.sHashComment = idComment;
	
		var element = document.querySelector('#comment_id_' + idComment);
		try{
			var aCurrs = document.getElementsByClassName("comment-current");
			for(let i=0; i<aCurrs.length; i++) {
				aCurrs[i].classList.remove("comment-cur");
			}
		} catch (err) {
			
		}
		element.classList.add("comment-cur");
		var offset = getCoords(element).top; //$(element).offset().top;
		console.log('Scroll to comment: ', element, offset);

		//$.scrollTo('#comment_id_' + idComment, 1000, {offset: -250});
		
		window.scrollTo({
			top: offset-150/*,
			behavior: "smooth"*/
		});
		oLocalParameters.bScroolActive = false;
		
/*/
		if (this.iCurrentViewComment) {
				$('#comment_id_' + this.iCurrentViewComment).removeClass(this.options.classes.comment_current);
		}
		$('#comment_id_' + idComment).addClass(this.options.classes.comment_current);
		this.iCurrentViewComment = idComment;
		/**/
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
									//document.getElementById(sRootId).classList.add("commentBefore");
									//aComments[k].parentNode.style.backgroundColor = "#edf4fe";
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
