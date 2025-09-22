"use client";
import "@google/model-viewer";
// @ts-ignore
export default function ModelViewer() {
  // Uses a placeholder model path; replace with a .glb you add in /public/models
  return (
    <model-viewer
      src="/models/sample.glb"
      alt="Sample 3D model"
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      auto-rotate
      style={{ width: "100%", height: "70vh", background: "transparent" }}
    />
  );
}
