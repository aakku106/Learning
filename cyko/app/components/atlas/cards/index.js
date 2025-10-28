import MovieCard from "./MovieCard";
import TheaterCard from "./TheaterCard";
import CommentCard from "./CommentCard";

const CARD_MAP = {
  movies: MovieCard,
  theaters: TheaterCard,
  comments: CommentCard,
};

export function getCardComponent(sectionKey) {
  return CARD_MAP[sectionKey] ?? null;
}

export { MovieCard, TheaterCard, CommentCard };
