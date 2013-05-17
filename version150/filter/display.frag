/**
 * A Shader fitler to display a source image
 * @author Sebastian Schaefer
 * @date 2012
 * @namespace GLSL::Filter
 * @class DisplayImage
 */
#version 150 core

uniform sampler2D image; ///< the input image
uniform float gamma = 1.0; ///< gamma
uniform float brightness = 0.0; ///< brightness
uniform float contrast = 0.0; ///< contrast
uniform float alpha = 1.0;

in vec2 tex;	///< texture coordinated
out vec4 color; ///< the color output

void main()
{
    vec4 texColor = texture(image, tex);
    
    //apply gamma
    //add brightness
    vec3 result = pow(abs(texColor.rgb), vec3(gamma)) * sign(texColor.rgb) + vec3(brightness);
    
    //apply contrast
    float k = (contrast < 0) ? (1.0 + contrast) : (1.0 / (1.0 - contrast)); 
    result = 0.5 + ((result - 0.5) * vec3(k));
    
    //multiply alpha
    color = vec4(result, alpha * texColor.a);
}