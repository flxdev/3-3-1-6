
var Shaders = Shaders || {};

Shaders.Glitch = {};

Shaders.Glitch.VertexShader = [
  'attribute vec2 aPosition;',
  'attribute vec2 aTexCoord;',
  'varying vec2 vTexCoord;',
  'void main() {',
      'gl_Position = vec4( aPosition, 0, 1 );',
      'vTexCoord = aTexCoord;',
  '}'
].join('\n');

Shaders.Glitch.FragmentShader = [
  'uniform sampler2D uTexture;',
  'uniform sampler2D uOffsets;',
  'varying vec2 vTexCoord;',

  'uniform int uSkip;',
  'uniform float uAmount;',
  'uniform float uAngle;',
  'uniform float uSeed;',
  'uniform float uSeedX;',
  'uniform float uSeedY;',
  'uniform float uDistortionX;',
  'uniform float uDistortionY;',
  'uniform float uColS;',

  'float rand(vec2 co){',
    'return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);',
  '}',

  'void main() {',
    'vec4 texel = texture2D( uTexture, vTexCoord );',
    'gl_FragColor = texel;',

    'if (uSkip < 1) {',
      'vec2 p = vTexCoord;',
      'float xs = floor(gl_FragCoord.x / 0.5);',
      'float ys = floor(gl_FragCoord.y / 0.5);',
      '//based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch',
      'vec4 normal = texture2D(uOffsets, p * uSeed * uSeed);',
      'if (p.y < uDistortionX + uColS && p.y > uDistortionX - uColS * uSeed) {',
        'if(uSeedX > 0.0){',
          'p.y = 1.0 - (p.y + uDistortionY);',
        '}',
        'else {',
          'p.y = uDistortionY;',
        '}',
      '}',
      'if (p.x < uDistortionY + uColS && p.x > uDistortionY - uColS * uSeed) {',
        'if (uSeedY > 0.0){',
          'p.x = uDistortionX;',
        '}',
        'else {',
          'p.x = 1. - (p.x + uDistortionX);',
        '}',
      '}',
      'p.x += normal.x * uSeedX * (uSeed /5.0);',
      'p.y += normal.y * uSeedY * (uSeed /5.0);',
      '//base from RGB shift shader',
      'vec2 offset = uAmount * vec2( cos(uAngle), sin(uAngle) );',
      'vec4 cr = texture2D(uTexture, p + offset);',
      'vec4 cga = texture2D(uTexture, p);',
      'vec4 cb = texture2D(uTexture, p - offset);',
      'gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);',
    '}',
    'else {',
      'gl_FragColor = texture2D(uTexture, vTexCoord);',
    '}',
  '}',
].join('\n');