/// <reference types="@cloudflare/workers-types" />

/**
 * 임시 URL(챗지피티가 생성한 이미지 등, 곧 만료됨)을 fetch해서 R2에 영구
 * 저장하고 공개 URL을 돌려준다. 대표 이미지(publish.ts)와 본문 삽입 이미지
 * (upload-image.ts)가 공유하는 로직.
 */
export async function uploadImageFromUrl(
    bucket: R2Bucket,
    publicBaseUrl: string,
    sourceUrl: string,
    keyPrefix: string
): Promise<string> {
    const imageRes = await fetch(sourceUrl);
    if (!imageRes.ok) throw new Error(`이미지 다운로드 실패: ${imageRes.status}`);

    const contentType = imageRes.headers.get('content-type') || 'image/png';
    const ext = contentType.includes('jpeg') ? 'jpg' : contentType.includes('webp') ? 'webp' : 'png';
    const uniqueId = `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}`;
    const key = `${keyPrefix}/${uniqueId}.${ext}`;

    await bucket.put(key, imageRes.body, { httpMetadata: { contentType } });

    return `${publicBaseUrl}/${key}`;
}
