/**
 * 이미지 바이트에서 가로·세로 픽셀 크기를 읽는다. <img width height>를 미리
 * 지정해서 로딩 중 레이아웃이 흔들리는 걸(CLS) 막기 위함. PNG와 WebP(손실/
 * 무손실/확장)만 지원 — 그 외 포맷이거나 파싱 실패 시 null.
 */
export function getImageDimensions(buf: ArrayBuffer): { width: number; height: number } | null {
    try {
        const view = new DataView(buf);
        if (buf.byteLength >= 24 && view.getUint32(0) === 0x89504e47) {
            // PNG: signature(8) + IHDR length(4) + "IHDR"(4) + width(4) + height(4)
            return { width: view.getUint32(16), height: view.getUint32(20) };
        }

        if (
            buf.byteLength >= 30 &&
            view.getUint32(0) === 0x52494646 && // "RIFF"
            view.getUint32(8) === 0x57454250 // "WEBP"
        ) {
            const fourCC = String.fromCharCode(
                view.getUint8(12),
                view.getUint8(13),
                view.getUint8(14),
                view.getUint8(15)
            );
            if (fourCC === 'VP8 ') {
                // lossy: 3바이트 프레임태그 + 3바이트 싱크코드(0x9d012a) 이후 14bit width/height (LE)
                const width = view.getUint16(26, true) & 0x3fff;
                const height = view.getUint16(28, true) & 0x3fff;
                return { width, height };
            }
            if (fourCC === 'VP8L') {
                // lossless: signature(1) + 4바이트에 14bit(width-1) + 14bit(height-1) (LE)
                const bits = view.getUint32(21, true);
                return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
            }
            if (fourCC === 'VP8X') {
                // extended: flags(1) + reserved(3) + 24bit(width-1) + 24bit(height-1) (LE)
                const w = view.getUint8(24) | (view.getUint8(25) << 8) | (view.getUint8(26) << 16);
                const h = view.getUint8(27) | (view.getUint8(28) << 8) | (view.getUint8(29) << 16);
                return { width: w + 1, height: h + 1 };
            }
        }
    } catch {
        return null;
    }
    return null;
}
