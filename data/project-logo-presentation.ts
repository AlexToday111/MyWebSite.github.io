// Optical compensation only for artwork with generous transparent margins.
// The hover transform is on a separate wrapper and preserves these proportions.
export const projectLogoPresentation: Record<
  string,
  { maxWidth: number; height: number; scale?: number }
> = {
  "Distributed Job Processing Platform": { maxWidth: 320, height: 180 },
  "High-performance API Gateway": { maxWidth: 340, height: 180 },
  FlagForge: { maxWidth: 320, height: 180 },
  PingTower: { maxWidth: 340, height: 180, scale: 1.9 },
  DatsPulse: { maxWidth: 340, height: 180, scale: 2.1 },
  "Porta Trading System": { maxWidth: 280, height: 160 },
  "Anti-Fraud Detector": { maxWidth: 220, height: 180 },
  Trade360Lab: { maxWidth: 280, height: 164 },
  "Notification Subscription Platform": { maxWidth: 220, height: 180 },
  "Smart Activity Tracker": { maxWidth: 220, height: 180 },
  "Visual Circuit Designer": { maxWidth: 200, height: 152 },
  SaveOps: { maxWidth: 340, height: 180, scale: 1.5 },
  "Secure DevOps Pipeline": { maxWidth: 340, height: 180, scale: 1.5 },
  Link2Action: { maxWidth: 340, height: 180 },
  "Backend Agent Skills": { maxWidth: 240, height: 176 },
  PortIQ: { maxWidth: 280, height: 180 },
  Liftory: { maxWidth: 280, height: 180 },
};
