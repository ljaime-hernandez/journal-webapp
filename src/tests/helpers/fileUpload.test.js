import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';


/* to run this test:
1. run the 'npm install' command from the journal-webapp folder 
2. run the 'npm install --save-dev enzyme' command (if you have not done so)
3. run the 'npm install --save-dev enzyme-to-json' command (if you have not done so)
4. run the 'npm install --save-dev @wojtekmaj/enzyme-adapter-react-17 --legacy-peer-deps' command (if you are using React 17 as i do)
5. run the 'npm install --save-dev @testing-library/react-hooks' command (if you have not done so)
6. run the 'npm install cloudinary --save-dev' command
7. make sure the setupTests.js file include the enzyme, enzyme-to-json AND the commented lines should be used
8. run the command 'npm run test'
9. to have a clearer view of this single js test file, press p. then type the file name 'cloudinary.test.js'
*/


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