const getDate = () => {
    const date = new Date();
    const day = validFormat(date.getDate());
    const month = validFormat(date.getMonth() + 1);
    const years = date.getFullYear();

    return `${years}-${month}-${day}`;
}

const validFormat = (number) => {
    return number < 10 ? `0${number}` : number;
}

const rows = document.querySelectorAll('tbody > tr');

rows.forEach(row => {
    const row_id = row.querySelector('th[data-id]');
    if (row_id.innerHTML !== "0") {
        const row_title = row.querySelector('th[data-title]');
        const actions = row.querySelector('.actions');
        const editButton = actions.querySelector('.edit');
        const deleteButton = actions.querySelector('.delete');

        editButton.addEventListener('click', async () => {
            const formEl = document.querySelector('#form');
            const ul = formEl.querySelector('[data-tags]');
            const inputs = ul.querySelectorAll('input[type="checkbox"]')
            inputs.forEach(input => {
                if (input.checked) input.checked = false;
            });
    
            const articleEl = formEl.querySelector('[data-article]');
            const modal_title = articleEl.querySelector('[title]');
            modal_title.innerHTML = "Modifier un article";
    
            const confirmButton = formEl.querySelector('[confirm]');
            confirmButton.innerHTML = "Modifier l'article";
    
            const request_get = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const input = articleEl.querySelector('[name="title"]');
    
            await fetch(`/dashboard/article/${row_id.innerHTML}`, request_get)
                .then(async (result) => {
                    const json = await result.json();
                    if (json.article) {
                        input.value = json.article.title;
    
                        if(editor) {
                            editor.setData(json.article.content);
                        }
    
                        json.article.tags.forEach(tag => {
                            const input = ul.querySelector(`input[name="${tag}"]`);
                            if (input) {
                                input.checked = true;
                            }
                        });
                    }
                }).catch((error) => {
                    console.log(error);
                    UIkit.notification({
                        message: error, 
                        status: 'warning', 
                        pos: 'top-right'
                    });
                });
    
            confirmButton.addEventListener('click', async () => {
                const ids_tag = [];
                inputs.forEach(input => {
                    if (input.checked) {
                        ids_tag.push(input.id)
                    }
                });
        
                const request_put = {
                    body: JSON.stringify({
                        id: row_id.innerHTML,
                        title: input.value,
                        content: editor.getData(),
                        tags: ids_tag,
                        updatedAt: getDate()
                    }),
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    }
                };
    
                await fetch(`/dashboard/article/${row_id.innerHTML}`, request_put)
                    .then(async (result) => {
                        const json = await result.json();
                        if (json.updated) {
                            const tagCount = row.querySelector('[data-tagCount]');
                            row_title.innerHTML = input.value;
                            tagCount.innerHTML = ids_tag.length;
                            UIkit.notification({
                                message: '<span uk-icon="icon: check"></span> Article ajouter avec succes', 
                                status: 'success', 
                                pos: 'top-right'
                            });
                            UIkit.notification({
                                message: '<span uk-icon="icon: check"></span> Les tags ont bien été ajouter à l\'aticle', 
                                status: 'success', 
                                pos: 'top-right'
                            });
                        }
                        console.log(json);
                    });
                confirm.removeEventListener('click');
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

            fetch(`/dashboard/article/:id`, request)
                .then(async (result) => {
                    const json = await result.json();
                    if (json.deleted) {
                        row.remove();
                        UIkit.notification({
                            message: '<span uk-icon="icon: check"></span> Article supprimer avec succes', 
                            status: 'success', 
                            pos: 'top-right'
                        });
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
    }
});

const addButton = document.querySelector('a[addArticle]');

addButton.addEventListener('click', () => {
    const form = document.querySelector('#form');

    /* Clear checkedInput */
    const inputs = form.querySelectorAll('[data-tags] input[type="checkbox"]');
    inputs.forEach(input => {
        if (input.checked) input.checked = false;
    });

    const title = form.querySelector('[title]');
    title.innerHTML = "Créer un article";

    const input = form.querySelector('input[name="title"]');
    input.value = "";

    if (editor) editor.setData('');

    const confirm = form.querySelector('button[confirm]');
    confirm.innerHTML = "Posté l'article";
    confirm.addEventListener('click', () => {
        const tags = [];
        inputs.forEach(input => {
            if (input.checked) {
                tags.push(input.id);
            }
        });

        const date = getDate();

        const request = {
            body: JSON.stringify({
                title: input.value,
                content: editor.getData(),
                createdAt: date,
                updatedAt: date,
                tags
            }), 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('/dashboard/article/', request)
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
                // confirm.removeEventListener('click');
            }).catch((error) => {
                UIkit.notification({
                    message: `<span uk-icon="icon: close"></span>${error}`, 
                    status: 'error', 
                    pos: 'top-right'
                });
            });
    });
});