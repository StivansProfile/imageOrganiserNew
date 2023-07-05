import '../styles/EntireCollection.css'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import {useEffect, useState} from "react";

// make a reference call to firebase
// using the given prop value

export default function EntireCollection(props: any){

    const storage = getStorage();
    const listRef = ref(storage, `/${props.collectionName}`);

    const [folderName, setFolderName] = useState("");
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    function addImageUrls(newElement: string){
        setImageUrls((prevArr) => [...prevArr, newElement]);
    }

    function addFolderName(newElement: string){
        setFolderName(newElement);
    }

    useEffect(() => {
        listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                // retrieves name of the folder 
                console.log(itemRef.parent?.fullPath);
                if(itemRef.parent?.fullPath)
                addFolderName(itemRef.parent?.fullPath);

                // retrieves the image url
                getDownloadURL(itemRef)
                .then(function(url){
                    console.log(url);
                    addImageUrls(url);
                })
            });
        });
    }, []);

    return(
        <div>
            <h1>Collection {props.collectionName}</h1>
            <hr className='collectionHr'></hr>

            <h2>{folderName}</h2>
            {/* map out the images */}
            {imageUrls.map((element, index) => (
                <img key={index} src={element}
                width="20%"></img>
            ))}

        </div>
    );
}