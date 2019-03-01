var oLocalSettings = {
	bHideCommentPlus: {
		val: true,
		css: ".comment-wrapper .vote-up{display: none !important;}"
	},
	
	bHideCommentResult: {
		val: true,
		css: ".comment-wrapper .vote-count{display: none !important;}"
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
		css: ".comment-wrapper{transition: padding-left 0.4s; } .hideCommentLeftPadding{padding-left: 5px !important;} .backgroundCommentGap{background-image: linear-gradient(90deg, #ffffff 48.08%, #f0f6fa 48.08%, #f0f6fa 50%, #ffffff 50%, #ffffff 98.08%, #f0f6fa 98.08%, #f0f6fa 100%); background-size: 104.00px 104.00px;} .comment-cur .comment-content{box-shadow: 0 0 1px 3px #8BC34A;} .comment{max-width: 700px}"
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
	
	if(oLocalSettings.bShowCommentsTree.val && oSettings!=0) {
		// tree comments
		setCommentsTree();
	}
}	
implementSettings(0);
startStalkScroll(true);
var oSettingsPropmise = new Promise (function(resolve, reject){
	chrome.storage.sync.get([
		'bHideCommentPlus', 
		'bHideCommentResult', 
		'bHideCommentSidebar', 
		'bShowCommentsTree', 
		'bHideCommentLeftPadding'
	], function(result) {
		console.log('settings: ');
		console.dir(result);
		oLocalSettings.bHideCommentPlus.val = result.bHideCommentPlus || false;
		oLocalSettings.bHideCommentResult.val = result.bHideCommentResult || false;
		oLocalSettings.bHideCommentSidebar.val = result.bHideCommentSidebar || false;
		oLocalSettings.bShowCommentsTree.val = result.bShowCommentsTree || false;
		oLocalSettings.bHideCommentLeftPadding.val = result.bHideCommentLeftPadding || false;
		resolve(oLocalSettings);
	})
}) 

oSettingsPropmise.then(implementSettings);

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.src) {
		switch(request.src) {
			case "bHideCommentPlus":
				implementSettings({bHideCommentPlus: {val: request.val}});
				break;
			case "bHideCommentResult":
				implementSettings({bHideCommentResult: {val: request.val}});
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
		document.head.appendChild(sNewCss);
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
					oSidebar.style.display = "block";	
					//oContent.style.marginRight = "";	
					if(oContent.classList)
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
		console.log("nPad: "+nPad);
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
									
									//aComments[k].parentNode.style.backgroundColor = "#edf4fe";
									aComments[k].parentNode.classList.add("backgroundCommentGap");
									backgroundCommentGap
									const style = getComputedStyle(document.getElementById(sRootId));
									
									var nPadding = style['padding-left'].replace(/[^\d]/g,"") ;//aComments[k].parentNode.style.paddingLeft.replace(/[^\d]/g,"");
									if(oComData[sRootId]) {
										nPadding = oComData[sRootId];
									}
									var nNewPadding = Number(nPadding)+10;
									oComData[aComments[k].parentNode.getAttribute('id')] = nNewPadding;
									aComments[k].parentNode.style.paddingLeft = nNewPadding+"px";
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

//alert(2);
