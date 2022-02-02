

export const fileUpload = async(file) => {

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
            throw await res.json();
        }
    } catch(error) {
        throw error;
    }
}