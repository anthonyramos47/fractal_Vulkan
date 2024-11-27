#version 450

// Constants
//const int MAX_ITERATIONS = 2000;



// Uniforms
layout(binding = 0) uniform ubo {
    vec2 RESOLUTION;
    vec2 CENTER;
    float ZOOM;
    int MAX_ITERATIONS;
};

const vec4 color1 = vec4(0.2, 0.0, 0.0, 1.0);
const vec4 color2 = vec4(1.0, 1.0, 1.0, 1.0);

// Output color
layout(location = 0) out vec4 fragColor;


vec4 blend(vec4 a, vec4 b, float factor) {
    vec3 color = a.rgb * (1.0 - factor) + b.rgb * factor;
    return vec4(color, 1.0);
}

vec2 complexMul(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}


float mandelbrot(vec2 c) {
    vec2 z = vec2(0.0, 0.0);
    float it = 0.0; // Iteration count
    for (int i = 0; i < MAX_ITERATIONS; i++) {
        z = complexMul(z, z) + c;

        if (dot(z, z) > 256.0*256.0) break;
        it+=1.0;
    }

    // If the iteration count is greater than the maximum, the point is in the set
    if (it > 999.0 ) {
        return 0.0;
    }

    // Smooth coloring calculation
    float sit = it - log2(log2(dot(z, z))) + 4.0;

    return sit;  
}


void main() {
    // Map pixel coordinates to the complex plane
    vec2 p = (2*gl_FragCoord.xy - RESOLUTION) / RESOLUTION.y;
    vec2 z = vec2(0.0, 0.0); // Starting point in the complex plane
    
    float zoo = exp(- ZOOM * log(2.0)) ;
    vec2 c = CENTER + (p)*zoo;

    float smoothIteration = mandelbrot(c);
   
    // Map smoothed iteration to color (you can modify this for different color schemes)
    vec3 col = 0.5 + 0.5*cos((3.0 + smoothIteration*0.15)*vec3(1.0,1.0,1.0) + vec3(0.0, 0.6, 1.0));

    fragColor = vec4(col, 1.0);
}
