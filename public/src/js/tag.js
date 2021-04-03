const rows = document.querySelectorAll('tbody > tr');

rows.forEach(row => {
    const actions = row.querySelector('.actions')
    const editButton = actions.querySelector('.edit');
    const deleteButton = actions.querySelector('.delete');
    const row_id = row.querySelector('th[data-id]');

    editButton.addEventListener('click', () => {
        const tag = row.querySelector('th[data-tag]');

        const form = document.querySelector('#form');
        const title = form.querySelector('[title]');
        const confirm = form.querySelector('[confirm]');
        const input = form.querySelector('input');

        title.innerText = "Modifier le tag";
        confirm.innerText = "Modifier le tag";
        input.value = tag.innerHTML;

        confirm.addEventListener('click', () => {
            console.log(`Modification du tag ayant pour id ${row_id.innerHTML}...`);

            const request = {
                body: JSON.stringify({
                    id: row_id.innerHTML, 
                    tag: input.value
                }),
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }
            };

            fetch('/dashboard/tag/:id', request)
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

        fetch(`/dashboard/tag/:id`, request)
            .then(async (result) => {
                const json = await result.json();

                if (json.deleted) {
                    row.remove();
                    UIkit.notification({
                        message: '<span uk-icon="icon: check"></span> Tag supprimer avec succes', 
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


const addButton = document.querySelector('a[addTag]');

addButton.addEventListener('click', () => {
    const form = document.querySelector('#form');
    const title = form.querySelector('[title]');
    const confirm = form.querySelector('[confirm]');
    const input = form.querySelector('input');

    title.innerHTML = "Ajouter un tag";
    confirm.innerHTML = "Créer le tag";
    input.value = "";

    confirm.addEventListener('click', () => {
        const request = {
            body: JSON.stringify({
                tag: input.value
            }), 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };
    
        fetch('/dashboard/tag/', request)
            .then(async (result) => {
                const json = await result.json();
                if (json.created) {
                    UIkit.notification({
                        message: '<span uk-icon="icon: check"></span> Tag ajouter avec succes', 
                        status: 'success', 
                        pos: 'top-right'
                    });
                    setTimeout(() => {
                        location.reload(true);
                    }, 1500);
                } else {
                    UIkit.notification({
                        message: `<span uk-icon="icon: close"></span> ${json.result.message}`, 
                        status: 'error', 
                        pos: 'top-right'
                    });
                }
    
            }).catch((err) => {
                UIkit.notification({
                    message: `<span uk-icon="icon: close"></span>${err.message}`, 
                    status: 'error', 
                    pos: 'top-right'
                });
            });
    });
});