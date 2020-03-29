import { linkTagsArticle } from "./tagsArticle/post/linkTagsArticle";
import { renewLinkTagsArticle } from "./tagsArticle/put/renewLinkTagsArticle";

export const tagsArticlesController = {
    link: linkTagsArticle,
    renewLink: renewLinkTagsArticle
};