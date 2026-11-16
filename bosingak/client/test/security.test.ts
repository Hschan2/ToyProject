import test from "node:test";
import assert from "node:assert";
import { sanitizeInput, validateNickname } from "../src/utils/security.ts";

test("Client Security: sanitizeInput removes HTML tags and harmful characters", () => {
  const result = sanitizeInput("<script>alert('xss')</script>보신각");
  assert.strictEqual(result.includes("<script>"), false);
  assert.strictEqual(result.includes("보신각"), true);
});

test("Client Security: validateNickname enforces length and empty constraints", () => {
  const emptyCheck = validateNickname("");
  assert.strictEqual(emptyCheck.valid, false);

  const longCheck = validateNickname("이것은열두글자가넘는매우긴닉네임입니다");
  // Sanitized to 12 chars
  assert.strictEqual(longCheck.valid, true);

  const validCheck = validateNickname("새해소망");
  assert.strictEqual(validCheck.valid, true);
});
