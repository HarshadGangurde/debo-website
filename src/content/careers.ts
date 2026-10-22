export type Opening = {
  slug: string; title: string; location: string; type: string;
  responsibilities: string[]; requirements: string[]; applyHref: string;
};
/** No roles have been supplied. Keep empty until the team provides current openings. */
export const OPENINGS: Opening[] = [];
