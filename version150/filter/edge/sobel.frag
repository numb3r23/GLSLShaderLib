/**
 * Sobel filter for simple edge detection
 * @author Sebastian Schaefer
 * @date 2012
 * @namespace GLSL::Filter::Edge
 * @class Sobel
 */
#version 150 core

uniform sampler2D image; ///< the input image

in vec2 tex;	///< texture coordinated
out vec4 color; ///< the color output

uniform int thresholdMethod = 0;
uniform float threshold0 = 0.5;
uniform float threshold1 = 0.5;
uniform float threshold2 = 0.3;
uniform float threshold3 = 0.0;
uniform float threshold4 = 1.0;

uniform vec3 edgeColor = vec3(0.0, 0.0, 0.0);

vec4[9] get3x3(){
    return vec4[9](
	textureOffset(image, tex, ivec2(-1,  1)),
	textureOffset(image, tex, ivec2(-1,  0)), 
	textureOffset(image, tex, ivec2(-1, -1)), 
    
	textureOffset(image, tex, ivec2( 0,  1)), 
	texture(image, tex),
	textureOffset(image, tex, ivec2( 0, -1)),
    
	textureOffset(image, tex, ivec2( 1,  1)), 
	textureOffset(image, tex, ivec2( 1,  0)), 
    textureOffset(image, tex, ivec2( 1, -1)));
}

vec4 applyKernel_3x3(float[9] k, vec4[9] tx)
{
    vec4 res = vec4(0,0,0,1);
    
    for (int i=0; i <9; i++)
    res += k[i] * tx[i];
    
    return res;
}

void main()
{
    vec4[9] tx = get3x3();
    
    const float[9] kX = float[9](-1, -2, -1, 0, 0, 0, 1, 2, 1);
    const float[9] kY = float[9](-1, 0, 1, -2, 0, 2, -1, 0, 1);
    
    vec4 gX = applyKernel_3x3(kX, tx);
    vec4 gY = applyKernel_3x3(kY, tx);
    vec4 g = sqrt(gX*gX + gY*gY);

	float edge = g.x;
    
	if (thresholdMethod == 1){
        edge = step(threshold0, edge);
    }else{
        if (thresholdMethod == 2){
            edge = smoothstep(threshold1, threshold2, edge);
        }
        else
            if (thresholdMethod == 3){
                edge = ((edge >= threshold3) && (edge <= threshold4))?1.0:0.0;
            }

    }

	color.rgb = edgeColor;
	color.a = abs(edge);
}