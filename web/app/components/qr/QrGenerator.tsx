import React, { useEffect, useMemo } from "react";
import QRCode from "qrcode";
import getHexColor from "@utils/hexColors";

interface QRCodeGeneratorProps {
  url: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  size?: number; // Size of the QR code
  color?: string; // Foreground color
  bg?: string; // Background color
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  url,
  canvasRef,
  size = 200,
  color = "black",
  bg = "white",
}) => {
  // Memoize processed colors to avoid recalculating them
  const qrColors = useMemo(
    () => ({
      dark: getHexColor(color),
      light: getHexColor(bg),
    }),
    [color, bg]
  );

  useEffect(() => {
    const generateQRCode = async () => {
      if (!url || !canvasRef.current) return;

      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const qrOptions = {
          width: size,
          margin: 1,
          color: qrColors,
        };

        // Generate QR Code Data URL
        const qrDataUrl = await QRCode.toDataURL(url, qrOptions);

        // Draw the QR Code on the Canvas
        const image = new Image();
        image.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawing
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Draw QR code
        };
        image.src = qrDataUrl;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [url, canvasRef, size, qrColors]); // Dependencies

  return null; // No UI rendering is needed for this component
};

export default QRCodeGenerator;
