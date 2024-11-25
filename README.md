--------------------------------------------------------------------
## Vulkan Particle Advection
### Contacts: peter.rautek@kaust.edu.sa
--------------------------------------------------------------------

# Introduction
In this assignment, you will explore particle simulation and rendering using the Vulkan API, focusing on both compute and graphics pipeline stages. Particle systems are a fundamental tool in computer graphics, commonly used to simulate effects such as fire, smoke, fluids, and more. In this project, you'll work with a particle advection framework where particles are influenced by a dynamic system and visualized as graphical elements on the screen.

You will be modifying various stages of the pipeline, including the compute, vertex, geometry, and fragment shaders. Your task is to implement meaningful changes in these shaders and adapt the Vulkan pipeline and memory management to reflect these modifications. This will reinforce your understanding of both shader programming and how Vulkan manages GPU resources.

The framework provided initializes the Vulkan setup, handles memory allocation, and defines the pipeline. It also implements the basic particle advection logic using a compute shader and visualizes particles using a combination of vertex, geometry, and fragment shaders. Your primary role will be to modify this pipeline to introduce new behavior, shapes, lighting models, etc. in the particle system and adapt the pipeline accordingly.

# Basic Setup of the Framework
* Compute Shader: Simulates the movement of particles based on forces or dynamical systems (e.g., the Lorenz attractor).
* Vertex Shader: Passes particle data (position and velocity) to the geometry shader.
* Geometry Shader: Constructs visual elements (glyphs like arrows) based on particle properties.
* Fragment Shader: Handles lighting and shading of the glyphs on screen.
You are required to make modifications to these shaders and ensure that the Vulkan pipeline can handle your changes. 

# Learning Objectives
By the end of this assignment, you should:

* Understand the Basics of Vulkan Pipelines
    * Gain hands-on experience working with Vulkan pipelines, focusing on the compute and graphics pipelines.
    * Learn how different shaders (compute, vertex, geometry, and fragment) are linked together in the pipeline.

* Adapt the Graphics Pipeline to Reflect Shader Changes
    * Modify the vertex, geometry, and fragment shaders to introduce new attributes such as color, size, and shape.
    * Update memory layouts and descriptor sets to handle these new attributes.

* Manage Vulkan Memory and Synchronization
    * Learn how to handle Vulkan’s low-level memory management and synchronization mechanisms.
    * Ensure data produced by the compute stage is correctly synchronized with the graphics pipeline.

* Understand the Interaction Between Shaders and Vulkan
    * Explore how data flows from the compute shader through the vertex and geometry shaders to the fragment shader.
    * Modify this data flow, ensuring that the pipeline remains functional and efficient.

# Tasks
1. Build and run the framework
    * You should see particles moving on the screen.

2. Explore the code, understand how data flows through the application and understand choices between alternatives. Include findings and answers to the following questions in your report.
    * In the framework we use the compute- and the graphics pipeline. What is the difference between the compute pipeline and the graphics pipeline? How are the compute pipeline and graphics pipeline used in the application (what are their roles)?
    * The compute shader uses specialization constants and push constants. What is the difference between specialization constants and push constants? When would you prefer to use one over the other in terms of performance, and flexibility.
    * In the vertex shader we use variables vec4 inPosition and vec4 inVelocity. How are the inPosition and inVelocity variables in the vertex shader supplied with data from the application?
    * In the geometry shader we use a uniform buffer. What is the difference between push constants and a uniform buffer? Why might a uniform buffer be used in this context instead of push constants?
3. Implement glfw functions to allow mouse and keyboard interactions to change certain parameters of the framework. 
    * Make the camera variables (float radius, and float rotationSpeed) global and change them when the user interacts with the mouse.
    * Implement glfw keyboard interactions (handle certain key events) to prepare for interactive parameter changes for the different shaders.
4. Change the Compute Shader
    * Implement the Lorenz [1] and the Chua or Chen Attractor [2] function to update velocities. 
    * Implement mouse/keyboard interactions that allow the user to interactively switch between attractors and control the parameters of the attractors (use push constants or uniforms).
    * Measure the performance. How much does the new shader impact the performance?
5. Change the Geometry Shader
    * Implement other geometrical primitives to visualize the particles. Implement (at least) cones as geometric glyphs to visualize the direction and speed of the particles.
    * Note that you need to compute the geometry and the normal vectors for each vertex.
    * Assign a different color to each glyph depending on its speed.
    * Measure the performance. How much does the new geometry shader impact the performance.
6. Change the Fragment Shader
    * Implement the Phong shading and Phong reflection model [3].
    * Implement suitable mouse/keyboard interactions to change the parameters of the Phong reflection model.
    * Measure the performance. How much does the new shader impact the performance?
7. Measure Performance
    * Measure performance when enabling and disabling the Vulkan Validation layer (look for the constant enableValidationLayers in the framework). How high is the overhead of the Vulkan validation layer?
    * Measure performance for an increasing number of particles (constant PARTICLE_COUNT). Plot a graph that shows the scaling behaviour of the application with the number of particles.
    * Measure performance for an increasing number of pixels (constants WIDTH and HEIGHT). Plot a graph that shows the scaling behaviour of the application with the number of pixels.
    * Measure performance for different settings of WORKGROUP_SIZE_X. Does it make a difference? Why?
8. Write your report and submit everything
    * Submit code, screenshots and the report by committing and pushing to your repository.

# BONUS Tasks [Optional]:
1. Implement additional variations of the compute shader. Find and implement physically inspired functions that update velocities and positions of the particles (gravity, accelleration/force fields, 3D velocity functions, vector potentials, noise functions).
2. Implement additional glyphs (e.g., ellipsoids, arrows, etc.) in the geometry shader.
3. C?hange the vertex shader: Transform the velocities with the normal matrix in the vertex shader and modify the geometry shader to use transformed velocities. Measure how much of a speedup does this modification provide? Why is it faster

# References

[1] https://en.wikipedia.org/wiki/Lorenz_system

[2] https://en.wikipedia.org/wiki/Multiscroll_attractor

[3] https://en.wikipedia.org/wiki/Phong_shading
