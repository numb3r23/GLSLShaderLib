/**
 * A vertex shader to render a screenaligned quad a
 * @author Sebastian Schaefer
 * @date 2012
 * @namespace GLSL::Filter
 * @class BaseFilterVertexShader
 */
#version 150

in vec4 vertex;
in vec2 texCoord;

out vec2 tex;
out vec2 pos;

void main(void)
{
	gl_Position = vertex;
	tex = texCoord;
	pos = vertex.xy*0.5 + vec2(0.5);
}
