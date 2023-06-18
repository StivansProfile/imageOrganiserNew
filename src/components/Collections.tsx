import '../styles/Collections.css'
import { Navbar } from './Home'
import {useEffect} from "react";
import { getStorage, ref, listAll } from 'firebase/storage';

export default function Collections(){

    const storage = getStorage();
    const listRef = ref(storage, '/random/uid');

    useEffect(() => {
        listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
                console.log(folderRef.bucket);
            });
            res.items.forEach((itemRef) => {
                console.log(itemRef.bucket);
            });
        });
    });


    return(
        <div className='collectionsWrap'>
            <Navbar />
            <h1>Here are your collections.</h1>
        </div>
    )
}