import { deleteUserByID } from "./user/delete/deleteUserByID";
import { getUserCount } from "./user/get/getUserCount";
import { getUsersByLogin } from "./user/get/getUsersByLogin";
import { getUserListByPage } from "./user/get/getUsersByPage";
import { putUserByID } from "./user/put/putUserByID";

export const userController = {
    delete: {
        by: {
            id: deleteUserByID
        }
    },
    get: {
        count: getUserCount,
        by: {
            login: getUsersByLogin
        },
        list: {
            by: {
                page: getUserListByPage,
            }
        }
    },
    put: {
        by: {
            id: putUserByID
        }
    },
};