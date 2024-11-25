#version 450

// Constants
const int MAX_ITERATIONS = 1000;



// Uniforms
layout(binding = 0) uniform ubo {
    vec2 RESOLUTION;
    vec2 CENTER;
    float ZOOM;
};

const vec4 color1 = vec4(0.2, 0.0, 0.0, 1.0);
const vec4 color2 = vec4(1.0, 1.0, 1.0, 1.0);

// Output color
layout(location = 0) out vec4 fragColor;


vec4 blend(vec4 a, vec4 b, float factor) {
    vec3 color = a.rgb * (1.0 - factor) + b.rgb * factor;
    return vec4(color, 1.0);
}


void main() {
    // Map pixel coordinates to the complex plane
    vec2 c = 2 * (gl_FragCoord.xy - 0.5 * RESOLUTION) / ZOOM + CENTER;
    vec2 z = vec2(0.0, 0.0); // Starting point in the complex plane

    // Initialize iteration count
    int iterations = 0;
    float smoothIteration = 0.0;

    // Mandelbrot iteration loop
    while (iterations < MAX_ITERATIONS && dot(z, z) < 4.0) {
        z = vec2(
            z.x * z.x - z.y * z.y + c.x, // Real part
            2.0 * z.x * z.y + c.y         // Imaginary part
        );
        iterations++;
    }


     // Smooth coloring calculation
    if (iterations < MAX_ITERATIONS) {
        // Calculate the fractional escape value for smoothing
        float log_zn = log(dot(z, z)) / 2.0;
        float nu = log(log_zn / log(2.0)) / log(2.0);
        smoothIteration = float(iterations) + 1.0 - nu;
    } else {
        smoothIteration = float(MAX_ITERATIONS);
    }

    // Map smoothed iteration to color (you can modify this for different color schemes)
    float colorValue = smoothIteration / float(MAX_ITERATIONS);
    

    fragColor = blend(color1, color2, colorValue);
}
