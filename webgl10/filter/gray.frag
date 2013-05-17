varying vec2 vUv;
uniform sampler2D tSource;
uniform vec2 delta;


void main() {
	gl_FragColor = vec4(vec3(dot(texture2D( tSource, vUv ).rgb, vec3(0.3, 0.59, 0.11))), 1.0);
}
