import { articleRouter } from './article.router';
import { dashboardArticleRouter } from './dashboard/dashboard.article.router.js';
import { dashboardIndexRouter } from './dashboard/dashboard.index.router.js';
import { dashboardRoleRouter } from './dashboard/dashboard.role.router';
import { dashboardTagRouter } from './dashboard/dashboard.tag.router';
import { dashboardUserRouter } from './dashboard/dashboard.user.router';
import { error404Router } from './errors/error.404.router';
import { error500Router } from './errors/error.500.router';
import { indexRouter } from './index.router';
import { loginRouter } from './login.router';
import { tagRouter } from './tag.router';

export const router = {
    index: indexRouter,
    article: articleRouter,
    tag: tagRouter,
    login: loginRouter,
    dashboard: {
        index: dashboardIndexRouter,
        article: dashboardArticleRouter,
        tag: dashboardTagRouter,
        user: dashboardUserRouter,
        role: dashboardRoleRouter
    },
    error: {
        404: error404Router,
        500: error500Router
    }
};