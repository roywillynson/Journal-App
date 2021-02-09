const CLOUDINARY_API_URL = 'https://api.cloudinary.com/v1_1/dlnyb1her'


export const fileUpload = async ( file ) => {
   
    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);


    try {
        const response = await fetch(`${CLOUDINARY_API_URL}/upload`, {
            method: 'POST',
            body: formData,
            headers: { 
                "X-Requested-With": "XMLHttpRequest" 
            }
        });

        if(response.ok){
            const image = await response.json();
            return image.secure_url;
        }

        return null;

    } catch (error) {
        console.log(error)
    }
}