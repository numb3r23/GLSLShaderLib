varying vec2 vUv;
uniform sampler2D tSource;
uniform vec2 delta;

uniform float gamma; ///< gamma
uniform float brightness; ///< brightness
uniform float contrast; ///< contrast

void main() {
    vec4 texColor = texture2D( tSource, vUv);
    
    //apply gamma
    //add brightness
    vec3 result = pow(abs(texColor.rgb), vec3(gamma)) * sign(texColor.rgb) + vec3(brightness);
    
    //apply contrast
    float k = (contrast < 0.0) ? (1.0 + contrast) : (1.0 / (1.0 - contrast)); 
    result = 0.5 + ((result - 0.5) * vec3(k));
    
    //multiply alpha
    gl_FragColor = vec4(result, texColor.a);
}
