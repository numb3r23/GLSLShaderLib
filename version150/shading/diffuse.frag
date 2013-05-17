/**
 * diffuse shading (modified lambert & Oren-Nayar) based on G-Buffer maps
 * @author Sebastian Schaefer
 * @date 2012
 * @namespace GLSL::shading
 * @class Diffuse
 */
#version 150 core

uniform sampler2D albedoMap;
uniform sampler2D normalMap;
uniform sampler2D posMap;

uniform mat4x4 matIP;

uniform vec4 vLightPos = vec4(0, 0, 50, 0);
uniform vec3 vLightColor = vec3(1, 1, 1);

uniform vec3 vCamPos = vec3(1,1,1);

//lambert
uniform int steps = 0;
uniform float stepsSmooth = 0.2;
uniform float gamma = 1.0;
uniform float darkBottom = -1.0;

//orenNayar
uniform float roughnessSquared = 0;

uniform int method = 0; //1: Oren-Nayar, else: modified Lambert

//in / out
in vec2 tex;
out vec4 color;



struct ShadingData
{
	vec4 Position;
	vec2 TexCoord;
	vec3 Normal;
	vec3 ToLight;
    vec3 ToCam;
	vec4 Color;
	float NdotL;
    float NdotV;
	float Depth;
	bool Discardable;
};

ShadingData CalculateVSData(vec2 vTexCoord, vec4 vLightPos)
{
	ShadingData result;
	
	result.Color = texture(albedoMap, vTexCoord);

    result.Discardable = result.Color.a < 0.1;
	result.Normal = normalize(texture(normalMap, vTexCoord).rgb);

    result.Position = texture(posMap, vTexCoord);
    result.ToCam = normalize(vCamPos - result.Position.xyz);
    result.ToLight = normalize(vLightPos.xyz - result.Position.xyz);
    result.NdotL = dot(result.Normal, result.ToLight);
    result.NdotV = dot(result.Normal, result.ToCam);
	return result;
}


float lambert(float NdotL){
    return clamp((NdotL - darkBottom) / (1 - darkBottom), 0.0, 1.0);
}

float orenNayar(float LdotN, float VdotN, vec3 V, vec3 N, vec3 L){
	// Oren-Nayar model
	float A = 1.0 - (0.5 * roughnessSquared) / (roughnessSquared + 0.33);
	float B = (0.45 * roughnessSquared) / (roughnessSquared + 0.09);	
	
	float irradiance = max(0.0, LdotN);
	
	float angleViewNormal  = acos(VdotN);
	float angleLightNormal = acos(LdotN);
	
	float angleDiff = max(0.0, dot(normalize(V - N * VdotN), normalize(L - N * LdotN)));
	
	float alpha = max(angleViewNormal, angleLightNormal);
	float beta  = min(angleViewNormal, angleLightNormal);
				
	// final color
	return irradiance * (A + B * angleDiff * sin(alpha) * tan(beta));
}

void main()
{
	ShadingData data = CalculateVSData(tex, vLightPos);
    
    if (data.Discardable)
        discard;
    else
    {
        float illu = 0;
        if (method == 1)
            illu = orenNayar(data.NdotL, data.NdotV, data.ToCam, data.Normal, data.ToLight);
        else
            illu = lambert(data.NdotL);
        illu = pow(illu, gamma);
        
        if (steps > 1)
        {
            illu = clamp(illu * steps, 0, steps - 1);
            illu = smoothstep(0.5 - stepsSmooth, 0.5 + stepsSmooth, fract(illu)) + floor(illu);
            illu /= (steps - 1);
        }

        color = vec4(vec3(illu), 1.0);
    }
}
