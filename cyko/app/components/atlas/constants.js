export const SECTIONS = [
  {
    key: "movies",
    title: "Featured Movies",
    description:
      "Latest documents from the sample_mflix.movies collection, including rating snippets.",
  },
  {
    key: "theaters",
    title: "Popular Theaters",
    description:
      "Handful of theater locations pulled straight from sample_mflix.theaters.",
  },
  {
    key: "comments",
    title: "Recent Comments",
    description:
      "Recent comments left by viewers in the sample dataset for extra scrolling content.",
  },
];

export const SKELETON_COUNT = 6;

export function createInitialSectionsState() {
  return SECTIONS.reduce((accumulator, section) => {
    accumulator[section.key] = { items: [], loading: true, error: null };
    return accumulator;
  }, {});
}
