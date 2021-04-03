const rows = document.querySelectorAll('tbody > tr');

rows.forEach(row => {
    const actions = row.querySelector('.actions')
    const editButton = actions.querySelector('.edit');
    const deleteButton = actions.querySelector('.delete');
    const row_id = row.querySelector('th[data-id]');

    editButton.addEventListener('click', async () => {
        const formEl = document.querySelector('#form');
        const confirm = formEl.querySelector('[confirm]');

        const row_login = row.querySelector('th[data-login]');
        const row_role = row.querySelector('th[data-role]');

        const input_login = formEl.querySelector('input[name="login"]');
        const select = formEl.querySelector('select');

        const request_get = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        };

        await fetch('/dashboard/role', request_get)
            .then(async (result) => {
                const json = await result.json();

                if (json.roles.length > 0) {
                    json.roles.forEach(role => {
                        const option = document.createElement('option');
                        if (row_role.innerHTML === role.role) option.selected = true
                        option.value = role.id;
                        option.innerHTML = role.role;
                        select.append(option);
                    });
                }
                input_login.value = row_login.innerHTML;
            }).catch((error) => {
                UIkit.notification({
                    message: error, 
                    status: 'warning', 
                    pos: 'top-right'
                });
            });

        confirm.addEventListener('click', () => {
            const id_user = row_id.innerHTML;
            const login = input_login.value;
            const id_role = select.querySelector('[selected]').value;

            const request_put = {
                body: JSON.stringify({
                    id: id_user,
                    login,
                    id_role
                }),
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                }
            };

            fetch('/dashboard/user/:id', request_put)
                .then(async (result) => {
                    const json = await result.json();

                    if (json.updated) {
                        UIkit.notification({
                            message: `<span uk-icon="icon: check"></span> Le tag à été modifier avec succes`, 
                            status: 'success', 
                            pos: 'top-right'
                        });
                        tag.innerHTML = input.value;
                    } else {
                        UIkit.notification({
                            message: `<span uk-icon="icon: close"></span>${json.result.message}`, 
                            status: 'error', 
                            pos: 'top-right'
                        });
                    }

                }).catch((error) => {
                    UIkit.notification({
                        message: `<span uk-icon="icon: close"></span>${error}`, 
                        status: 'error', 
                        pos: 'top-right'
                    });
                });
        });
    });

    deleteButton.addEventListener('click', () => {
        const request = {
            body: JSON.stringify({ 
                id: row_id.innerHTML
            }), 
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/dashboard/user/:id', request)
            .then(async (result) => {
                const json = await result.json();

                if (json.deleted) {
                    row.remove();
                    UIkit.notification({
                        message: '<span uk-icon="icon: check"></span> Utilisateur supprimer avec succes', 
                        status: 'success', 
                        pos: 'top-right'});

                } else {
                    const error = json.result.error.message;
                    console.error(error);
                    UIkit.notification({
                        message: error, 
                        status: 'warning', 
                        pos: 'top-right'
                    });
                }
            }).catch((error) => {
                UIkit.notification({
                    message: error, 
                    status: 'warning', 
                    pos: 'top-right'
                });
            });
    });
});