import '../styles/Collections.css'
import { Navbar } from './Home'
import {useEffect, useState} from "react";
import { getStorage, ref, listAll, getDownloadURL, StorageReference } from 'firebase/storage';

/*
TODO: Make the collection component look like
TODO: a normal camera roll
*/


export default function Collections(){

    const storage = getStorage();

    const listRef = ref(storage, "/");

    interface mapObject{
        dataa: string[];
    }

    const [data, setData] = useState<mapObject[]>([]);

    function addData(object: mapObject){
        setData([...data, object]);
    }

    const myDataObject: mapObject = {dataa: []}

    useEffect(() => {
    const fetchData = async () => {
        const listAllItems = async (ref: StorageReference, parentFolderPath: string) => {
        const items: StorageReference[] = [];
        const prefixes: StorageReference[] = [];
        let firstImageFound = false;

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
            myDataObject.dataa.push(folderName)

            // Retrieve the image URL
            const imageUrl = await getDownloadURL(itemRef);

            if(!firstImageFound){
                myDataObject.dataa.push(imageUrl);
                firstImageFound = true;
            }


            console.log('Folder Name:', folderName);
            console.log('Image URL:', imageUrl);

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
            <h1>All collections</h1>

            <div className='imagesFromFolders'>
            {data.map((object) => (
                <div className='imageContainerWrap'>
                    {object.dataa.map((imageUrl, index) => (
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