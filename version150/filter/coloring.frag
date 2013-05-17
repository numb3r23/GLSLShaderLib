/**
 * A Shader fitler to color a source image
 * @author Sebastian Schaefer
 * @date 2012
 * @namespace GLSL::Filter
 * @class DisplayImage
 */
#version 150 core

uniform sampler2D image; ///< the input image

uniform sampler2D gradient;

uniform vec3 colSg = vec3(0.078,0.396,0.671);
uniform vec3 colTint = vec3(0.078,0.396,0.671);
uniform vec3 colLo = vec3(0.314,0.314,0.569);
uniform vec3 colHi = vec3(0.812,0.812,0.569);

uniform int coloringMethod = 0;// 0: as is, 1: replace color, 2: tint, 3: 2Tone, 4:  fetch from gradient


in vec2 tex;	///< texture coordinated
in vec2 pos;
out vec4 color; ///< the color output

float gray(vec4 c){
	return clamp(dot(c.rgb, vec3(0.3, 0.59, 0.11)), 0.0, 1.0);
}

void main()
{
	color = texture(image, tex);
    float grey = gray(color);
    
    if (coloringMethod == 1){
        color.rgb = colSg;
    }else{
        if (coloringMethod == 2){
            color.rgb = mix(vec3(0,0,0), colTint, grey);
        }else{
			if (coloringMethod == 3){
				color.rgb = mix(colLo, colHi, grey);
			}else{
				if (coloringMethod >= 4){
                    ivec2 size = textureSize(gradient,0);
					color.rgb = texelFetch(gradient, ivec2(size.x * grey, 0), 0).rgb;
				}
			}
		}
    }
    
}