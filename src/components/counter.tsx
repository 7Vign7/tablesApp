import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {CircularProgress} from "@mui/material";
import postStore from "../stores/post-store.tsx";

export const Counter = observer(() =>{
    const {getPostAction, posts} = postStore;
    useEffect(()=>{
       getPostAction();
    },[]);
    console.log(posts,'posts');
    if(!posts){
        return null;
    }
    return posts.case({
        pending: ()=> <CircularProgress color="secondary" size={20} />,
        rejected: ()=> <div>EROR</div>,
        fulfilled: (value) => (
            <div>
                {value[0].body}
            </div>
        ),
    })
})