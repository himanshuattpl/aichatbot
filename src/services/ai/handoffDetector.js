/**
 * Backend handoff detector — runs on every message BEFORE sending to Gemini.
 * More reliable than frontend regex since it runs server-side on every request.
 */

const HUMAN_REQUEST_PATTERNS = [
  /\b(human|agent|person|staff|representative)\b/i,
  /\b(talk|speak|chat|connect|switch|transfer)\b.{0,20}\b(human|agent|person|someone|support)\b/i,
  /\b(want|need|can i|could i)\b.{0,30}\b(human|agent|person|live|real|support)\b/i,
  /real person/i,
  /live (agent|support|chat)/i,
  /talk with human/i,
  /speak to (an? )?(human|agent|person)/i,
  /connect me (to|with)/i,
  /not helpful/i,
  /talk to (your )?team/i,
  /human assist/i,
];

export const isHumanRequest = (message) => {
  if (!message) return false;
  return HUMAN_REQUEST_PATTERNS.some((p) => p.test(message));
};