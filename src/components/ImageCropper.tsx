"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, ZoomIn, ZoomOut, Check } from "lucide-react";

interface ImageCropperProps {
  image: string;
  aspectRatio?: number;
  onCrop: (croppedBlob: Blob) => void;
  onCancel: () => void;
}

// Helper to extract the cropped region using the exact pixels from the source image
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<Blob | null> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => resolve(img);
    img.onerror = () => reject("Failed to load image");
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Output size cap to prevent gigantic blobs slowing down uploads, 
  // while preserving high resolution.
  const MAX_WIDTH = 1200;
  let exportWidth = pixelCrop.width;
  let exportHeight = pixelCrop.height;

  if (exportWidth > MAX_WIDTH) {
    exportHeight = (MAX_WIDTH / exportWidth) * exportHeight;
    exportWidth = MAX_WIDTH;
  }

  canvas.width = exportWidth;
  canvas.height = exportHeight;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    exportWidth,
    exportHeight
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.95);
  });
}

export default function ImageCropper({ image, aspectRatio, onCrop, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropComplete = useCallback((croppedArea: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleExport = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const blob = await getCroppedImg(image, croppedAreaPixels);
      if (blob) onCrop(blob);
    } catch (e) {
      console.error(e);
      alert("Failed to crop image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, 
      backgroundColor: "rgba(11, 17, 29, 0.95)", // Midnight Navy
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white", borderRadius: "20px", overflow: "hidden", 
        maxWidth: "600px", width: "100%", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        display: "flex", flexDirection: "column"
      }}>
        
        {/* Header */}
        <div style={{ padding: "20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontWeight: "800", fontSize: "18px", color: "#0B111D" }}>Refine Listing Image</h3>
          <button onClick={onCancel} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}><X size={24} /></button>
        </div>

        {/* Cropping Area */}
        <div style={{ height: "400px", position: "relative", backgroundColor: "#333" }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio || 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            classes={{ containerClassName: 'cropper-container' }}
          />
        </div>

        {/* Controls */}
        <div style={{ padding: "24px", borderTop: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
             <button onClick={() => setZoom(z => Math.max(1, z - 0.2))} style={iconBtn}><ZoomOut size={18} /></button>
             <input
               type="range"
               value={zoom}
               min={1}
               max={3}
               step={0.1}
               onChange={(e) => setZoom(Number(e.target.value))}
               style={{ flex: 1, accentColor: "#008236" }}
             />
             <button onClick={() => setZoom(z => Math.min(3, z + 0.2))} style={iconBtn}><ZoomIn size={18} /></button>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
             <button onClick={onCancel} style={{ flex: 1, padding: "14px", borderRadius: "10px", border: "1px solid #e5e7eb", background: "none", fontWeight: "700", cursor: "pointer", color: "#374151" }}>Cancel</button>
             <button 
               onClick={handleExport} 
               disabled={isProcessing}
               style={{ flex: 1, padding: "14px", borderRadius: "10px", backgroundColor: "#008236", color: "white", border: "none", fontWeight: "700", cursor: isProcessing ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", opacity: isProcessing ? 0.7 : 1 }}
             >
               <Check size={20} /> {isProcessing ? "Processing..." : "Use Cropped Image"}
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}

const iconBtn = {
  width: "36px", height: "36px", borderRadius: "8px", border: "1px solid #e5e7eb", 
  backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", 
  color: "#374151", cursor: "pointer"
};
