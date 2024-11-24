function downloadStringAsFile(data: string, filename: string) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = data;
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(data);
}

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export default function DownLoadQR({ canvasRef }: Props) {
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
        download
      </button>
    </>
  );
}
