

export const fileUpload = async(file) => {

    // argument after claudinary version is my own cloud name, tested the API
    // with postman with the appended arguments to check for the secure url return
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dkns40h4i/upload';
    
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal-webapp');
    formData.append('file', file);

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