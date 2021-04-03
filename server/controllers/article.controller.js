import { deleteArticleByID } from "./article/delete/deleteArticleByID";
import { getArticleByID } from "./article/get/getArticleByID";
import { getArticlesByPage } from "./article/get/getArticlesByPage";
import { getArticlesByPageAndTag } from "./article/get/getArticlesByPageAndTag";
import { getArticlesCount } from "./article/get/getArticlesCount";
import { getDashboardArticlesByPage } from "./article/get/getDashboardArticlesByPage";
import { postNewArticle } from "./article/post/postNewArticle";
import { putArticlebyID } from "./article/put/putArticleByID";

export const articleController = {
    delete: {
        by: {
            id: deleteArticleByID
        }
    },
    get: {
        by: {
            id: getArticleByID
        },
        list: {
            by: {
                page: getArticlesByPage,
                pageAndTag: getArticlesByPageAndTag
            },
            for: {
                dashboard: {
                    by: {
                        page: getDashboardArticlesByPage
                    }
                } 
            }
        },
        count: getArticlesCount
    },
    post: postNewArticle,
    put: {
        by: {
            id: putArticlebyID
        }
    }
};