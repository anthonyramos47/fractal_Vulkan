cmake_minimum_required(VERSION 3.13)

project(VulkanTutorial)

set(CMAKE_CXX_STANDARD 17)

find_package(Vulkan REQUIRED)
add_subdirectory(external/glfw)
add_subdirectory(external/glm)

include_directories(external/glfw/include)
include_directories(external/glm)

# Source files
set(SOURCE_FILES
    src/main.cpp
    src/VulkanApp.cpp
    src/VulkanApp.h
)

# Add the executable
add_executable(VulkanTutorial ${SOURCE_FILES})

# Shader files
set(SHADER_SRC_DIR "${CMAKE_CURRENT_SOURCE_DIR}/shaders")
set(SHADER_BIN_DIR "${CMAKE_CURRENT_BINARY_DIR}/shaders")

# List all shader source files
set(SHADER_FILES
    ${SHADER_SRC_DIR}/vertex_shader.vert
    ${SHADER_SRC_DIR}/fragment_shader.frag
)

# Create the output directory for compiled shaders
file(MAKE_DIRECTORY ${SHADER_BIN_DIR})

# Find glslangValidator
find_program(GLSLANG_VALIDATOR glslangValidator HINTS $ENV{VULKAN_SDK}/Bin)
if(NOT GLSLANG_VALIDATOR)
    message(FATAL_ERROR "glslangValidator not found! Please ensure it's in your PATH or specify its location.")
endif()

# List to hold the compiled shader files
set(COMPILED_SHADERS)

foreach(SHADER ${SHADER_FILES})
    # Get the file name and extension
    get_filename_component(FILE_NAME ${SHADER} NAME)
    get_filename_component(FILE_EXT ${SHADER} EXT)
    get_filename_component(FILE_NAME_WE ${SHADER} NAME_WE)

    # Set the output file name (e.g., vertex_shader.vert.spv)
    set(SPIRV_FILE "${SHADER_BIN_DIR}/${FILE_NAME}.spv")

    # Add to the list of compiled shaders
    list(APPEND COMPILED_SHADERS ${SPIRV_FILE})

    # Determine the shader type based on the extension
    if(FILE_EXT STREQUAL ".geom")
        set(SHADER_STAGE "geom")
    elseif(FILE_EXT STREQUAL ".vert")
        set(SHADER_STAGE "vert")
    elseif(FILE_EXT STREQUAL ".frag")
        set(SHADER_STAGE "frag")
    elseif(FILE_EXT STREQUAL ".comp")
        set(SHADER_STAGE "comp")
    else()
        message(FATAL_ERROR "Unknown shader file extension: ${FILE_EXT}")
    endif()

    # Add custom command to compile the shader
    add_custom_command(
        OUTPUT ${SPIRV_FILE}
        COMMAND ${GLSLANG_VALIDATOR} -V ${SHADER} -o ${SPIRV_FILE}
        DEPENDS ${SHADER}
        COMMENT "Compiling shader ${FILE_NAME}"
        VERBATIM
    )
endforeach()

# Add custom target for shaders
add_custom_target(shaders 
    SOURCES ${SHADER_FILES}
    DEPENDS ${COMPILED_SHADERS}
)

# Make Fratals depend on the Shaders target
add_dependencies(VulkanTutorial shaders)

# Link the libraries
target_link_libraries(VulkanTutorial Vulkan::Vulkan glfw glm)

# Add definition for shader directory
target_compile_definitions(VulkanTutorial PRIVATE SHADER_BINARY_DIR="${SHADER_BIN_DIR}")
