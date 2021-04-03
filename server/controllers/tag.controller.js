import { deleteTagByID } from "./tag/delete/deleteTagByID";
import { getTagByID } from "./tag/get/getTagByID";
import { getTagByName } from "./tag/get/getTagByName";
import { getTags } from "./tag/get/getTags";
import { getTagsCount } from "./tag/get/getTagsCount";
import { patchTagByID } from "./tag/patch/patchTagByID";
import { postNewTag } from "./tag/post/postNewTag";

export const tagController = {
    delete: {
        by: {
            id: deleteTagByID
        }
    },
    get: {
        by: {
            id: getTagByID,
            name: getTagByName
        },
        tags: getTags,
        count: getTagsCount
    },
    patch: {
        by: {
            id: patchTagByID
        }
    },
    post: postNewTag
};