/**
 * A simple 3x3 gaussian convolution filter, non-separated version
 * @author Sebastian Schaefer
 * @date 2012
 * @namespace GLSL::Filter::Blur
 * @class Gauss3x3
 */
#version 150 core

uniform sampler2D image; ///< the input image

in vec2 tex;	///< texture coordinated
out vec4 color; ///< the color output

/**
 * The main routine: read the 3x3 neighbours and multiply with kernel
 */
void main()
{
	vec4 lt = textureOffset(image, tex, ivec2(-1,  1)); 
	vec4 lm = textureOffset(image, tex, ivec2(-1,  0)); 
	vec4 lb = textureOffset(image, tex, ivec2(-1, -1)); 

	vec4 mt = textureOffset(image, tex, ivec2( 0,  1)); 
	vec4 mm = texture(image, tex); 
	vec4 mb = textureOffset(image, tex, ivec2( 0, -1)); 

	vec4 rt = textureOffset(image, tex, ivec2( 1,  1)); 
	vec4 rm = textureOffset(image, tex, ivec2( 1,  0)); 
	vec4 rb = textureOffset(image, tex, ivec2( 1, -1));

	color = (
		lt+2.0*lm+lb+
		2.0*mt+4.0*mm+2.0*mb+
		rt+2.0*rm+rb)
		/16.0;
	color.a = (
               lt.a+2.0*lm.a+lb.a+
               2.0*mt.a+4.0*mm.a+2.0*mb.a+
               rt.a+2.0*rm.a+rb.a)
    /16.0;
}