import apiClient from "../utils/apiClient";
import globalService from "./globalService";

// createOneLike
export const createOneLike = async (postId: any) => {
  const res = await apiClient.post(
    `${globalService.routes.posts}/${postId}/likes`
  );
  return res.data;
};
// getAllLikeOfUser
export const getAllLikeOfUser = async (
  limit: any,
  page: any,
  sort: any,
  search: any,
  category: any,
  tags: any
) => {
  let queryParams = `limit=${limit}&page=${page}&sort=${sort}`;
  if (search) {
    queryParams += `&search=${search}`;
  }
  if (category) {
    queryParams += `&category=${category}`;
  }

  if (tags) {
    queryParams += `&tags=${tags}`;
  }
  const res = await apiClient.get(
    `${globalService.routes.likes}/userLikes?${queryParams}`
  );
  return res.data;
};
// deleteOneLike
export const deleteOneLike = async (id: any) => {
  const res = await apiClient.delete(`${globalService.routes.likes}/${id}`);
  return res.data;
};
