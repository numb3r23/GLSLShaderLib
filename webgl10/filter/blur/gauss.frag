varying vec2 vUv;
uniform sampler2D tSource;
uniform vec2 delta;

void main() {
	gl_FragColor =	texture2D( tSource, vUv);
	gl_FragColor.rgb = gl_FragColor.rgb * 0.25 +
		texture2D( tSource, vUv  + delta).rgb * 0.0625 +
		texture2D( tSource, vUv  - delta).rgb * 0.0625 +
		texture2D( tSource, vUv  + delta * vec2(1, -1)).rgb * 0.0625 +
		texture2D( tSource, vUv  + delta * vec2(- 1,1)).rgb * 0.0625 +

		texture2D( tSource, vUv  + delta * vec2(1, 0)).rgb * 0.125 +
		texture2D( tSource, vUv  - delta * vec2(0, 1)).rgb * 0.125 +
		texture2D( tSource, vUv  + delta * vec2(-1,0)).rgb * 0.125 +
		texture2D( tSource, vUv  + delta * vec2(0,-1)).rgb * 0.125;
}
