GLSLShaderLib
=============

A library of GLSL shaders

Most shaders are created for readability/"educational purposes" = _not_ optimized for speed. Actually most stuff could be done much faster.

## Folder structure

As every GLSL version has different functions the implementation of a single shader can vary quite dramatically between versions. To reflect that the top directory stores the GLSL version:
  
    \root
    |- version 150
    |- ...
  
## Shader organization

The shaders are sorted by *type* like filter, shading, npr, .... Each fragment-shader is implemented as an image space filter which can be directly used in a deferred renderer. With some minor adjustments it can be integrated in a regular forward rendering system: instead of reading the per-fragment data from a texture they have to be read from attributes.
