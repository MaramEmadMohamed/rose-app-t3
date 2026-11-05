import { FOCUS_RING_CLASS_NAME } from "@/lib/styles/focus-ring";

// The light button on top of photos ("Shop Now", "I'm buying!"). Same
// colors in both themes, like the design.
export const PHOTO_BUTTON_CLASS_NAME = `flex w-fit min-w-32.5 items-center justify-center gap-1.5 rounded-xl bg-maroon-50 px-4 py-2.5 leading-none text-maroon-700 transition-opacity hover:opacity-90 ${FOCUS_RING_CLASS_NAME}`;
