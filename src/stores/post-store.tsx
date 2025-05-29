import {makeAutoObservable, runInAction} from "mobx";
import type {Posts} from "../types/api/api.ts";
import {getTables} from "../api/getTables.tsx";
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
//             const res = await getTables();
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
     this.posts = fromPromise(getTables());
    }
}
export default new PostStore();