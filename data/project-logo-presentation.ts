// Optical compensation for whitespace inside the original artwork.
// These values change presentation only; source files and proportions stay intact.
export const projectLogoPresentation: Record<
  string,
  { maxWidth: number; height: number; scale?: number }
> = {
  PingTower: { maxWidth: 280, height: 160, scale: 1.9 },
  DatsPulse: { maxWidth: 240, height: 144, scale: 2.1 },
  "Porta Trading System": { maxWidth: 240, height: 120 },
  ATLAS: { maxWidth: 160, height: 120 },
  Trade360Lab: { maxWidth: 220, height: 124 },
  "Notification Subscription Platform": { maxWidth: 176, height: 144 },
  "Smart Activity Tracker": { maxWidth: 176, height: 144 },
  "Visual Circuit Designer": { maxWidth: 160, height: 120 },
  SaveOps: { maxWidth: 280, height: 144, scale: 1.5 },
  "Secure DevOps Pipeline": { maxWidth: 240, height: 144, scale: 1.5 },
  Link2Action: { maxWidth: 288, height: 144 },
};
