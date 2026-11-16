/**
 * Security & Input Sanitization Utilities
 * Prevents XSS, memory corruption, and out-of-bounds positioning.
 */

/**
 * Sanitizes and validates a player's nickname.
 * - Strips all script tags along with their inner code
 * - Strips all other HTML/XML tags completely
 * - Removes unsafe characters to prevent XSS
 * - Enforces length between 1 and 12 characters
 * - Fallbacks to a safe default if invalid or empty
 */
export function sanitizeNickname(input: unknown, defaultPrefix: string = "관람객"): string {
  if (typeof input !== "string") {
    return `${defaultPrefix}_${Math.floor(1000 + Math.random() * 9000)}`;
  }

  // 1. Remove script tags and their inner content completely
  let cleaned = input.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  // 2. Remove any other HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, "");

  // 3. Remove dangerous punctuation and symbols
  cleaned = cleaned
    .replace(/[<>&"'`/\\]/g, "")
    // Keep Korean, alphanumeric, spaces, underscores, and hyphens only
    .replace(/[^\w\s\uAC00-\uD7A3\u3131-\u318E-]/g, "")
    .trim();

  // 4. Truncate to maximum 12 characters
  cleaned = cleaned.slice(0, 12);

  if (cleaned.length === 0) {
    return `${defaultPrefix}_${Math.floor(1000 + Math.random() * 9000)}`;
  }

  return cleaned;
}

/**
 * Sanitizes and clamps numerical 3D coordinates.
 * Prevents NaN, Infinity, and out-of-world teleportation exploits.
 */
export function clampCoordinate(
  value: unknown,
  min: number,
  max: number,
  fallback: number = 0
): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }
  return Math.max(min, Math.min(max, value));
}
