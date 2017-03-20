(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgqBSQgRgRAAgZIABgNQAEgiAbgnQAOgUAfghIAYAYQgcAcgNATIgFAJIAEAAQAZAAARASQASAQAAAZQAAAYgSASQgSASgYAAQgXAAgTgSgAgRAWQgIAHAAALQAAALAIAHQAHAHAKAAQAKAAAIgHQAHgHABgLQgBgLgHgHQgIgIgKAAQgKAAgHAIg");
	this.shape.setTransform(16.6,27.3,2.734,2.734,0,0,0,0.1,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol13, new cjs.Rectangle(0,0,32.8,54.6), null);


(lib.Symbol12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAABkIAAinIgeAAIAHggIA2AAIAADHg");
	this.shape.setTransform(8.6,27.3,2.734,2.734);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAABkIAAinIgeAAIAHggIA2AAIAADHg");
	this.shape_1.setTransform(8.5,27.3,2.734,2.734);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol12, new cjs.Rectangle(0,0,17.1,54.6), null);


(lib.Symbol11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgpBSQgSgRAAgZIAjAAQAAALAHAHQAIAIAKAAQAKAAAIgIQAHgHAAgLQAAgLgHgHQgIgIgKAAIgGAAIAAghIAGAAQAJAAAIgHQAGgHAAgJQAAgKgGgIQgIgHgJAAQgJAAgIAHQgHAIAAAKIggAAQAAgYAQgQQARgRAXAAQAWAAARARQARAQAAAYQAAAWgRAQQAUASAAAaQAAAZgSARQgRASgYAAQgZAAgRgSg");
	this.shape.setTransform(16.5,27.3,2.734,2.734);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgpBSQgSgRAAgZIAjAAQAAALAHAHQAIAIAKAAQAKAAAIgIQAHgHAAgLQAAgLgHgHQgIgIgKAAIgGAAIAAghIAGAAQAJAAAIgHQAGgHAAgJQAAgKgGgIQgIgHgJAAQgJAAgIAHQgHAIAAAKIggAAQAAgYAQgQQARgRAXAAQAWAAARARQARAQAAAYQAAAWgRAQQAUASAAAaQAAAZgSARQgRASgYAAQgZAAgRgSg");
	this.shape_1.setTransform(16.4,27.3,2.734,2.734);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(0,0,32.9,54.6), null);


(lib.Symbol9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AEoAYIgDgCIgEgCIgEgEIAEgDQABADADACQACABAEAAIAEAAIADgCQAAAAABgBQAAAAAAAAQABAAAAgBQAAAAAAAAIABgEIgBgEIgDgDIgJgEIgEAAIgDgCIgCgEIgBgEIABgGIADgDQACgCADgBIAFgBQAEAAADABIAFAFIgDADIgEgDIgFgBQgEgBgDADQgCACAAAEIABADIACADIAPAFIADAFIACAFIgBAFIgDAEIgFADIgGABgACmAVQgEgBgDgEIgEgHIgCgJQAAgEACgEIAFgIIAIgFQADgCAGAAIAFAAIAFADIABAFQgDgDgCAAIgGAAQgGAAgCABQgEACgCADIgEAGIgBAGIABAIQACADADACQACAEAEABIAHABIAFAAIAFgDIAAAFIgFACIgGABQgFAAgFgDgAiZAVQgEgBgEgEIgEgHIgCgJQAAgEACgEIAFgIIAIgFQAEgCAFAAIAFAAIAFADIABAFQgDgDgCAAIgGAAQgFAAgDABQgEACgCADIgEAGIgBAGIABAIIAFAFQACADAEACIAIABIAEAAIAFgDIAAAFIgFACIgGABQgEAAgFgDgADqAXIAAgoIgLAAIAAgFIAcAAIAAAFIgMAAIAAAogABbAXIAAgtIAZAAIAAAFIgUAAIAAAQIASAAIAAADIgSAAIAAAQIAUAAIAAAFgAAmAXIAAgoIgMAAIAAgFIAcAAIAAAFIgMAAIAAAogAgPAXIAAgtIAEAAIAAAtgAg9AXIAAgVIgcAAIAAAVIgEAAIAAgtIAEAAIAAAVIAcAAIAAgVIAEAAIAAAtgAjOAXIgSgWIAAAWIgFAAIAAgtIAJAAQAEAAADACQADABACACIADADIAAAGIAAAEIgDAEQAAAAAAAAQgBABAAAAQgBABAAAAQgBAAAAAAQgCACgDAAIAQATgAjgAAIAFAAIAEAAIADgBIACgDIABgEIgBgDIgCgEIgDgCIgEAAIgFAAgAkPAXIgJgSIgTAAIgJASIgFAAIAYguIAXAugAkpAAIAPAAIgHgOg");
	this.shape.setTransform(86.2,7.1,2.74,2.74,0,0,0,0.1,0.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol9, new cjs.Rectangle(0,0,172,13.2), null);


(lib.Symbol8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhzDhQgwgwAAhEIBeAAQAAAeAVAUQAUAVAcAAQAdAAAVgVQAVgUAAgeQAAgdgVgVQgVgUgdAAIgSAAIAAhcIASAAQAbAAAUgTQASgSAAgbQAAgcgSgUQgUgTgbAAQgbAAgSATQgUAUAAAcIhXAAQAAhBAtgtQAsgtA/AAQBBAAArAtQAtAtAABBQAAA9grAsQA2AyAABHQAABEgwAwQgvAwhFAAQhDAAgwgwg");
	this.shape.setTransform(16.7,27.4,1,1,0,0,0,0.3,0.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(0,0,32.8,54.6), null);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgDBkIAAjHIAHAAIAADHg");
	this.shape.setTransform(1.1,27.3,2.734,2.734);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgDBkIAAjHIAHAAIAADHg");
	this.shape_1.setTransform(1,27.3,2.734,2.734);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(0,0,2.2,54.6), null);


(lib.Symbol6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgqBSQgRgRAAgZIABgNQAEgiAbgnQAOgUAfghIAYAYQgcAcgNATIgFAJIAEAAQAZAAARASQASAQAAAZQAAAYgSASQgSASgYAAQgXAAgTgSgAgRAWQgIAHAAALQAAALAIAHQAHAHAKAAQAKAAAIgHQAHgHABgLQgBgLgHgHQgIgIgKAAQgKAAgHAIg");
	this.shape.setTransform(16.7,27.3,2.734,2.734,0,0,0,0.1,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgqBSQgRgRAAgZIABgNQAEgiAbgnQAOgUAfghIAYAYQgcAcgNATIgFAJIAEAAQAZAAARASQASAQAAAZQAAAYgSASQgSASgYAAQgXAAgTgSgAgRAWQgIAHAAALQAAALAIAHQAHAHAKAAQAKAAAIgHQAHgHABgLQgBgLgHgHQgIgIgKAAQgKAAgHAIg");
	this.shape_1.setTransform(16.6,27.3,2.734,2.734,0,0,0,0.1,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(0,0,32.9,54.6), null);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAABkIAAinIgeAAIAHggIA2AAIAADHg");
	this.shape.setTransform(8.6,27.3,2.734,2.734);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAABkIAAinIgeAAIAHggIA2AAIAADHg");
	this.shape_1.setTransform(8.5,27.3,2.734,2.734);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,17.1,54.6), null);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgpBSQgSgRAAgZIAjAAQAAALAHAHQAIAIAKAAQAKAAAIgIQAHgHAAgLQAAgLgHgHQgIgIgKAAIgGAAIAAghIAGAAQAJAAAIgHQAGgHAAgJQAAgKgGgIQgIgHgJAAQgJAAgIAHQgHAIAAAKIggAAQAAgYAQgQQARgRAXAAQAWAAARARQARAQAAAYQAAAWgRAQQAUASAAAaQAAAZgSARQgRASgYAAQgZAAgRgSg");
	this.shape.setTransform(16.5,27.3,2.734,2.734);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgpBSQgSgRAAgZIAjAAQAAALAHAHQAIAIAKAAQAKAAAIgIQAHgHAAgLQAAgLgHgHQgIgIgKAAIgGAAIAAghIAGAAQAJAAAIgHQAGgHAAgJQAAgKgGgIQgIgHgJAAQgJAAgIAHQgHAIAAAKIggAAQAAgYAQgQQARgRAXAAQAWAAARARQARAQAAAYQAAAWgRAQQAUASAAAaQAAAZgSARQgRASgYAAQgZAAgRgSg");
	this.shape_1.setTransform(16.4,27.3,2.734,2.734);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,32.9,54.6), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Symbol8();
	this.instance.parent = this;
	this.instance.setTransform(16.4,27.2,1,1,0,0,0,16.4,27.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,32.8,54.6);


// stage content:
(lib._33161 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Слой 1
	this.instance = new lib.Symbol9();
	this.instance.parent = this;
	this.instance.setTransform(300.3,114.2,1,1,0,0,0,86,6.5);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(70).to({_off:false},0).wait(1).to({regY:6.6,y:114.3,alpha:0.042},0).wait(1).to({alpha:0.083},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0.167},0).wait(1).to({alpha:0.208},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.292},0).wait(1).to({alpha:0.333},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.417},0).wait(1).to({alpha:0.458},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.542},0).wait(1).to({alpha:0.583},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.667},0).wait(1).to({alpha:0.708},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.792},0).wait(1).to({alpha:0.833},0).wait(1).to({alpha:0.875},0).wait(1).to({alpha:0.917},0).wait(1).to({alpha:0.958},0).wait(1).to({alpha:1},0).wait(1));

	// 3
	this.instance_1 = new lib.Symbol2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(31.1,49.9,1,1,0,0,0,16.4,27.2);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regY:27.3,y:50,alpha:0.053},0).wait(1).to({alpha:0.105},0).wait(1).to({alpha:0.158},0).wait(1).to({alpha:0.211},0).wait(1).to({alpha:0.263},0).wait(1).to({alpha:0.316},0).wait(1).to({alpha:0.368},0).wait(1).to({alpha:0.421},0).wait(1).to({alpha:0.474},0).wait(1).to({alpha:0.526},0).wait(1).to({alpha:0.579},0).wait(1).to({alpha:0.632},0).wait(1).to({alpha:0.684},0).wait(1).to({alpha:0.737},0).wait(1).to({alpha:0.789},0).wait(1).to({alpha:0.842},0).wait(1).to({alpha:0.895},0).wait(1).to({alpha:0.947},0).wait(1).to({alpha:1},0).wait(1).to({regY:27.2,y:49.9},0).wait(1).to({regY:27.3,x:41.8,y:50},0).wait(1).to({x:52},0).wait(1).to({x:61.5},0).wait(1).to({x:70.4},0).wait(1).to({x:78.8},0).wait(1).to({x:86.7},0).wait(1).to({x:94.1},0).wait(1).to({x:101},0).wait(1).to({x:107.5},0).wait(1).to({x:113.7},0).wait(1).to({x:119.4},0).wait(1).to({x:124.8},0).wait(1).to({x:129.9},0).wait(1).to({x:134.7},0).wait(1).to({x:139.2},0).wait(1).to({x:143.4},0).wait(1).to({x:147.4},0).wait(1).to({x:151.2},0).wait(1).to({x:154.8},0).wait(1).to({x:158.2},0).wait(1).to({x:161.4},0).wait(1).to({x:164.5},0).wait(1).to({x:167.4},0).wait(1).to({x:170.2},0).wait(1).to({x:172.9},0).wait(1).to({x:175.4},0).wait(1).to({x:177.9},0).wait(1).to({x:180.3},0).wait(1).to({x:182.6},0).wait(1).to({x:184.9},0).wait(1).to({x:187.1},0).wait(1).to({x:189.2},0).wait(1).to({x:191.3},0).wait(1).to({x:193.3},0).wait(1).to({x:195.3},0).wait(1).to({x:197.3},0).wait(1).to({x:199.3},0).wait(1).to({x:201.2},0).wait(1).to({x:203.1},0).wait(1).to({x:205},0).wait(1).to({x:206.9},0).wait(1).to({x:208.8},0).wait(1).to({x:210.6},0).wait(1).to({x:212.5},0).wait(1).to({x:214.4},0).wait(1).to({x:216.2},0).wait(1).to({x:218.1},0).wait(1).to({x:219.9},0).wait(1).to({x:221.8},0).wait(1).to({x:223.6},0).wait(1).to({x:225.5},0).wait(1).to({x:227.3},0).wait(1).to({x:229.2},0).wait(1).to({x:231.1},0).wait(1).to({regY:27.2,y:49.9},0).wait(20));

	// -3
	this.instance_2 = new lib.Symbol11();
	this.instance_2.parent = this;
	this.instance_2.setTransform(210.3,50,1,1,0,0,0,16.4,27.3);
	this.instance_2.alpha = 0;

	this.instance_3 = new lib.Symbol4();
	this.instance_3.parent = this;
	this.instance_3.setTransform(210.3,49.9,1,1,0,0,0,16.4,27.2);
	this.instance_3._off = true;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgpBSQgSgRAAgZIAjAAQAAALAHAHQAIAIAKAAQAKAAAIgIQAHgHAAgLQAAgLgHgHQgIgIgKAAIgGAAIAAghIAGAAQAJAAAIgHQAGgHAAgJQAAgKgGgIQgIgHgJAAQgJAAgIAHQgHAIAAAKIggAAQAAgYAQgQQARgRAXAAQAWAAARARQARAQAAAYQAAAWgRAQQAUASAAAaQAAAZgSARQgRASgYAAQgZAAgRgSg");
	this.shape.setTransform(270.4,50,2.734,2.734);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgpBSQgSgRAAgZIAjAAQAAALAHAHQAIAIAKAAQAKAAAIgIQAHgHAAgLQAAgLgHgHQgIgIgKAAIgGAAIAAghIAGAAQAJAAAIgHQAGgHAAgJQAAgKgGgIQgIgHgJAAQgJAAgIAHQgHAIAAAKIggAAQAAgYAQgQQARgRAXAAQAWAAARARQARAQAAAYQAAAWgRAQQAUASAAAaQAAAZgSARQgRASgYAAQgZAAgRgSg");
	this.shape_1.setTransform(270.3,50,2.734,2.734);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(20));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({alpha:0.053},0).wait(1).to({alpha:0.105},0).wait(1).to({alpha:0.158},0).wait(1).to({alpha:0.211},0).wait(1).to({alpha:0.263},0).wait(1).to({alpha:0.316},0).wait(1).to({alpha:0.368},0).wait(1).to({alpha:0.421},0).wait(1).to({alpha:0.474},0).wait(1).to({alpha:0.526},0).wait(1).to({alpha:0.579},0).wait(1).to({alpha:0.632},0).wait(1).to({alpha:0.684},0).wait(1).to({alpha:0.737},0).wait(1).to({alpha:0.789},0).wait(1).to({alpha:0.842},0).wait(1).to({alpha:0.895},0).wait(1).to({alpha:0.947},0).wait(1).to({alpha:1},0).to({_off:true},1).wait(75));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(20).to({_off:false},0).wait(1).to({regY:27.3,x:213.5,y:50},0).wait(1).to({x:216.6},0).wait(1).to({x:219.4},0).wait(1).to({x:222.1},0).wait(1).to({x:224.6},0).wait(1).to({x:227},0).wait(1).to({x:229.2},0).wait(1).to({x:231.3},0).wait(1).to({x:233.2},0).wait(1).to({x:235.1},0).wait(1).to({x:236.8},0).wait(1).to({x:238.4},0).wait(1).to({x:240},0).wait(1).to({x:241.4},0).wait(1).to({x:242.7},0).wait(1).to({x:244},0).wait(1).to({x:245.2},0).wait(1).to({x:246.3},0).wait(1).to({x:247.4},0).wait(1).to({x:248.4},0).wait(1).to({x:249.4},0).wait(1).to({x:250.3},0).wait(1).to({x:251.2},0).wait(1).to({x:252},0).wait(1).to({x:252.8},0).wait(1).to({x:253.6},0).wait(1).to({x:254.4},0).wait(1).to({x:255.1},0).wait(1).to({x:255.8},0).wait(1).to({x:256.4},0).wait(1).to({x:257.1},0).wait(1).to({x:257.7},0).wait(1).to({x:258.4},0).wait(1).to({x:259},0).wait(1).to({x:259.6},0).wait(1).to({x:260.2},0).wait(1).to({x:260.8},0).wait(1).to({x:261.3},0).wait(1).to({x:261.9},0).wait(1).to({x:262.5},0).wait(1).to({x:263.1},0).wait(1).to({x:263.6},0).wait(1).to({x:264.2},0).wait(1).to({x:264.7},0).wait(1).to({x:265.3},0).wait(1).to({x:265.9},0).wait(1).to({x:266.4},0).wait(1).to({x:267},0).wait(1).to({x:267.5},0).wait(1).to({x:268.1},0).wait(1).to({x:268.6},0).wait(1).to({x:269.2},0).wait(1).to({x:269.7},0).wait(1).to({x:270.3},0).to({_off:true},1).wait(20));

	// --1
	this.instance_4 = new lib.Symbol12();
	this.instance_4.parent = this;
	this.instance_4.setTransform(396.3,50,1,1,0,0,0,8.5,27.3);
	this.instance_4.alpha = 0;

	this.instance_5 = new lib.Symbol5();
	this.instance_5.parent = this;
	this.instance_5.setTransform(396.3,49.9,1,1,0,0,0,8.5,27.2);
	this.instance_5._off = true;

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAABkIAAinIgeAAIAHggIA2AAIAADHg");
	this.shape_2.setTransform(336.4,50,2.734,2.734);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAABkIAAinIgeAAIAHggIA2AAIAADHg");
	this.shape_3.setTransform(336.3,50,2.734,2.734);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).wait(20));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({alpha:0.053},0).wait(1).to({alpha:0.105},0).wait(1).to({alpha:0.158},0).wait(1).to({alpha:0.211},0).wait(1).to({alpha:0.263},0).wait(1).to({alpha:0.316},0).wait(1).to({alpha:0.368},0).wait(1).to({alpha:0.421},0).wait(1).to({alpha:0.474},0).wait(1).to({alpha:0.526},0).wait(1).to({alpha:0.579},0).wait(1).to({alpha:0.632},0).wait(1).to({alpha:0.684},0).wait(1).to({alpha:0.737},0).wait(1).to({alpha:0.789},0).wait(1).to({alpha:0.842},0).wait(1).to({alpha:0.895},0).wait(1).to({alpha:0.947},0).wait(1).to({alpha:1},0).to({_off:true},1).wait(75));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(20).to({_off:false},0).wait(1).to({regY:27.3,x:393.1,y:50},0).wait(1).to({x:390},0).wait(1).to({x:387.2},0).wait(1).to({x:384.5},0).wait(1).to({x:382},0).wait(1).to({x:379.6},0).wait(1).to({x:377.4},0).wait(1).to({x:375.3},0).wait(1).to({x:373.4},0).wait(1).to({x:371.5},0).wait(1).to({x:369.8},0).wait(1).to({x:368.2},0).wait(1).to({x:366.6},0).wait(1).to({x:365.2},0).wait(1).to({x:363.9},0).wait(1).to({x:362.6},0).wait(1).to({x:361.4},0).wait(1).to({x:360.3},0).wait(1).to({x:359.2},0).wait(1).to({x:358.2},0).wait(1).to({x:357.2},0).wait(1).to({x:356.3},0).wait(1).to({x:355.4},0).wait(1).to({x:354.6},0).wait(1).to({x:353.8},0).wait(1).to({x:353},0).wait(1).to({x:352.2},0).wait(1).to({x:351.5},0).wait(1).to({x:350.8},0).wait(1).to({x:350.2},0).wait(1).to({x:349.5},0).wait(1).to({x:348.9},0).wait(1).to({x:348.2},0).wait(1).to({x:347.6},0).wait(1).to({x:347},0).wait(1).to({x:346.4},0).wait(1).to({x:345.8},0).wait(1).to({x:345.3},0).wait(1).to({x:344.7},0).wait(1).to({x:344.1},0).wait(1).to({x:343.5},0).wait(1).to({x:343},0).wait(1).to({x:342.4},0).wait(1).to({x:341.9},0).wait(1).to({x:341.3},0).wait(1).to({x:340.7},0).wait(1).to({x:340.2},0).wait(1).to({x:339.6},0).wait(1).to({x:339.1},0).wait(1).to({x:338.5},0).wait(1).to({x:338},0).wait(1).to({x:337.4},0).wait(1).to({x:336.9},0).wait(1).to({x:336.3},0).to({_off:true},1).wait(20));

	// ---6
	this.instance_6 = new lib.Symbol13();
	this.instance_6.parent = this;
	this.instance_6.setTransform(569.9,50,1,1,0,0,0,16.4,27.2);
	this.instance_6.alpha = 0;

	this.instance_7 = new lib.Symbol6();
	this.instance_7.parent = this;
	this.instance_7.setTransform(569.8,49.9,1,1,0,0,0,16.4,27.2);
	this.instance_7._off = true;

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgqBSQgRgRAAgZIABgNQAEgiAbgnQAOgUAfghIAYAYQgcAcgNATIgFAJIAEAAQAZAAARASQASAQAAAZQAAAYgSASQgSASgYAAQgXAAgTgSgAgRAWQgIAHAAALQAAALAIAHQAHAHAKAAQAKAAAIgHQAHgHABgLQgBgLgHgHQgIgIgKAAQgKAAgHAIg");
	this.shape_4.setTransform(370.1,50,2.734,2.734,0,0,0,0.1,0);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgqBSQgRgRAAgZIABgNQAEgiAbgnQAOgUAfghIAYAYQgcAcgNATIgFAJIAEAAQAZAAARASQASAQAAAZQAAAYgSASQgSASgYAAQgXAAgTgSgAgRAWQgIAHAAALQAAALAIAHQAHAHAKAAQAKAAAIgHQAHgHABgLQgBgLgHgHQgIgIgKAAQgKAAgHAIg");
	this.shape_5.setTransform(370,50,2.734,2.734,0,0,0,0.1,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).wait(20));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1).to({regY:27.3,y:50.1,alpha:0.053},0).wait(1).to({alpha:0.105},0).wait(1).to({alpha:0.158},0).wait(1).to({alpha:0.211},0).wait(1).to({alpha:0.263},0).wait(1).to({alpha:0.316},0).wait(1).to({alpha:0.368},0).wait(1).to({alpha:0.421},0).wait(1).to({alpha:0.474},0).wait(1).to({alpha:0.526},0).wait(1).to({alpha:0.579},0).wait(1).to({alpha:0.632},0).wait(1).to({alpha:0.684},0).wait(1).to({alpha:0.737},0).wait(1).to({alpha:0.789},0).wait(1).to({alpha:0.842},0).wait(1).to({alpha:0.895},0).wait(1).to({alpha:0.947},0).wait(1).to({alpha:1},0).to({_off:true},1).wait(75));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(20).to({_off:false},0).wait(1).to({regY:27.3,x:559,y:50},0).wait(1).to({x:548.9},0).wait(1).to({x:539.4},0).wait(1).to({x:530.5},0).wait(1).to({x:522.1},0).wait(1).to({x:514.2},0).wait(1).to({x:506.8},0).wait(1).to({x:499.8},0).wait(1).to({x:493.3},0).wait(1).to({x:487.2},0).wait(1).to({x:481.4},0).wait(1).to({x:476},0).wait(1).to({x:471},0).wait(1).to({x:466.2},0).wait(1).to({x:461.7},0).wait(1).to({x:457.4},0).wait(1).to({x:453.4},0).wait(1).to({x:449.6},0).wait(1).to({x:446.1},0).wait(1).to({x:442.7},0).wait(1).to({x:439.4},0).wait(1).to({x:436.4},0).wait(1).to({x:433.4},0).wait(1).to({x:430.6},0).wait(1).to({x:428},0).wait(1).to({x:425.4},0).wait(1).to({x:422.9},0).wait(1).to({x:420.5},0).wait(1).to({x:418.2},0).wait(1).to({x:416},0).wait(1).to({x:413.8},0).wait(1).to({x:411.7},0).wait(1).to({x:409.6},0).wait(1).to({x:407.5},0).wait(1).to({x:405.5},0).wait(1).to({x:403.5},0).wait(1).to({x:401.6},0).wait(1).to({x:399.7},0).wait(1).to({x:397.7},0).wait(1).to({x:395.8},0).wait(1).to({x:394},0).wait(1).to({x:392.1},0).wait(1).to({x:390.2},0).wait(1).to({x:388.3},0).wait(1).to({x:386.5},0).wait(1).to({x:384.6},0).wait(1).to({x:382.8},0).wait(1).to({x:380.9},0).wait(1).to({x:379.1},0).wait(1).to({x:377.2},0).wait(1).to({x:375.4},0).wait(1).to({x:373.5},0).wait(1).to({x:371.7},0).wait(1).to({x:369.8},0).to({_off:true},1).wait(20));

	// |
	this.instance_8 = new lib.Symbol7();
	this.instance_8.parent = this;
	this.instance_8.setTransform(309.3,50,1,0.01,0,0,0,1.1,25);
	this.instance_8._off = true;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgDBkIAAjHIAHAAIAADHg");
	this.shape_6.setTransform(309.3,50,2.734,2.734);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgDBkIAAjHIAHAAIAADHg");
	this.shape_7.setTransform(309.2,50,2.734,2.734);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},24).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).wait(20));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(24).to({_off:false},0).wait(1).to({regY:27.3,scaleY:0.02},0).wait(1).to({scaleY:0.04},0).wait(1).to({scaleY:0.06},0).wait(1).to({scaleY:0.08},0).wait(1).to({scaleY:0.1},0).wait(1).to({scaleY:0.12},0).wait(1).to({scaleY:0.14},0).wait(1).to({scaleY:0.16},0).wait(1).to({scaleY:0.18},0).wait(1).to({scaleY:0.2},0).wait(1).to({scaleY:0.22},0).wait(1).to({scaleY:0.24},0).wait(1).to({scaleY:0.26},0).wait(1).to({scaleY:0.28},0).wait(1).to({scaleY:0.3},0).wait(1).to({scaleY:0.32},0).wait(1).to({scaleY:0.34},0).wait(1).to({scaleY:0.36},0).wait(1).to({scaleY:0.38},0).wait(1).to({scaleY:0.4},0).wait(1).to({scaleY:0.42},0).wait(1).to({scaleY:0.44},0).wait(1).to({scaleY:0.46},0).wait(1).to({scaleY:0.48},0).wait(1).to({scaleY:0.5},0).wait(1).to({scaleY:0.52},0).wait(1).to({scaleY:0.54},0).wait(1).to({scaleY:0.56},0).wait(1).to({scaleY:0.58},0).wait(1).to({scaleY:0.6},0).wait(1).to({scaleY:0.62,y:50.1},0).wait(1).to({scaleY:0.64,y:50},0).wait(1).to({scaleY:0.66},0).wait(1).to({scaleY:0.68},0).wait(1).to({scaleY:0.7},0).wait(1).to({scaleY:0.72},0).wait(1).to({scaleY:0.74},0).wait(1).to({scaleY:0.76},0).wait(1).to({scaleY:0.78},0).wait(1).to({scaleY:0.8},0).wait(1).to({scaleY:0.82,y:50.1},0).wait(1).to({scaleY:0.84},0).wait(1).to({scaleY:0.86},0).wait(1).to({scaleY:0.88,y:50},0).wait(1).to({scaleY:0.9},0).wait(1).to({scaleY:0.92},0).wait(1).to({scaleY:0.94},0).wait(1).to({scaleY:0.96},0).wait(1).to({scaleY:0.98},0).wait(1).to({scaleY:1},0).to({_off:true},1).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(314.7,83.2,571.7,54.6);
// library properties:
lib.properties = {
	width: 600,
	height: 121,
	fps: 48,
	color: "#000000",
	opacity: 1.00,
	webfonts: {},
	manifest: [],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;