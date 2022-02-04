import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'dkns40h4i', 
    api_key: '635578586767627', 
    api_secret: '13JD48EdCpffXApZl2HvOOyNrLY',
    secure: true
  });

describe('Tests on fileUpload helper', () => {

    test('should load a file and return its URL', async() => {
      
        const resp = await fetch('https://blog.wildix.com/wp-content/uploads/2020/06/react-logo-1024x567.jpg');
        const blob = await resp.blob();


        const file = new File([blob], 'picture.png');
        const url = await fileUpload(file);
        
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        cloudinary.v2.api.delete_resources(imageId, {}, () => {});
    });

    test('should return error', async() => {
      
        const file = new File([], 'picture.png');
        const url = await fileUpload(file);
        
        expect(url).toBe(null);
    });
});