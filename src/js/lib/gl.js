
// A very lightweight layer on top of the WebGL API to make coding WebGL faster and much more fun.
//
// This isn't a 3D engine, but could be used as the foundation for one.

/*!
  @copyright 2016 Justin Windle
  @license http://opensource.org/licenses/MIT
  @author Justin Windle <justin@soulwire.co.uk>
  @see https://github.com/soulwire/gl.js
  @see http://soulwire.co.uk
*/

var GL = (function() {

  'use strict';

  var GL = {

    //
    // Create
    // --------------------------------------------------
    //
    // Creates a WebGL drawing context and augments it
    // to add the functionality of the __gl.js__ library
    //
    // Parameters:
    //  - `canvas` _(optional)_ The canvas element to use
    //

    create: function( canvas ) {

      var gl;

      if ( !canvas ) canvas = document.createElement( 'canvas' );

      if ( !( gl = ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) ) )

        throw 'Error creating WebGL context';

      var shader, bindings = {};

      return extend( gl, {

        bindings: bindings,

        //
        // Shader
        // --------------------------------------------------
        //
        // Creates a shader object from a given type and source code
        //
        // Parameters:
        //  - `source` Source string for the shader
        //  - `type` The shader type (`VERTEX_SHADER` or `FRAGMENT_SHADER`)
        //

        shader: function( source, type ) {

          source = PRECISION + '\n' + source;
          
          gl.shaderSource( shader = gl.createShader( type ), source );
          gl.compileShader( shader );

          if ( !gl.getShaderParameter( shader, COMPILE_STATUS ) )

            logShaderError( gl.getShaderInfoLog( shader ), source );

          return shader;
        },

        //
        // Program
        // --------------------------------------------------
        //
        // Creates a shader program from _vertex_ and _fragment_
        // shader source code
        //
        // Parameters:
        //  - `vs` Source string for the vertex shader
        //  - `fs` Source string for the fragment shader
        //

        program: function( vs, fs ) {

          var attribute, program, uniform, source, name, type, size, span,

          program = gl.createProgram();
          program.state = {};

          gl.attachShader( program, gl.shader( vs, VERTEX_SHADER ) );
          gl.attachShader( program, gl.shader( fs, FRAGMENT_SHADER ) );
          gl.linkProgram( program );

          if ( !gl.getProgramParameter( program, LINK_STATUS ) )

            throw gl.getProgramInfoLog( program );

          /*

            Concatenates vertex and fragment shader source code
            and strips out comments, ready to be parsed for 
            attributes and uniforms

          */

          source = [ vs, fs ].join( '\n' ).replace( COMMENT, '' );

          /*

            Parse attributes in the shader code, create `attribute`
            objects for each and store them in the program

          */

          while ( attribute = ATTRIBUTE.exec( source ) ) {

            type = attribute[1];
            name = attribute[2];

            if ( !program[ name ] )

              program[ name ] = gl.attribute( program, name, type );
          }

          /*

            Parse uniforms in the shader code, create `uniform`
            objects for each and store them in the program

          */

          while ( uniform = UNIFORM.exec( source ) ) {

            type = uniform[1];
            name = uniform[2];
            span = uniform[5];

            if ( !program[ name ] )

              program[ name ] = gl.uniform( program, name, type, span );
          }

          /* Extends the core program functionalty */

          return extend( program, {

            // ##### on
            // Tells WebGL to start using this program
            
            on: function() {

              if ( gl.usedProgram !== program )

                gl.useProgram( gl.usedProgram = program );
            },

            // ##### draw
            // Draw a `mesh` object using this program
            //
            // Parameters
            //  - `mesh` The `mesh` object to draw
            //  - `mode` _(optional)_ The drawing mode to use (if not `mesh.mode`)
            //  - `first` _(optional)_ The index to start drawing from
            //  - `count` _(optional)_ How many items to draw

            draw: function( mesh, mode, first, count ) {

              program.on();

              var key, val, obj, unit = 0;

              /* Attributes */

              for ( key in obj = mesh.attributes )

                if ( program[ key ] )

                  obj[ key ].on( program[ key ] );

              /* Uniforms */

              for ( key in obj = mesh.uniforms )

                if ( program[ key ] )

                  program[ key ].set( obj[ key ] );

              /* Textures */

              for ( key in obj = mesh.textures )

                if ( program[ key ] )

                  obj[ key ].on( unit ), program[ key ].set( unit++ );

              /* Vertices */

              for ( key in obj = mesh.vertices )

                ( val = obj[ key ] ).on( program[ key ] );

              /* Draw */

              if ( mesh.indices ) {

                mesh.indices.on();
                gl.drawElements( TRIANGLES, mesh.indices.length, UNSIGNED_SHORT, 0 );

              } else {

                gl.drawArrays(
                  mode  || mesh.mode,
                  first || 0,
                  count || ( val.length / program[ key ].size )
                );
              }
            }
          });
        },

        //
        // Attribute
        // --------------------------------------------------
        //
        // Creates an object that encapsulates a vertex shader
        // attribute and provides methods for using it
        //
        // Parameters:
        //  - `program` The `program` object the attribute belongs to
        //  - `name` The name of the attribute (usually prefixed with _a_)
        //  - `type` The type of object used for this attribute (e.g. _vec3_)
        //

        attribute: function( program, name, type ) {

          var location = gl.getAttribLocation( program, name );
          var dataType = getType( type );
          var size = getSize( type );
          var on = false;

          return {
            
            name: name,
            type: type,
            size: size,
            dataType: dataType,
            location: location,

            // ##### on
            // Enable the attribute and setup pointers

            on: function() {
              
              if ( !on ) gl.enableVertexAttribArray( location );
              gl.vertexAttribPointer( location, size, dataType, false, 0, 0 );
              on = true;
            },

            // ##### off
            // Disable the attribute

            off: function() {

              gl.disableVertexAttribArray( location );
            }
          };
        },

        //
        // Uniform
        // --------------------------------------------------
        //
        // Creates an object that encapsulates a program
        // uniform and provides methods for using it
        //
        // Parameters:
        //  - `program` The `program` object the uniform belongs to
        //  - `name` The name of the uniform (usually prefixed with _u_)
        //  - `type` The type of object used for this uniform (e.g. _vec3_)
        //  - `span` _(optional)_ The length of this uniform if it's an array
        //

        uniform: function( program, name, type, span ) {

          var location = gl.getUniformLocation( program, name );
          var setter = gl[ uniformMethod( type, span ) ];
          var state = program.state;

          return {
            
            name: name,
            type: type,
            span: span || 1,
            location: location,
            setter: setter,

            // ##### get
            // Returns the current value of the uniform

            get: function() {

              return gl.getUniform( program, location );
            },

            // ##### set
            // Sets the current value of the uniform

            set: function( value ) {

              if ( state[ name ] !== value ) {

                program.on();
                setter.apply( gl, [ location ].concat( state[ name ] = value ) );
              }
            }
          };
        },

        //
        // Buffer
        // --------------------------------------------------
        //
        // Creates a buffer object to use for attributes or indices
        //
        // Parameters:
        //  - `type` The type of buffer (`ARRAY_BUFFER` or `ELEMENT_ARRAY_BUFFER`)
        //  - `data` _(optional)_ The initial data to fill the buffer with
        //

        buffer: function( type, data ) {

          var ArrayType = type === ARRAY_BUFFER ? Float32Array : Uint16Array;
          var buffer = gl.createBuffer();

          extend( buffer, {

            // ##### length
            // The current length of the buffer

            length: 0,

            // ##### on
            // Binds the buffer to the appropriate bind point and
            // enables the attribute for the buffer
            //
            // Parameters
            //  - `attribute` The attribute that this buffer is for

            on: function( attribute ) {

              if ( bindings[ type ] !== buffer ) {

                gl.bindBuffer( type, bindings[ type ] = buffer );
                if ( attribute ) attribute.on();
              }
            },

            // ##### fill
            // Fills the buffer with data
            //
            // Parameters
            //  - `data` The data to fill the buffer with
            //  - `usage` _(optional)_ How the buffer will be used (defaults to `STATIC_DRAW`)

            fill: function( data, usage ) {

              if ( toType( data ) == 'array' ) data = new ArrayType( data );

              gl.bindBuffer( type, buffer );
              gl.bufferData( type, data, usage || STATIC_DRAW );

              buffer.length = data.length;
            },

            // ##### push
            // Pushes data into the buffer at a given offset
            //
            // Parameters
            //  - `data` The data to push into the buffer
            //  - `offset` The point at which to start pushing in data

            push: function( data, offset ) {

              if ( isArray( data ) ) data = new ArrayType( data );
              
              gl.bindBuffer( type, buffer );
              gl.bufferSubData( type, offset, data );
            }
          });

          if ( data ) buffer.fill( data );

          return buffer;
        },

        //
        // VBO
        // --------------------------------------------------
        //
        // Creates a vertex buffer for sending attributes to a vertex shader
        // (internally this calls `gl.buffer` with type `ARRAY_BUFFER`)
        //
        // Parameters:
        //  - `data` _(optional)_ The initial data to fill the buffer with
        //

        vbo: function( data ) {

          return gl.buffer( ARRAY_BUFFER, data );
        },

        //
        // IBO
        // --------------------------------------------------
        //
        // Creates a buffer for specifying vertex indices (internally 
        // this calls `gl.buffer` with type `ELEMENT_ARRAY_BUFFER`)
        //
        // Parameters:
        //  - `data` _(optional)_ The initial data to fill the buffer with
        //

        ibo: function( data ) {

          return gl.buffer( ELEMENT_ARRAY_BUFFER, data );
        },

        //
        // FBO
        // --------------------------------------------------
        //
        // Creates a frame buffer object that can be used as an 
        // alternative rendering target
        //
        // Parameters:
        //  - `width` _(optional)_ The initial width of the frame buffer
        //  - `height` _(optional)_ The initial height of the frame buffer
        //  - `data` _(optional)_ The initial texture data
        //
        // TODO:
        //  - Add support for `renderBuffers`
        //

        fbo: function( width, height, data, options ) {

          var fbo = gl.createFramebuffer();
          var tex = gl.texture();

          extend( fbo, {

            // ##### texture
            // The texture object that the frame buffer renders to

            texture: tex,

            // ##### set
            // Sets up the frame buffer with optional data and dimensions
            //
            // Parameters:
            //  - `data` _(optional)_ Image data for the frame buffer
            //  - `width` _(optional)_ The initial width of the frame buffer
            //  - `height` _(optional)_ The initial height of the frame buffer

            set: function( data, width, height, options ) {

              fbo.on();
              tex.set( data, fbo.width = width, fbo.height = height, options );
              gl.framebufferTexture2D( FRAMEBUFFER, COLOR_ATTACHMENT0, TEXTURE_2D, tex, 0 );
              fbo.off();
            },

            // ##### on
            // Binds the frame buffer to use as an off screen rendering target

            on: function() {

              gl.bindFramebuffer( FRAMEBUFFER, fbo );
            },

            // ##### off
            // Unbinds the frame buffer, re-enabling the default render target

            off: function() {

              gl.bindFramebuffer( FRAMEBUFFER, null );
            }
          });

          fbo.set( data, width || 1, height || 1, options );

          return fbo;
        },

        //
        // Texture
        // --------------------------------------------------
        //
        // Creates a texture object
        //
        // Parameters:
        //  - `source` _(optional)_ The initial source data for the texture.
        //  Possible values are:
        //   - `string` (path to an image file)
        //   - `ArrayBufferView` _(pixels)_
        //   - `ImageData` _(pixels)_
        //   - `HTMLImageElement` _(May throw DOMException)_
        //   - `HTMLCanvasElement` _(May throw DOMException)_
        //   - `HTMLVideoElement` _(May throw DOMException)_
        //  - `width` _(optional)_ Width of the texture, if not one of the above types
        //  - `height` _(optional)_ Height of the texture, if not one of the above types
        //  - `options` _(optional)_ Options to use during `setup`
        //
        // TODO:
        //  - Auto convert arrays to typed
        //

        texture: function( source, width, height, options ) {

          var texture = gl.createTexture();
          var content;
          var pot;

          if ( typeof width == 'object' )

            options = width;

          extend( texture, {

            // ##### param
            // Sets a parameter for this texture (for example `TEXTURE_MIN_FILTER`)
            //
            // Parameters:
            //  - `name` The name of the parameter to set (e.g. `TEXTURE_MIN_FILTER`)
            //  - `value` The value for the parameter (e.g. `LINEAR`)

            param: function( name, value ) {

              gl.texParameteri( TEXTURE_2D, name, value );
            },

            // ##### setup
            // Sets up the texture by configuring several parameters and generates
            // mipmaps if appropriate
            //
            // Parameters:
            //  - `options` _(optional)_ An object containing parameter names and their values
            //  Possible keys are:
            //   - `min` How to resample when shrinking
            //   - `mag` How to resample when stretching
            //   - `s` Whether to clamp or repeat on the _s_ (_x_) axis
            //   - `t` Whether to clamp or repeat on the _t_ (_y_) axis

            setup: function( options ) {

              options = extend( options || {}, {
                min: LINEAR,
                mag: LINEAR,
                s: CLAMP_TO_EDGE,
                t: CLAMP_TO_EDGE
              });

              texture.on();

              texture.param( TEXTURE_MAG_FILTER, options.mag );
              texture.param( TEXTURE_MIN_FILTER, options.min );
              texture.param( TEXTURE_WRAP_S, options.s );
              texture.param( TEXTURE_WRAP_T, options.t );

              if ( options.mipmap ) gl.generateMipmap( TEXTURE_2D );

              texture.off();
            },

            // ##### on
            // Binds the texture and if `unit` is specified, tells WebGL to
            // use this texture as the texture at the given unit, which will
            // correspond to a shader uniform
            //
            // Parameters:
            //  - `unit` _(optional)_ The unit to activate this texture for

            on: function( unit ) {
              
              if ( exists( unit ) ) gl.activeTexture( TEXTURE0 + unit );
              gl.bindTexture( TEXTURE_2D, texture );
            },

            // ##### off
            // Unbinds this texture

            off: function() {

              gl.bindTexture( TEXTURE_2D, null );
            },

            // ##### set
            // Populates this texture object with data of one of the supported
            // types (see the constructor's `source` parameter above)
            //
            // Parameters:
            //  - `data` _(optional)_ The data to populate the texture with
            //  - `width` _(optional)_ The width of the texture
            //  - `height` _(optional)_ The height of the texture

            set: function( data, width, height, options ) {

              options = extend( options || {}, {
                mipmap: pot = width > 1 && height > 1 && isPowerOf2( width ) && isPowerOf2( height ),
                format: RGBA,
                min: pot ? LINEAR_MIPMAP_LINEAR : LINEAR,
                flip: true
              });

              var path = typeof data === 'string';

              if ( path || !data && !width && !height ) {
                
                texture.set( EMPTY_PIXEL, 1, 1 );

                if ( path )

                  loadImage( data, texture.set );

                return;
              }

              var type = /^float/i.test( toType( data ) ) ? FLOAT : UNSIGNED_BYTE;
              
              texture.on();

              gl.pixelStorei( UNPACK_FLIP_Y_WEBGL, options.flip );

              if ( width && height )

                gl.texImage2D( TEXTURE_2D, 0, options.format, width, height, 0, options.format, type, data );

              else

                gl.texImage2D( TEXTURE_2D, 0, options.format, options.format, UNSIGNED_BYTE, data );

              if ( data !== content )

                texture.setup( options );

              content = data;

              texture.off();
            }
          });

          texture.set( source, width, height, options );

          return texture;
        },

        //
        // Size
        // --------------------------------------------------
        //
        // Resizes the canvas and viewport
        //
        // Parameters:
        //  - `width` The desired width
        //  - `height` The desired height
        //

        size: function( width, height ) {

          gl.viewport( 0, 0, width, height );
          gl.height = canvas.height = height;
          gl.width = canvas.width = width;
        },

        //
        // Mesh
        // --------------------------------------------------
        //
        // Creates a mesh object that encapsulates the properties
        // needed to render a mesh and can be given to a `program`
        // to draw
        //
        // Parameters:
        //  - `options` The properties to initialise the mesh with
        //   - `mode` The default drawing mode to use
        //   - `attributes` Names attribute keys and buffer their values
        //   - `uniforms` A hash of uniforms and their initial values
        //   - `textures` Texture uniform keys and corresponding textures
        //   - `textures` Texture uniform keys and corresponding textures
        //   - `textures` Texture uniform keys and corresponding textures
        //
        // Example:
        //
        //     var quad = gl.mesh({
        //         uniforms: {
        //             uTime: 0
        //         },
        //         textures: {
        //             uTexture: gl.texture( 'some-image.png' )
        //         },
        //         vertices: {
        //             aPosition: gl.vbo([ -1, 1, 1, 1, -1, -1, 1, -1 ])
        //         },
        //         attributes: {
        //             aTexCoord: gl.vbo([ 0, 1, 1, 1, 0, 0, 1, 0 ])
        //         },
        //         indices: gl.ibo([ 0, 1, 3, 3, 1, 2 ])
        //     });
        //
        //     program.draw( quad );
        //

        mesh: function( options ) {

          var mesh = extend( options || {}, {
            
            mode: TRIANGLE_STRIP,
            attributes: {},
            uniforms: {},
            textures: {},
            indices: null,
            vertices: { /* programAttributeName: VBO */ }
          });

          return mesh;
        }
      });
    }
  };

  //
  // Internal
  // --------------------------------------------------
  //
  // Constants and helper methods, not exposed via the API
  //

  var EMPTY_PIXEL = new Uint8Array([ 0, 0, 0, 0 ]);
  var PRECISION = '#ifdef GL_ES\nprecision mediump float;\n#endif';
  var ATTRIBUTE = /attribute\s+(\w+)\s+([\w_-]+)/gi;
  var UNIFORM = /uniform\s+(\w+)\s+([\w_-]+)(\[(\s+)?([\w_-]+))?/gi;
  var COMMENT = /(\/\/.+|\/\*[^(\*\/)]+\*\/)/i;

  /*

    Enumeration

  */

  var ELEMENT_ARRAY_BUFFER = 34963;
  var LINEAR_MIPMAP_LINEAR = 9987;
  var UNPACK_FLIP_Y_WEBGL = 37440;
  var TEXTURE_MAG_FILTER = 10240;
  var TEXTURE_MIN_FILTER = 10241;
  var COLOR_ATTACHMENT0 = 36064;
  var FRAGMENT_SHADER = 35632;
  var COMPILE_STATUS = 35713;
  var UNSIGNED_SHORT = 5123;
  var TEXTURE_WRAP_S = 10242;
  var TEXTURE_WRAP_T = 10243;
  var TRIANGLE_STRIP = 5;
  var CLAMP_TO_EDGE = 33071;
  var UNSIGNED_BYTE = 5121;
  var VERTEX_SHADER = 35633;
  var ARRAY_BUFFER = 34962;
  var FRAMEBUFFER = 36160;
  var STATIC_DRAW = 35044;
  var LINK_STATUS = 35714;
  var TEXTURE_2D = 3553;
  var TRIANGLES = 4;
  var TEXTURE0 = 33984;
  var NEAREST = 9728;
  var LINEAR = 9729;
  var FLOAT = 5126;
  var RGBA = 6408;
  var INT = 5124;

  /*

    Utils

  */

  var define = Object.defineProperty;

  /*

    Merge properties of `source` into `target`

  */

  function extend( target, source, overwrite ) {

    for ( var key in source )

      if ( overwrite || ( !( key in target ) || !exists( target[ key ] ) ) )

        target[ key ] = source[ key ];

    return target;
  }

  /*

    Checks whether an object has been defined

  */

  function exists( object ) {

    return object != null;
  }

  /*

    Checks whether a number is power of two

  */

  function isPowerOf2( value ) {
    
    return ( value & ( value - 1 ) ) === 0;
  }

  /*

    Load an image from a given path and fire a callback when ready

  */

  function loadImage( path, callback ) {

    var image = new Image();
    image.onload = function() { callback( image ); };
    image.src = path;
  }

  /*

    Returns the name of the uniform setter method for a uniform type,
    for example a type of `vec2` would yield `uniform2f`

  */

  function uniformMethod( type, span ) {

    return 'uniform{m}{d}{t}{a}'

      .replace( '{m}', /mat/i.test( type ) ? 'Matrix' : '' )
      .replace( '{d}', /\d$/.test( type ) ? type.match( /\d$/ )[0] : 1 )
      .replace( '{t}', /^[bis]/i.test( type ) ? 'i' : 'f' )
      .replace( '{a}', span > 0 ? 'v' : '' );
  }

  /*

    Returns the size (number of dimensions) of an object type

  */

  function getSize( type ) {

    return /\d/.test( type ) ? parseInt( type.match( /\d$/ )[0], 10 ) : 1;
  }

  /*

    Returns the WebGL datatype of an object type (e.g vec3 -> gl.FLOAT)

  */

  function getType( type ) {

    return /^[bi]/i.test( type ) ? INT : FLOAT;
  }

  /*

    Returns a string representing the type of object provided
    @see http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/

  */

  function toType( obj ) {

    return ({}).toString.call( obj ).match( /\s([a-zA-Z0-9]+)/ )[1].toLowerCase();
  }

  /*

    Highlights GLSL code and the location of an error therein

  */    

  function logShaderError( error, source ) {

    var line = /\d+:(\d+)/g.exec( error );

    if ( line ) {

      line = parseInt( line[1], 10 ) - 1;
      source = source.split( '\n' );

      console.log(
        
        '%c' + source.splice( 0, line ).join( '\n' ) +
        '%c' + '\n' + source[ 0 ] + '\n' +
        '%c' + source.splice( 1 ).join( '\n' ),

        'color: #ccc',
        'color: red',
        'color: #ccc'
      );
    }

    throw error;
  }

  // ##### Finally, return the API

  return GL;

})();