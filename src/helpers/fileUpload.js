

export const fileUpload = async(file) => {

    // argument after cloudinary version is my own cloud name, tested the API
    // with postman with the appended arguments to check for the secure url return
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dkns40h4i/upload';
    
    // the upload preset will save the assigned files to an specific "collection"
    // in the cloudinary DB, the file portion will contain the file
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal-webapp');
    formData.append('file', file);

    // when the request is posted on the DB, this asynchronous function will wait
    // until it returns a url, which will then be used on the notes for the
    // proper picture display, if the file is not saved properly it will throw an
    // error in the console specifying what was wrong on the request
    try{
        const res = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(res.ok) {
            const cloudRes = await res.json();
            return cloudRes.secure_url;
        } else {
            return null;
        }
    } catch(error) {
        throw error;
    }
}