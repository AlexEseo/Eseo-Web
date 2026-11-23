// Decor gradient scenes copied from Figma: every layer's place, size, blur, opacity and order.
// Numbers are Figma pixels inside the scene frame; colours are tokens in tokens.css (--gradient-*).
// Layers are listed bottom to top, as in Figma.
// Layer: { token, x, y, w, h, blur, opacity?, rotate?, blend?, to? }  (blend "plus-lighter" = Figma "Linear dodge")
// to: { x, y, w, h, rotate? } — where the layer drifts to (Figma State=B); the scene then floats A ↔ B forever.

export const heroScene = {
  frame: [1280, 1280], // Figma "Hero→Principles gradient"
  layers: [
    { token: '--gradient-hero-base', x: 0, y: 0, w: 1280, h: 1280, blur: 0, shape: 'rect' },
    { token: '--gradient-hero-blob-1', x: -160, y: 300, w: 620, h: 520, blur: 90 },
    { token: '--gradient-hero-blob-2', x: 820, y: 220, w: 700, h: 560, blur: 90 },
    { token: '--gradient-hero-blob-3', x: 380, y: 620, w: 560, h: 460, blur: 90 },
    { token: '--gradient-hero-highlight-1', x: 320, y: 360, w: 640, h: 420, blur: 90 },
    { token: '--gradient-hero-highlight-2', x: 760, y: 560, w: 420, h: 320, blur: 90 },
    { token: '--gradient-hero-sweep', x: 190, y: -106, w: 900, h: 900, blur: 140, opacity: 0.5 },
  ],
}

export const industriesScene = {
  frame: [1032, 1032], // Figma "Circle right · gradient" (component "Floating gradient / right"): a clipped circle with its own blur
  fill: '--color-industries-circle',
  radius: 487,
  blur: 48,
  // Figma prototype: State=A ↔ State=B, Smart animate, ease in-out, 3.5s each way
  drift: '--duration-gradient-drift',
  layers: [
    { token: '--gradient-ind-blob-1', x: 187, y: 97, w: 487, h: 487, blur: 60, to: { x: 313, y: -77, w: 575, h: 575 } },
    { token: '--gradient-ind-blob-2', x: 365, y: 573, w: 438, h: 438, blur: 60, to: { x: 218, y: 746, w: 372, h: 372 } },
    { token: '--gradient-ind-blob-3', x: -42, y: 536, w: 341, h: 341, blur: 56, to: { x: 74, y: 662, w: 409, h: 409 } },
    { token: '--gradient-ind-blob-4', x: 342, y: -136, w: 487, h: 487, blur: 60, to: { x: 211, y: -256, w: 429, h: 429 } },
    { token: '--gradient-ind-sweep', x: 0, y: 0, w: 974, h: 974, blur: 80, opacity: 0.5, to: { x: -178, y: 665, w: 974, h: 974, rotate: 60 } },
    { token: '--gradient-ind-blob-5', x: 560, y: 540, w: 420, h: 420, blur: 56, to: { x: 470, y: 600, w: 483, h: 483 } },
    // "Highlights" group is Linear dodge in Figma: orange over orange turns into the yellow glow.
    { token: '--gradient-ind-highlight', x: 48, y: 167, w: 600, h: 600, blur: 64, blend: 'plus-lighter', to: { x: 182, y: 231, w: 732, h: 732 } },
    { token: '--gradient-ind-highlight', x: 779, y: 635, w: 204, h: 253, blur: 64, rotate: 44, blend: 'plus-lighter', to: { x: 546, y: 494, w: 167, h: 207, rotate: 44 } },
  ],
}

export const engagementsScene = {
  frame: [1280, 1494], // Figma "Engagements gradient"; the blobs group sits 240 below its top
  layers: [
    { token: '--gradient-eng-base', x: 0, y: 0, w: 1280, h: 1494, blur: 0, shape: 'rect' },
    { token: '--gradient-eng-blob-1', x: 484, y: 160, w: 620, h: 526, blur: 120 },
    { token: '--gradient-eng-blob-2', x: -196, y: 513, w: 700, h: 569, blur: 140 },
    { token: '--gradient-eng-blob-3', x: 256, y: 720, w: 640, h: 460, blur: 100 },
    { token: '--gradient-eng-blob-4', x: 916, y: 771, w: 420, h: 460, blur: 72 },
    { token: '--gradient-eng-blob-5', x: 90, y: 175, w: 460, h: 372, blur: 90 },
    { token: '--gradient-eng-blob-6', x: 20, y: 760, w: 440, h: 396, blur: 64 },
    { token: '--gradient-hero-sweep', x: 190, y: 204, w: 900, h: 986, blur: 160, opacity: 0.6 },
    { token: '--gradient-eng-highlight', x: -60, y: 320, w: 560, h: 560, blur: 64, blend: 'plus-lighter' },
    { token: '--gradient-eng-highlight', x: 960, y: 280, w: 240, h: 298, blur: 64, rotate: 44, blend: 'plus-lighter' },
  ],
}
