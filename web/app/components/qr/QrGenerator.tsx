import React, { useEffect, useMemo } from "react";
import QRCode from "qrcode";
import getHexColor from "@utils/hexColors";

import { QRCodeGeneratorProps } from "~/interfaces";

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  url,
  canvasRef,
  size = 200,
  color = "black",
  bg = "white",
}) => {
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

        const qrDataUrl = await QRCode.toDataURL(url, qrOptions);

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
  }, [url, canvasRef, size, qrColors]);

  return null;
};

export default QRCodeGenerator;
