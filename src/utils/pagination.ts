export const paginate = (
    currentPage?: number,
    size?: number,
    totalItems?: number
  ) => {
    return {
      current_page: currentPage ?? 1,
      per_page: size ?? 20,
      total_page: Math.ceil((totalItems ?? 1) / (size ?? 20)),
      total_items: totalItems ?? 0,
    };
  };