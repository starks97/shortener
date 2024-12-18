import React, { useEffect, useMemo } from "react";
import QRCode from "qrcode";
import getHexColor from "@utils/hexColors";

import { QRCodeGeneratorProps } from "~/interfaces";

/**
 * A React component that generates and renders a QR code on a canvas element.
 *
 * The `QRCodeGenerator` component takes a URL and renders its corresponding QR code onto a provided `<canvas>` element.
 * It allows customization of the QR code's size, foreground color, and background color. The component leverages
 * `useMemo` to optimize color calculations and `useEffect` to handle the QR code generation and rendering lifecycle.
 *
 * @template T - The type of the form data or any additional data associated with the QR code generation.
 *
 * @param props - The properties passed to the `QRCodeGenerator` component.
 * @param props.url - The URL to be encoded into the QR code. This should be a valid URL string.
 * @param props.canvasRef - A `React.RefObject` pointing to the `<canvas>` element where the QR code will be rendered.
 * @param props.size - (Optional) The width and height of the QR code in pixels. Defaults to `200`.
 * @param props.color - (Optional) The color of the QR code's dark modules. Accepts any valid CSS color string. Defaults to `"black"`.
 * @param props.bg - (Optional) The background color of the QR code. Accepts any valid CSS color string. Defaults to `"white"`.
 *
 * @returns `null`. This component does not render any JSX elements itself but manipulates the provided canvas element directly.
 *
 * @example
 * ```tsx
 * import React, { useRef } from 'react';
 * import QRCodeGenerator from './QRCodeGenerator';
 *
 * const App = () => {
 *   const canvasRef = useRef<HTMLCanvasElement>(null);
 *
 *   return (
 *     <div>
 *       <canvas ref={canvasRef} width={200} height={200}></canvas>
 *       <QRCodeGenerator
 *         url="https://www.example.com"
 *         canvasRef={canvasRef}
 *         size={200}
 *         color="blue"
 *         bg="yellow"
 *       />
 *     </div>
 *   );
 * };
 *
 * export default App;
 * ```
 *
 * @example
 * ```tsx
 * // Using default size and colors
 * <QRCodeGenerator
 *   url="https://www.openai.com"
 *   canvasRef={canvasRef}
 * />
 * ```
 *
 * @component
 */

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
