import '../styles/Collections.css'
import { Navbar } from './Home'
import {useEffect, useState} from "react";
import { getStorage, ref, listAll, getDownloadURL, StorageReference } from 'firebase/storage';


/*
How to map out the image folders:
Save the given folder name and image urls
within an object
e.g:
{
    folderName: "random",
    images: [url1, url2, url3]
}
then map out all objects
*/


/*
Figure out how to retrieve everything from the 
firebase storage
*/

export default function Collections(){

    const storage = getStorage();

    const listRef = ref(storage, "/");


    interface imageUrlFolders{
        folderNames: string[];
        imageUrls: string[];
    }

    const [imageUrlFolders, setImageUrlFolders] = useState<imageUrlFolders[]>([]);

    function addImageData(object: imageUrlFolders){
        setImageUrlFolders([...imageUrlFolders, object]);
    }

    // ! Folder names must be an array since it only gives us the first folder name

    const myObject: imageUrlFolders = {folderNames: [], imageUrls: []}

    useEffect(() => {
    const fetchData = async () => {
        const listAllItems = async (ref: StorageReference, parentFolderPath: string) => {
        const items: StorageReference[] = [];
        const prefixes: StorageReference[] = [];

        await listAll(ref).then((res) => {
            items.push(...res.items);
            prefixes.push(...res.prefixes);
        });

        for (const prefixRef of prefixes) {
            const folderName = prefixRef.fullPath.replace(parentFolderPath, '').replace(/^\//, '');
            await listAllItems(prefixRef, parentFolderPath + folderName + '/'); // Recursively fetch items inside the folder
        }

        for (const itemRef of items) {
            // Retrieve the folder name
            const folderName = parentFolderPath.replace(listRef.fullPath, '');
            myObject.folderNames.push(folderName);

            // Retrieve the image URL
            const imageUrl = await getDownloadURL(itemRef);
            myObject.imageUrls.push(imageUrl);

            console.log('Folder Name:', folderName);
            console.log('Image URL:', imageUrl);
            addImageData(myObject);
        }
        };

        listAllItems(listRef, '');
    };

    fetchData();
    }, []);


    return(
        <div className='collectionsWrap'>
            <Navbar />
            <h1>Here are your collections.</h1>
            {imageUrlFolders.map((object) => (
                <div>
                
                {object.folderNames.map((folderName) => (
                    <h2>{folderName}</h2>
                ))}
                
                {object.imageUrls.map((imageUrl) => (
                    <img key={imageUrl} src={imageUrl} alt='Collection' width='10%' height='50%' />
                ))}
                </div>
            ))}
        </div>
    )
}