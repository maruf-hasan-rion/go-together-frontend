/**
 * Unsigned JWT decoding for client-side use only.
 *
 * The frontend never needs to verify signatures — the backend does that.
 * It only reads the role claim for navigation guards and checks expiry
 * locally to decide when to refresh. The signing secrets therefore stay
 * out of the frontend environment entirely.
 */
export type DecodedJwt = {
  payload: Record<string, unknown>;
  expired: boolean;
};

const base64UrlDecode = (input: string): string => {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
};

export const decodeJwt = (token: string): DecodedJwt | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(base64UrlDecode(parts[1])) as Record<string, unknown>;

    const exp = typeof payload.exp === "number" ? payload.exp * 1000 : null;
    return {
      payload,
      expired: exp !== null && exp < Date.now(),
    };
  } catch {
    return null;
  }
};
