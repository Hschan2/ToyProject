/**
 * Client-Side Security & Input Sanitization
 */

export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";

  // 1. Remove script tags and their inner content
  let cleaned = input.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

  // 2. Remove all other HTML/XML tags
  cleaned = cleaned.replace(/<[^>]*>/g, "");

  // 3. Remove dangerous punctuation and control characters
  cleaned = cleaned.replace(/[<>&"'`/\\]/g, "").trim();

  // 4. Truncate to maximum 12 characters
  return cleaned.slice(0, 12);
}

export function validateNickname(name: string): { valid: boolean; message?: string } {
  const sanitized = sanitizeInput(name);
  if (!sanitized || sanitized.length === 0) {
    return { valid: false, message: "닉네임을 1자 이상 입력해주세요." };
  }
  if (sanitized.length > 12) {
    return { valid: false, message: "닉네임은 최대 12자까지 가능합니다." };
  }
  return { valid: true };
}
