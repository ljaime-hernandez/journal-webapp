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

// the cloudinary configuration should be included only in the test file, for security purposes,
// the configuration info can be placed in the .env.test file, which will be called only when
// the program runs the testing environment instead of the development one

cloudinary.config({ 
    cloud_name: process.env.REACT_APP_CLOUD_NAME, 
    api_key: process.env.REACT_APP_CLOUD_APIKEY, 
    api_secret: process.env.REACT_APP_CLOUD_SECRET,
    secure: process.env.REACT_APP_CLOUD_SECURE
});

describe('Tests on fileUpload helper', () => {

    test('should load a file and return its URL', async() => {
      
        const resp = await fetch('https://blog.wildix.com/wp-content/uploads/2020/06/react-logo-1024x567.jpg');
        // Blobs can represent data that isn't necessarily in a JavaScript-native format. 
        // The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system.
        const blob = await resp.blob();

        // A File object is a specific kind of a Blob, and can be used in any context that a Blob can. the second
        // argument will be the file name, and the third would be the file type if necessary
        const file = new File([blob], 'picture.png');
        const url = await fileUpload(file);
        
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        // the method below will delete any picture insertion done for testing purposes, so our cloudinary
        // DB does not leave any extra insertion on it
        cloudinary.v2.api.delete_resources(imageId, {}, () => {});
    });

    test('should return error', async() => {
      
        const file = new File([], 'picture.png');
        const url = await fileUpload(file);
        // the url should be null as the blob was not inserted in the file
        expect(url).toBe(null);
    });
});