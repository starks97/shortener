/**
 * Downloads a string as a file in the browser.
 *
 * This function creates a temporary anchor (`<a>`) element, sets its `href` attribute to the provided data URL,
 * and programmatically clicks it to trigger a download with the specified filename. After initiating the download,
 * it cleans up by revoking the object URL to free up memory.
 *
 * @param data - A string representing the data URL of the file to be downloaded (e.g., a blob URL).
 * @param filename - The name to assign to the downloaded file, including its extension (e.g., "image.png").
 *
 * @example
 * ```typescript
 * const dataURL = "data:text/plain;charset=utf-8,Hello%20World!";
 * downloadStringAsFile(dataURL, "hello.txt");
 * // Triggers a download of a file named "hello.txt" containing the text "Hello World!"
 * ```
 */

import { QRIcon } from "../Icons";

function downloadStringAsFile(data: string, filename: string) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = data;
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(data);
}

/**
 * A React component that provides a button to download a QR code from a canvas element.
 *
 * The `DownLoadQR` component accepts a reference to a `<canvas>` element containing a QR code. When the download
 * button is clicked, it converts the canvas content to a PNG image and initiates a download of the image file.
 *
 * @param props - The properties passed to the `DownLoadQR` component.
 * @param props.canvasRef - A `React.RefObject` pointing to the `<canvas>` element containing the QR code to be downloaded.
 *
 * @returns A React fragment containing a button styled to trigger the QR code download.
 *
 * @example
 * ```tsx
 * import React, { useRef } from 'react';
 * import DownLoadQR from './DownLoadQR';
 *
 * const QRCodeComponent = () => {
 *   const canvasRef = useRef<HTMLCanvasElement>(null);
 *
 *   // Assume QR code is drawn on the canvas
 *
 *   return (
 *     <div>
 *       <canvas ref={canvasRef}></canvas>
 *       <DownLoadQR canvasRef={canvasRef} />
 *     </div>
 *   );
 * };
 *
 * export default QRCodeComponent;
 * ```
 */

export default function DownLoadQR({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) {
  const onCanvasBtn = () => {
    const node = canvasRef.current;
    if (!node) {
      return;
    }

    const dataURI = node.toDataURL("image/png");

    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const blobURL = URL.createObjectURL(blob);

    downloadStringAsFile(blobURL, "qrcode-canvas.png");
  };

  return (
    <>
      <button
        onClick={onCanvasBtn}
        style={{ color: "white", fontSize: "2rem" }}
      >
        <QRIcon />
      </button>
    </>
  );
}
