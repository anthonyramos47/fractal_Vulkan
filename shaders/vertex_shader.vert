#version 450

// Hardcoded positions for a fullscreen quad
vec2 positions[3] = vec2[](
    vec2(-1.0, -1.0),  // Bottom-left corner
    vec2(3.0, -1.0),   // Bottom-right corner (goes beyond for simplicity)
    vec2(-1.0, 3.0)    // Top-left corner (goes beyond for simplicity)
);

void main() {
    gl_Position = vec4(positions[gl_VertexIndex], 0.0, 1.0);
}