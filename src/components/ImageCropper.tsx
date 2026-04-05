"use client";

import { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, Check, Move } from "lucide-react";

interface ImageCropperProps {
  image: string; // Base64 or URL
  aspectRatio?: number; // 1 for square (portraits), etc.
  onCrop: (croppedBlob: Blob) => void;
  onCancel: () => void;
}

export default function ImageCropper({ image, aspectRatio, onCrop, onCancel }: ImageCropperProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Initialize Position
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  }, [image]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  const getCroppedImage = () => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use higher resolution for the crop
    const targetSize = 600;
    canvas.width = targetSize;
    canvas.height = aspectRatio ? targetSize / aspectRatio : targetSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Adjust position for the crop
    const imgAspect = imgRef.current.width / imgRef.current.height;
    const drawWidth = canvas.width;
    const drawHeight = canvas.width / imgAspect;

    ctx.drawImage(
      imgRef.current,
      -drawWidth / 2 + position.x,
      -drawHeight / 2 + position.y,
      drawWidth,
      drawHeight
    );

    ctx.restore();

    canvas.toBlob((blob) => {
      if (blob) onCrop(blob);
    }, "image/jpeg", 0.9);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, 
      backgroundColor: "rgba(11, 17, 29, 0.95)", // Midnight Navy
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white", borderRadius: "20px", overflow: "hidden", 
        maxWidth: "600px", width: "100%", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
      }}>
        
        {/* Header */}
        <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontWeight: "800", fontSize: "18px", color: "#0B111D" }}>Refine Listing Image</h3>
          <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}><X size={24} /></button>
        </div>

        {/* Cropping Area */}
        <div 
          style={{ 
            height: "400px", backgroundColor: "#000", position: "relative", overflow: "hidden", cursor: dragging ? "grabbing" : "grab",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <img 
            ref={imgRef}
            src={image} 
            alt="To crop" 
            draggable={false}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}45deg) scale(${zoom})`,
              maxWidth: "none",
              userSelect: "none"
            }}
          />
          
          {/* Sighting Box */}
          <div style={{
            position: "absolute",
            width: aspectRatio ? (aspectRatio > 1 ? "90%" : "300px") : "300px",
            height: aspectRatio ? (aspectRatio > 1 ? (90 / aspectRatio) + "%" : "300px") : "300px",
            border: "2px solid #008236",
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
            pointerEvents: "none",
            borderRadius: aspectRatio === 1 ? "12px" : "4px"
          }}>
             <div style={{ position: "absolute", top: "10px", left: "10px", color: "white", fontSize: "10px", fontWeight: "900", letterSpacing: "1px" }}>PREVIEW AREA</div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "24px" }}>
             <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} style={ctrlBtn}><ZoomOut size={20} /></button>
             <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} style={ctrlBtn}><ZoomIn size={20} /></button>
             <button onClick={() => setRotation(r => r - 90)} style={ctrlBtn}><RotateCcw size={20} /></button>
             <button onClick={() => setPosition({ x: 0, y: 0 })} style={ctrlBtn}><Move size={20} /></button>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
             <button onClick={onCancel} style={{ flex: 1, padding: "14px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "none", fontWeight: "700", cursor: "pointer" }}>Cancel</button>
             <button onClick={getCroppedImage} style={{ flex: 1, padding: "14px", borderRadius: "10px", backgroundColor: "#008236", color: "white", border: "none", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
               <Check size={20} /> Use Cropped Image
             </button>
          </div>
        </div>

        {/* Hidden Canvas for Processing */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
}

const ctrlBtn = {
  width: "44px", height: "44px", borderRadius: "10px", border: "1px solid #e5e7eb", 
  backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", 
  color: "#374151", cursor: "pointer"
};
