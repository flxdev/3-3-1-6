
function Glitch() {
  this.domElement = document.createElement('div');
  this.domElement.className = 'glitch';
  this.bindMethods();
  this.setupContext();
  this.render();
  this.enabled = true;
  this.glitchFrames = 0;
  this.glitching = false;
  // Glitch settings...
  // Chance of switching glitch effect on when off.
  this.onProbability = 0.005;
  // Chance of switching glitch effect off when on.
  this.offProbability = 0.2;
  // Minimum frames to glitch for.
  this.minGlitchedFrames = 5;
  // Maximum frames to glitch for.
  this.maxGlitchedFrames = 30;
  // Chance of updating distortion values.
  this.distortionProbability = 0.35;
  // Maximum seed value (signed, e.g. between -n and n)
  this.maxSeedValue = 0.2;
  // Maximum distortion.
  this.maxDistortion = 0.2;
  // Smoothing applied to random values of `uAmount` uniform.
  this.strengthDivisor = 60;
}

Glitch.prototype.enable = function() {
  this.enabled = true;
}

Glitch.prototype.disable = function() {
  if (this.enabled) {
    this.enabled = false;
    this.updateProgramUniforms();
    this.program.draw(this.mesh);
  }
}

Glitch.prototype.bindMethods = function() {
  this.onImageLoaded = this.onImageLoaded.bind(this);
  this.resize = this.resize.bind(this);
  this.render = this.render.bind(this);
}

Glitch.prototype.setupContext = function() {
  try {
    // Attempt to create a GL context.
    this.canvas = document.createElement('canvas');
    this.context = GL.create(this.canvas);
    this.domElement.appendChild(this.canvas);
    this.hasWebGL = true;
  } catch (error) {
    this.hasWebGL = false;
  }
  if (this.hasWebGL) {
    // We can't use background cover, so compute manually on resize.
    window.addEventListener('resize', this.resize, false);
    // If WebGL is supported, set up the context.
    this.enableWebGLExtensions();
    this.program = this.context.program(
      Shaders.Glitch.VertexShader,
      Shaders.Glitch.FragmentShader
    );
    this.texture = this.context.texture();
    this.mesh = this.createQuadMesh();
    this.setupProgramUniforms();
    this.frame = 0;
  }
}

Glitch.prototype.createQuadMesh = function() {
  return this.context.mesh({
    textures: {
      uTexture: this.texture,
      uOffsets: this.generateHeightMap(64)
    },
    vertices: { aPosition: this.createScreenSpaceQuad() },
    attributes: { aTexCoord: this.createUVCoordinates() }
  });
}

Glitch.prototype.createScreenSpaceQuad = function() {
  return this.context.vbo([ -1, 1, 1, 1, -1, -1, 1, -1 ])
}

Glitch.prototype.createUVCoordinates = function() {
  return this.context.vbo([ 0, 1, 1, 1, 0, 0, 1, 0 ]);
}

Glitch.prototype.enableWebGLExtensions = function() {
  this.context.getExtension('OES_texture_float');
  this.context.getExtension('OES_half_float_linear');
  this.context.getExtension('OES_float_linear');
}

Glitch.prototype.setupProgramUniforms = function(arguments) {
  this.program.uSkip.set(1);
  this.program.uAmount.set(0.01);
  this.program.uAngle.set(0.01);
  this.program.uSeed.set(0.01);
  this.program.uSeedX.set(0.01);
  this.program.uSeedY.set(0.01);
  this.program.uDistortionX.set(0.1);
  this.program.uDistortionY.set(0.1);
  this.program.uColS.set(0.1);
  this.generateTrigger();
}

Glitch.prototype.updateProgramUniforms = function() {
  if (!this.enabled) {
    this.glitching = false;
    this.program.uSkip.set(1);
    return;
  }
  if (this.glitching) {
    this.program.uSeed.set(Math.random());
    this.program.uSkip.set(0);
    this.program.uAmount.set(Math.random() / this.strengthDivisor);
    this.program.uAngle.set(this.randomFloat(-Math.PI, Math.PI));
    this.program.uSeedX.set(this.randomFloat(-this.maxSeedValue, this.maxSeedValue));
    this.program.uSeedY.set(this.randomFloat(-this.maxSeedValue, this.maxSeedValue));
    if (Math.random() < this.distortionProbability) {
      this.program.uDistortionX.set(this.randomFloat(0, this.maxDistortion));
      this.program.uDistortionY.set(this.randomFloat(0, this.maxDistortion));
    }
    if (this.glitchFrames > this.minGlitchedFrames) {
      if (this.glitchFrames > this.maxGlitchedFrames || Math.random() < this.offProbability) {
        this.program.uSkip.set(1);
        this.glitching = false;
      }
    }
    this.glitchFrames++;
  } else {
    this.glitching = Math.random() < this.onProbability;
    this.glitchFrames = 0;
  }
  this.frame++;
}

Glitch.prototype.generateHeightMap = function(size) {
  // Fill a Float buffer with 3 channels worth of data (RGB).
  var data = new Float32Array( size * size * 3 );
  var length = size * size;
  for ( var value, index, i = 0; i < length; i++ ) {
    index = i * 3;
    value = Math.random();
    data[ index     ] = value;
    data[ index + 1 ] = value;
    data[ index + 2 ] = value;
  }
  return this.context.texture(data, size, size, {
    format: this.context.RGB,
    mipmap: false,
    min: this.context.NEAREST,
    mag: this.context.NEAREST,
    s: this.context.REPEAT,
    t: this.context.REPEAT
  });
}

Glitch.prototype.generateTrigger = function() {
  this.randX = Math.floor(this.randomFloat(120, 240));
}

Glitch.prototype.randomFloat = function(min, max) {
  if (typeof max == 'undefined') {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
}

// TODO: This mimics contain and not cover.
// TODO: Call during view project tween.
Glitch.prototype.resize = function() {
  // var bounds = this.domElement.getBoundingClientRect();
  var ratio1 = this.domElement.offsetWidth / this.domElement.offsetHeight;
  var ratio2 = this.image.width / this.image.height;
  var landscape = ratio1 < ratio2;
  this.canvas.style.height = landscape ? '100%' : 'auto';
  this.canvas.style.width = landscape ? 'auto' : '100%';
}

Glitch.prototype.render = function() {
  requestAnimationFrame(this.render);
  if (this.enabled) {
    this.updateProgramUniforms();
    this.program.draw(this.mesh);
  }
}

Glitch.prototype.setImagePath = function(path) {
  // Always set the background image as a fallback.
  this.domElement.style.backgroundImage = 'url(' + path + ')';
  if (this.hasWebGL) {
    this.image = new Image();
    this.image.onload = this.onImageLoaded;
    this.image.src = path;
  }
}

Glitch.prototype.onImageLoaded = function() {
  this.context.size(this.image.width, this.image.height);
  this.texture.set(this.image);
  this.resize();
}