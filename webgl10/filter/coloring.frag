varying vec2 vUv;
uniform sampler2D tSource;
uniform vec2 delta;

uniform vec3 colorLo;
uniform vec3 colorHi;

uniform float steps;

void main() {
	vec4 source = texture2D( tSource, vUv);
	float illu = source.r;
	if (steps == 1.0)
		illu = 0.5;
	else
		if (steps > 1.0)
			illu = floor(clamp(illu * steps, 0.0, steps - 1.0))/(steps - 1.0);
	gl_FragColor = vec4(mix(colorLo, colorHi, illu), source.a);
}
