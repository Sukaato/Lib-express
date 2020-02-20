const prefix = "u";

export const users = {
    table:    `\`users\` ${prefix}`,
    id:       `${prefix}.id`,
    login:    `${prefix}.login`,
    password: `${prefix}.password`,
    id_role:  `${prefix}.id_roles`
}