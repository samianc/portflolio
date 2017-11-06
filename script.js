function randomFlag(){
	return Math.random() < 0.5 ? true : false;
}
function randomizePosition(elm){
	mLeft = Math.floor((Math.random() * 100) + 1);
	if(randomFlag()){
		mLeft *= -1;
	}
	mTop = Math.floor((Math.random() * 100) + 1);
	if(typeof elm.style !== 'undefined'){
		elm.style.left = mLeft+'%';
		elm.style.top = mTop+"%";
	}
}
loopStore = false;
sky = document.getElementById('sky');
sun = document.getElementById('sun');
mainView = document.getElementById('main-view');
town = document.getElementById('town');
header = document.getElementsByTagName('header')[0];
body = document.getElementsByTagName('body')[0];
townPositionTop = town.getBoundingClientRect().top;
sectionTags = body.querySelectorAll("body > section");
function loop()
{
	stars = sky.getElementsByTagName('span');
	for(e in stars){
		randomizePosition(stars[e]);
	}
	loopStore = setTimeout(loop, 4000);
}
window.onblur = function(){
	if(loopStore !== false){
		clearTimeout(loopStore);
	}
	sky.className = "";
};
window.onfocus = function(){
	sky.className = "animate";
	loop();
};
window.onresize = function(){
	mainView.style.minHeight = window.innerHeight+'px';
	sun.style.height = sun.offsetWidth+'px';
}
window.addEventListener("scroll", function(event) {
	if(this.scrollY > 30){
		header.className = 'transition s2 solid';
		if( (this.scrollY + window.innerHeight) > (document.documentElement.offsetHeight-800) ) {
			body.className = 'land';
   		}
   		else{
			bodyClass = 'to-space';
			for(section in sectionTags){
				if(typeof sectionTags[section] === 'object'){
					if(window.innerHeight > sectionTags[section].getBoundingClientRect().top && sectionTags[section].getBoundingClientRect().bottom > 0){
						if(sectionTags[section].hasAttribute("action")){
							bodyClass += ' '+sectionTags[section].getAttribute("action");
						}
						if(sectionTags[section].hasAttribute("in")){
							window[sectionTags[section].getAttribute("in")]();
						}
					}
					else{
						if(sectionTags[section].hasAttribute("out")){
							window[sectionTags[section].getAttribute("out")]();
						}
					}
				}
			}
			body.className = bodyClass;
   		}
	}
	else{
		header.className = 'transition s2';
    	body.className = '';
	}
}, false);
window.onfocus();
window.onresize();
skillsGraph = document.getElementById('skills_graph');
graphBars = skillsGraph.querySelectorAll('.bar');
function scoreIn(){
	setTimeout(function() {
		for(b in graphBars){
			bar = graphBars[b];
			if(typeof bar === 'object'){
				fill = bar.querySelector('.fill');
				fill.style.width = fill.getAttribute('progress')+'%';	
			}
		}
	}, 1000);
}
function scoreOut(){
	for(b in graphBars){
		bar = graphBars[b];
		if(typeof bar === 'object'){
			bar.querySelector('.fill').style.width = 0;
		}
	}	
}
$('form .submit').click(function(){
	elm = $(this);
	if(elm.hasClass('protect')){
		return;
	}
	form = elm.parents('form');
	elm.addClass('protect').text('SENDING');
	$.ajax({
		url: form.attr('action')+'?'+form.serialize(),
		jsonp: "callback",
		dataType: "jsonp",
	}).done(function(){
		elm.removeClass('protect').text(':)');
		setTimeout(function() {
			elm.text('SEND')
		}, 3000);
	}).fail(function(){
		elm.removeClass('protect').text(':( ERROR');
		setTimeout(function() {
			elm.text('SEND')
		}, 3000);
	});
});
console.log('¡ Preparate para algo increible ! :v');