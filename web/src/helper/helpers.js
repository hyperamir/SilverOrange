export const sortByDate = (arr) => {
  const sortedArr = arr.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return sortedArr;
}


