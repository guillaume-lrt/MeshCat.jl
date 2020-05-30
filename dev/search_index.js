var documenterSearchIndex = {"docs":
[{"location":"#MeshCat.jl-1","page":"MeshCat.jl","title":"MeshCat.jl","text":"","category":"section"},{"location":"#API-Reference-1","page":"MeshCat.jl","title":"API Reference","text":"","category":"section"},{"location":"#","page":"MeshCat.jl","title":"MeshCat.jl","text":"Modules = [MeshCat]\nOrder = [:type, :function]","category":"page"},{"location":"#MeshCat.AbstractVisualizer","page":"MeshCat.jl","title":"MeshCat.AbstractVisualizer","text":"Abstract parent type of MeshCat.Visualizer.\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.Animation","page":"MeshCat.jl","title":"MeshCat.Animation","text":"Create a new animation. See atframe to adjust object poses or properties in that animation.\n\nAnimation() -> Animation\nAnimation(fps::Int64) -> Animation\n\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.ArrowVisualizer","page":"MeshCat.jl","title":"MeshCat.ArrowVisualizer","text":"Helper type for rendering arrows in the visualizer.\n\nUsage:\n\nGiven a Visualizer named vis, we can create an arrow with:\n\nArrowVisualizer arrow(vis)\nsetobject!(arrow)\n\nWe can then set the base and direction of the arrow with:\n\nsettransform!(arrow, Point(0.0, 0.0, 0.0), Vec(0.5, 0.5, 0.0))\n\nNote that this settransform! should work correctly inside an Animation, as long as you do setobject! before starting the animation.\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.Cone","page":"MeshCat.jl","title":"MeshCat.Cone","text":"A 3D cone, represented by the position of the origin of its base, the position of its tip, and the radius of its base.\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.HyperEllipsoid","page":"MeshCat.jl","title":"MeshCat.HyperEllipsoid","text":"N-dimensional ellipsoid. Note that only N=3 dimensional ellipsoids can be rendered in the visualizer.\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.MeshFileGeometry","page":"MeshCat.jl","title":"MeshCat.MeshFileGeometry","text":"An MeshFileGeometry represents a mesh which is stored as the raw contents of a file, rather than as a collection of points and vertices. This is useful for transparently passing mesh files which we can't load in Julia directly to meshcat.\n\nSupported formats:     * .stl (ASCII and binary)     * .obj     * .dae (Collada)\n\nFor .obj and .dae files, only a single mesh geometry will be loaded, and any material or texture properties will be ignored. To load an entire collection of objects (complete with materials and textures) from an .obj or .dae file, see MeshFileObject instead.\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.MeshFileObject","page":"MeshCat.jl","title":"MeshCat.MeshFileObject","text":"A MeshFileObject is similar to a MeshFileGeometry, but rather than representing a single geometry, it supports loading an entire object (with geometries, materials, and textures), or even a collection of objects (for supported file types).\n\nSupported formats:     * .obj     * .dae (Collada)\n\nSince mesh files may include references to other files (such as texture images), the MeshFileObject also includes a resources dictionary mapping relative paths (as specified in the mesh file) to the contents of the referenced files. Those contents are specified using data URIs, e.g.:\n\ndata:image/png;base64,<base-64 encoded data here>\n\nIf you construct a MeshFileObject from a .dae or .obj file, the resources dictionary will automatically be populated.\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.Object","page":"MeshCat.jl","title":"MeshCat.Object","text":"Represents a three.js Object, consisting of a geometry and a material.\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.PointCloud","page":"MeshCat.jl","title":"MeshCat.PointCloud","text":"A collection of points which will be rendered as a point cloud in the visualiezr.\n\nYou can set the color of each point indepenedntly when you construct a PointCloud, or you can set the overall point color by passing a PointsMaterial as the material when you call setobject!(vis, point_cloud, material)\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.Triad","page":"MeshCat.jl","title":"MeshCat.Triad","text":"A visual representation of the origin of a coordinate system, drawn as three lines in red, green, and blue along the x, y, and z axes. The scale parameter controls the length of the three lines.\n\n\n\n\n\n","category":"type"},{"location":"#MeshCat.Visualizer","page":"MeshCat.jl","title":"MeshCat.Visualizer","text":"vis = Visualizer()\n\nConstruct a new MeshCat visualizer instance.\n\nUseful methods:\n\nvis[:group1] # get a new visualizer representing a sub-tree of the scene\nsetobject!(vis, geometry) # set the object shown by this visualizer's sub-tree of the scene\nsettransform!(vis, tform) # set the transformation of this visualizer's sub-tree of the scene\nsetvisible!(vis, false) # hide this part of the scene\n\n\n\n\n\n","category":"type"},{"location":"#Base.delete!-Tuple{Visualizer}","page":"MeshCat.jl","title":"Base.delete!","text":"Delete the geometry at this visualizer's path and all of its descendants.\n\ndelete!(vis::Visualizer) -> Visualizer\n\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.atframe-Tuple{Any,Animation,Integer}","page":"MeshCat.jl","title":"MeshCat.atframe","text":"Call the given function f, but intercept any settransform! or setprop! calls and apply them to the given animation at the given frame instead.\n\natframe(f::Any, animation::Animation, frame::Integer) -> Animation\n\n\nUsage:\n\nvis = Visualizer()\nsetobject!(vis[:cube], HyperCube(Vec(0.0, 0.0, 0.0), 0.5))\n\nanim = Animation()\n\n# At frame 0, set the cube's position to be the origin\natframe(anim, 0) do\n    settransform!(vis[:cube], Translation(0.0, 0.0, 0.0))\nend\n\n# At frame 30, set the cube's position to be [1, 0, 0]\natframe(anim, 30) do\n    settransform!(vis[:cube], Translation(1.0, 0.0, 0.0))\nend\n\nsetanimation!(vis, anim)\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.render-Tuple{Visualizer}","page":"MeshCat.jl","title":"MeshCat.render","text":"Render a MeshCat visualizer inline in Jupyter, Juno, or VSCode.\n\nIf this is the last command in a Jupyter notebook cell, then the visualizer should show up automatically in the corresponding output cell.\n\nIf this is run from the Juno console, then the visualizer should show up in the Juno plot pane. Likewise if this is run from VSCode with the julia-vscode extension, then the visualizer should show up in the Julia Plots pane.\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.render_static-Tuple{Visualizer,Vararg{Any,N} where N}","page":"MeshCat.jl","title":"MeshCat.render_static","text":"Render a static version of the visualizer, suitable for embedding and offline use. The embedded visualizer includes all geometries, properties, and animations which have been added to the scene, baked into a single HTML document. This document also includes the full compressed MeshCat javascript source files, so it should render properly even after you've exited Julia and even if you have no internet access.\n\nTo get access to the raw static HTML representation, see static_html\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.setanimation!-Tuple{Visualizer,Animation}","page":"MeshCat.jl","title":"MeshCat.setanimation!","text":"Set the currently playing animation in the visualizer.\n\nsetanimation!(vis::Visualizer, anim::Animation; play, repetitions)\n\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.setobject!-Tuple{AbstractVisualizer,Union{GeometryTypes.AbstractGeometry, GeometryTypes.AbstractMesh, MeshFileGeometry},AbstractMaterial}","page":"MeshCat.jl","title":"MeshCat.setobject!","text":"setobject!(vis::AbstractVisualizer, geom::Union{GeometryTypes.AbstractGeometry, GeometryTypes.AbstractMesh, MeshFileGeometry}, material::AbstractMaterial) -> Visualizer\n\n\nThis will construct an appropriate three.js object from the given geometry and the given material.\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.setobject!-Tuple{AbstractVisualizer,Union{GeometryTypes.AbstractGeometry, GeometryTypes.AbstractMesh, MeshFileGeometry}}","page":"MeshCat.jl","title":"MeshCat.setobject!","text":"setobject!(vis::AbstractVisualizer, geom::Union{GeometryTypes.AbstractGeometry, GeometryTypes.AbstractMesh, MeshFileGeometry}) -> Visualizer\n\n\nThis will construct an appropriate three.js object from the given geometry and a default material.\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.setobject!-Tuple{Visualizer,AbstractObject}","page":"MeshCat.jl","title":"MeshCat.setobject!","text":"Set the object at this visualizer's path. This replaces whatever geometry was presently at that path.\n\nsetobject!(vis::Visualizer, obj::AbstractObject) -> Visualizer\n\n\nTo draw multiple geometries, place them at different paths by using the slicing notation:\n\nsetobject!(vis[:group1][:box1], geometry1)\nsetobject!(vis[:group1][:box2], geometry2)\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.setprop!-Tuple{Visualizer,AbstractString,Any}","page":"MeshCat.jl","title":"MeshCat.setprop!","text":"Set a single property for the object at the given path.\n\nsetprop!(vis::Visualizer, property::AbstractString, value::Any) -> Visualizer\n\n\n(this is named setprop! instead of setproperty! to avoid confusion with the Base.setproperty! function introduced in Julia v0.7)\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.settransform!-Tuple{Visualizer,CoordinateTransformations.Transformation}","page":"MeshCat.jl","title":"MeshCat.settransform!","text":"Set the transform of this visualizer's path. This can be done before or after adding an object at that path.\n\nsettransform!(vis::Visualizer, tform::CoordinateTransformations.Transformation) -> Visualizer\n\n\nThe overall transform of an object is the composition of the transforms of all of its parents, so setting the transform of vis[:group1] affects the poses of the objects at vis[:group1][:box1] and vis[:group1][:box2].\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.setvisible!-Tuple{AbstractVisualizer,Bool}","page":"MeshCat.jl","title":"MeshCat.setvisible!","text":"Toggle visibility of the visualizer at the current path.\n\nsetvisible!(vis::AbstractVisualizer, visible::Bool) -> Visualizer\n\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.static_html-Tuple{Visualizer}","page":"MeshCat.jl","title":"MeshCat.static_html","text":"Extract a single HTML document containing the entire MeshCat scene, including all geometries, properties, and animations, as well as all required javascript assets. The resulting HTML document should render correctly after you've exited Julia, and even if you have no internet access.\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.CoreVisualizer","page":"MeshCat.jl","title":"MeshCat.CoreVisualizer","text":"Low-level type which manages the actual meshcat server. See Visualizer for the public-facing interface.\n\n\n\n\n\n","category":"type"},{"location":"#Base.getindex-Tuple{Visualizer,Vararg{Any,N} where N}","page":"MeshCat.jl","title":"Base.getindex","text":"Get a new Visualizer representing a sub-tree of the same scene.\n\ngetindex(vis::Visualizer, path::Vararg{Any,N} where N) -> Visualizer\n\n\nFor example, if you have vis::Visualizer with path /meshcat/foo, you can do vis[:bar] to get a new Visualizer with path /meshcat/foo/bar.\n\n\n\n\n\n","category":"method"},{"location":"#Base.merge!-Tuple{Animation,Vararg{Animation,N} where N}","page":"MeshCat.jl","title":"Base.merge!","text":"Merge multiple animations, storing the result in a.\n\nmerge!(a::Animation, others::Vararg{Animation,N} where N) -> Animation\n\n\n\n\n\n\n","category":"method"},{"location":"#Base.merge-Tuple{Animation,Vararg{Animation,N} where N}","page":"MeshCat.jl","title":"Base.merge","text":"Merge two or more animations, returning a new animation.\n\nmerge(a::Animation, others::Vararg{Animation,N} where N) -> Animation\n\n\nThe animations may involve the same properties or different properties (animations of the same property on the same path will have their events interleaved). All animations must have the same framerate.\n\n\n\n\n\n","category":"method"},{"location":"#Base.open-Tuple{Visualizer,Vararg{Any,N} where N}","page":"MeshCat.jl","title":"Base.open","text":"Open the visualizer. By default, this will launch your default web browser pointing to the visualizer's URL.\n\n\n\n\n\n","category":"method"},{"location":"#Base.wait-Tuple{Visualizer}","page":"MeshCat.jl","title":"Base.wait","text":"wait(v::Visualizer)\n\n\nWait until at least one browser has connected to the visualizer's server. This is useful in scripts to delay execution until the browser window has opened.\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.convert_frames_to_video","page":"MeshCat.jl","title":"MeshCat.convert_frames_to_video","text":"Convert the .tar file of still images produced by the meshcat \"record\" feature into a video.\n\nconvert_frames_to_video(tar_file_path::AbstractString) -> Any\nconvert_frames_to_video(tar_file_path::AbstractString, output_path::AbstractString; framerate, overwrite) -> Any\n\n\nTo record an animation which has been played in the meshcat visualizer, click \"Open Controls\", then navigate to the \"Animations\" folder and click \"record\". This will step through the animation frame-by-frame and then prompt you to download a .tar file containing the resulting frames. You can then pass the path to that .tar file to this function to produce a video.\n\nThis uses FFMPEG.jl internally, so you do not need to have installed ffmpeg manually.\n\n\n\n\n\n","category":"function"},{"location":"#MeshCat.develop_meshcat_assets","page":"MeshCat.jl","title":"MeshCat.develop_meshcat_assets","text":"Use git to clone the meshcat javascript assets repository for local development.\n\ndevelop_meshcat_assets()\ndevelop_meshcat_assets(skip_confirmation)\n\n\nYou should only do this if you plan on editing the javascript or HTML components of meshcat itself. To undo this operation, you will need to delete the assets/meshcat folder and then run using Pkg; Pkg.build(\"MeshCat\")\n\n\n\n\n\n","category":"function"},{"location":"#MeshCat.intrinsic_transform-Tuple{Any}","page":"MeshCat.jl","title":"MeshCat.intrinsic_transform","text":"intrinsic_transform(g)\n\n\nDifferent tools disagree about what various geometric primitives mean. For example, GeometryTypes.jl considers the \"origin\" of a cube to be its bottom-left corner, where DrakeVisualizer and MeshCat consider its origin to be the center. The intrinsic_transform(g) returns the transform from the GeometryTypes origin to the MeshCat origin.\n\n\n\n\n\n","category":"method"},{"location":"#MeshCat.lower","page":"MeshCat.jl","title":"MeshCat.lower","text":"Convert a geometry, material, object, or transform into the appropriate plain data structures expected by three.js. Most objects are lowered into Dicts matching the JSON structure used by three.js.\n\n\n\n\n\n","category":"function"},{"location":"#MeshCat.mergesorted!-Tuple{AbstractArray{T,1} where T,Any,Any}","page":"MeshCat.jl","title":"MeshCat.mergesorted!","text":"mergesorted!(dest::AbstractVector, a, b; by=identity, lt=isless)\n\nMerge sorted iterators a and b, storing the result in dest. dest should be of the appropriate length to store all elements of a and b; it is not resized.\n\nFor equivalent elements in a and b, the elements from a (preserving their original order) precede the elements from b (preserving their original order).\n\nElements are compared by (x, y) -> lt(by(x), by(y))\n\nThe behavior is undefined if dest overlaps a or b (though the a and b may overlap each other) or if a or b are not sorted.\n\nAdapted from https://en.cppreference.com/w/cpp/algorithm/merge.\n\n\n\n\n\n","category":"method"}]
}
