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

    interface mapObject{
        dataa: string[];
    }

    const [imageUrlFolders, setImageUrlFolders] = useState<imageUrlFolders[]>([]);
    const [data, setData] = useState<mapObject[]>([]);

    function addImageData(object: imageUrlFolders){
        setImageUrlFolders([...imageUrlFolders, object]);
    }

    function addData(object: mapObject){
        setData([...data, object]);
    }

    const myObject: imageUrlFolders = {folderNames: [], imageUrls: []}
    const myDataObject: mapObject = {dataa: []}

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
            myDataObject.dataa.push(folderName)

            // Retrieve the image URL
            const imageUrl = await getDownloadURL(itemRef);
            myObject.imageUrls.push(imageUrl);
            myDataObject.dataa.push(imageUrl);

            console.log('Folder Name:', folderName);
            console.log('Image URL:', imageUrl);

            console.log(`Folder names: ${myObject.folderNames}`);
            myObject.folderNames = [...new Set(myObject.folderNames)];
            myDataObject.dataa = [...new Set(myDataObject.dataa)];

            // addImageData(myObject);
            addData(myDataObject);
            // console.log(myObject);
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

            <div className='imagesFromFolders'>
            {data.map((object) => (
                <div className='imageContainerWrap'>
                    {object.dataa.map((imageUrl) => (
                        <div className='imageContainer'>
                            {
                                    imageUrl.includes("https") ? <img
                                    key={imageUrl} src={imageUrl} alt="Collections" width="10%" height="10%">
                                    </img>:
                                    <h2>{imageUrl}</h2>
                            }
                            {/* <h2>{imageUrl}</h2>
                            <img key={imageUrl} src={imageUrl} alt='Collection' width='10%' height='50%' /> */}
                            {/* <hr></hr> */}
                        </div>
                    ))}
                </div>
            ))}
            </div>
        </div>
    )
}