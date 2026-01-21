// Firestore converters and types
export {
  timestampToDate,
  dateToTimestamp,
  denormalizeUser,
  docToUser,
  userToDoc,
  docToPost,
  postToDoc,
  docToComment,
  commentToDoc,
  type DenormalizedUser,
  type UserDoc,
  type PostDoc,
  type CommentDoc,
  type FollowDoc,
  type LikeDoc,
} from "./firestore-converters";

// User service
export {
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  updateFinancialProfile,
  updateUserStats,
  isUsernameAvailable,
} from "./user-service";

// Post service
export {
  createPost,
  getPostById,
  getPosts,
  getUserPosts,
  subscribeToPosts,
  subscribeToPost,
  subscribeToUserPosts,
  updatePost,
  deletePost,
  updatePostCounts,
} from "./post-service";

// Comment service
export {
  addComment,
  getComments,
  subscribeToComments,
  getCommentById,
  deleteComment,
  updateCommentLikesCount,
} from "./comment-service";

// Like service
export {
  isPostLiked,
  isCommentLiked,
  togglePostLike,
  toggleCommentLike,
  likePost,
  unlikePost,
  getPostLikeStatuses,
} from "./like-service";

// Follow service
export {
  isFollowing,
  followUser,
  unfollowUser,
  toggleFollow,
  getFollowing,
  getFollowers,
  getFollowerCount,
  getFollowingCount,
} from "./follow-service";
