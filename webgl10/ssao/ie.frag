varying vec2 vUv;
uniform sampler2D tSource;
uniform sampler2D tDepth;
uniform sampler2D tBlurDepth;
uniform float intensity;

uniform vec2 delta;

void main() {
	//assuming depth is stored in the blue-channel
	float depthOrig = texture2D( tDepth, vUv ).b;
	float depthBlur = texture2D( tBlurDepth, vUv ).b;
	float diff = (-depthOrig + depthBlur) * intensity;
	gl_FragColor = texture2D( tSource, vUv );
	gl_FragColor.rgb -= vec3(abs(diff));
}
