/**
 * An advanced linear 9x9 gaussian convolution filter, separated horizontal 
 * @author rastergrid.com
 * @date 2012
 * @namespace GLSL::Filter::Blur
 * @class Gauss9x9H
 */
#version 150 core

uniform sampler2D image;

out vec4 color;

in vec2 tex;	///< texture coordinated
void main(void)
{
	vec4 m1 = textureOffset(image, tex, ivec2( 1,  0)); 
	vec4 m2 = texture(image, tex); 
	vec4 m3 = textureOffset(image, tex, ivec2( -1, 0)); 
    
    float sum = (m1.a + 2*m2.a + m3.a);
	color.rgb = m1.rgb * m1.a + m2.rgb * 2 * m2.a + m3.rgb * m3.a;
    color.rgb /= sum;
    color.a = m2.a;
}
