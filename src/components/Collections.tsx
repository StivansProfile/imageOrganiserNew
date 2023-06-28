import '../styles/Collections.css'
import { Navbar } from './Home'
import {useEffect, useState} from "react";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';


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
    const listRef = ref(storage, '/random');

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
            listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                // console.log(folderRef);
                });
                res.items.forEach(async (itemRef) => {
                    // retrieves name of the folder 
                    console.log(itemRef.parent?.fullPath);
                    if(itemRef.parent?.fullPath)
                    myObject.folderNames.push(itemRef.parent.fullPath)
    
                    // retrieves the image url
                    await getDownloadURL(itemRef)
                    .then(async function(url){
                        // console.log(url);
                        myObject.imageUrls.push(url);
                        addImageData(myObject);
                        console.log(myObject);
                    })
                });
            });
        }
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
        </div>//
    )
}