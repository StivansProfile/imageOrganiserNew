import '../styles/Collections.css'
import { Navbar } from './Home'
import {useEffect, useState} from "react";
import { getStorage, ref, listAll, getDownloadURL, StorageReference } from 'firebase/storage';

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

            console.log(`Folder names: ${myObject.folderNames}`);
            myObject.folderNames = [...new Set(myObject.folderNames)];

            addImageData(myObject);
        }
        };

        listAllItems(listRef, '');
    };

    fetchData();
    }, []);


    // TODO Style the image/folder containers

    return(
        <div className='collectionsWrap'>
            <Navbar />
            <h1>Here are your collections.</h1>
            {imageUrlFolders.map((object) => (
                <div className='containers'>
                    <div className='innerContainer'>
                        {object.folderNames.map((folderName) => (
                            <h2>{folderName}</h2>
                        ))}
                            
                        {object.imageUrls.map((imageUrl) => (
                            <img key={imageUrl} src={imageUrl} alt='Collection' width='10%' height='50%' />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}