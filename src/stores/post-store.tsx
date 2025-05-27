import {makeAutoObservable, runInAction} from "mobx";
import type {Posts} from "../types/api/api.ts";
import {getPosts} from "../api/getPosts.tsx";
import {fromPromise, type IPromiseBasedObservable} from "mobx-utils";
// class PostStore {
//     posts: Posts[] = [];
//     isLoading = false;
//
//     constructor() {
//         makeAutoObservable(this);
//     }
//
//     async getPostAction () {
//         try{
//             this.isLoading = true;
//
//             const res = await getPosts();
//             runInAction(() => {
//                 this.posts = res;
//                 this.isLoading = false;
//             })
//         } catch {
//             this.isLoading = false;
//         }
//     }
//
// }
class PostStore {
    posts?: IPromiseBasedObservable<Posts[]>;
    constructor() {
        makeAutoObservable(this);
    }
    getPostAction = () =>{
     this.posts = fromPromise(getPosts());
    }
}
export default new PostStore();