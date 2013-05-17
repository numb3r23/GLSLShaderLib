/**
 * outlines based on the paper "Image Enhancement by unsharp masking the depth buffer"
 * @author Sebastian Schaefer
 * @date 2012
 * @namespace GLSL::SSAO
 * @class OutlineIE
 */
#version 150 core

uniform sampler2D image;
uniform sampler2D imageB;

uniform float DarkenOutside = 0.123;
uniform float DarkenInside = 0.235;

in vec2 tex;
out vec4 color;

float intensity(vec4 color){
	return color.r;
}

void main()
{
	vec4 depth = texture( image, tex);
	vec4 depthBlur = texture( imageB, tex);

	float diff = intensity(depthBlur) - intensity(depth);
	float darken = 0.0;
    
    vec3 c = vec3(0,1,0);
	
    float edge = 0;
	float edge2 = diff * (DarkenOutside); 
	
	if (diff < 0.0)
	{
        c = vec3(0,0,0);
		edge = -diff * DarkenOutside;
	}
	if (diff > 0.0)
	{
        c = vec3(1,1,1);
		edge = diff * DarkenInside;
	}
    
    edge = clamp(edge, 0.0, 1.0);
    //could be done via alpha here...
	/*
	color.rgb = vec3(0.0, 0.0, 0.0);
	color.a = edge;
	*/
	color.rgb = vec3(edge);
	color.a = 1.0;
}
