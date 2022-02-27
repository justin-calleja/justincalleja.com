export function blogPostsFilter({
  draft,
  archive,
}: {
  draft?: boolean;
  archive?: boolean;
}) {
  if (process.env.NODE_ENV === 'production' && draft) return false;
  if (archive) return false;

  return true;
}

export default blogPostsFilter;
