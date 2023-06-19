import '../styles/Collections.css'
import { Navbar } from './Home'
import {useEffect, useState} from "react";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

export default function Collections(){

    const storage = getStorage();
    const listRef = ref(storage, '/random');

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    function addImageUrls(newElement: string){
        setImageUrls((prevArr) => [...prevArr, newElement]);
    }

    useEffect(() => {
        listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
            // console.log(folderRef);
            });
            res.items.forEach((itemRef) => {
                // retrieves name of the folder 
                console.log(itemRef.parent?.fullPath);

                // retrieves the image url
                getDownloadURL(itemRef)
                .then(function(url){
                    addImageUrls(url);
                    console.log(url);
                })
            });
        });
    }, []);


    return(
        <div className='collectionsWrap'>
            <Navbar />
            <h1>Here are your collections.</h1>

            {/* map out the images */}
            {imageUrls.map((element, index) => (
                <img key={index} src={element}
                width="50%"></img>
            ))}

        </div>
    )
}