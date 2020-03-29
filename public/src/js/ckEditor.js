let editor;

ClassicEditor
    .create( document.querySelector( '#editor' ) )
        .then(ckeditor => {
            editor = ckeditor;
        })
        .catch( error => {
            console.error( error );
        } );