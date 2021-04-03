import { getCommentsByArticleID } from "./comment/get/getCommentsByArticleID";
import { getCommentsCount } from "./comment/get/getCommentsCount";

export const commentController = {
    get: {
        comments: {
            by: {
                article: {
                    id: getCommentsByArticleID
                }
            }
        },
        count: getCommentsCount
    }
};