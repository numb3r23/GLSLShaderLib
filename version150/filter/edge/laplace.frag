/**
 * LaPlace filter for simple edge detection
 * @author Sebastian Schaefer
 * @date 2012
 * @namespace GLSL::Filter::Edge
 * @class LaPlace
 */
#version 150 core

uniform sampler2D image; ///< the input image

uniform int thresholdMethod = 2;
uniform float threshold0 = 0.5;
uniform float threshold1 = 0.0;
uniform float threshold2 = 0.2;
uniform float threshold3 = 0.0;
uniform float threshold4 = 1.0;


uniform bool useDiagonal = true;

in vec2 tex;	///< texture coordinated
out vec4 color; ///< the color output

float gray(vec4 c){
	return dot(c.xyz, vec3(0.3, 0.59, 0.11));
}

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

vec4[9] get3x3_gray(){
    vec4[9] tx = get3x3();
    for (int i=0; i < 9; i++){
        tx[i].rgb = vec3(gray(tx[i]));
    }
    return tx;
}

void main()
{
    vec4[9] tx = get3x3_gray();
    
	float edge = 0.0;
    if (thresholdMethod == 1)
    {
        edge = tx[0].r + tx[1].r + tx[2].r + tx[3].r;
        edge += tx[5].r + tx[6].r + tx[7].r + tx[8].r;
        edge -= 8 * tx[4].r;
        edge = abs(edge);
    }else{
        edge = tx[1].r + tx[3].r + tx[5].r + tx[7].r;
        edge -= 4 * tx[4].r;
    }
    edge = abs(edge);
	if (thresholdMethod == 1){
        edge = step(threshold0, edge);
    }
	else
        if (thresholdMethod == 2)
        {
            edge = smoothstep(threshold1, threshold2, edge);
        }
        else
            if (thresholdMethod == 3)
                edge = (edge >= threshold3)?(edge <= threshold4)?1.0:0.0:0.0;

    
	color.rgb = vec3(0.0, 0.0, 0.0);
	color.a = edge;
}