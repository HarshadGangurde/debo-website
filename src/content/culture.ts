export type CulturePhoto = {
  /** Path under /public, e.g. "/culture/culture-1.webp" */
  src: string;
  /** Describe what is in the photo for someone who can't see it. */
  alt: string;
  caption?: string;
  /** CSS object-position, to keep the subject in frame when a tall photo is cropped into a wide tile. */
  position?: string;
  /** True for stand-in images. The gallery tags them "Placeholder" so they can't pass as real photos. */
  placeholder?: boolean;
};

/**
 * Real photos of the team at work. The first photo is shown largest.
 * The gallery renders nothing when this list is empty. Entries marked `placeholder` are labelled on the page.
 */
export const CULTURE_PHOTOS: CulturePhoto[] = [
  { src: "/culture/culture-1.webp", alt: "The DeboisTech team standing together, smiling, outside the office door beneath the DeboisTech sign decorated with marigold flowers.", caption: "The team at our office entrance", position: "50% 40%" },
  { src: "/culture/culture-2.webp", alt: "Seven members of the team in kurtas and shirts, arms around each other's shoulders, smiling in front of a wall painted with the word Startup.", caption: "The team together", position: "50% 38%" },
  { src: "/culture/culture-3.webp", alt: "A presenter standing by a screen while people seated around a long table with laptops follow a training session.", caption: "A training session at the office", position: "50% 48%" },
  { src: "/culture/culture-4.webp", alt: "The DeboisTech IT Solutions LLP sign on the office wall, tied with a red ribbon and topped with a marigold flower.", caption: "Our office sign", position: "55% 38%" },
  { src: "/culture/culture-5.webp", alt: "Three members of the team standing close together in front of a painted wall, smiling at the camera.", position: "50% 34%" },
];
