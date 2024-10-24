import { getErrorMessage } from "@/lib/errorBoundaries";
import { blogType, postType } from "./Types";


class Service{
    postsUrl:string;
    savegetblog:string;
    constructor(){
        this.postsUrl="/api/posts";
        this.savegetblog="/api/savegetblog";
    }
    getPosts():Promise<postType[]|void>{
        const option={
            headers:{
                "Content-Type":"application/json"
            },method:"GET"
        }
        return fetch(this.postsUrl,option).then(async(res)=>{
            if(res.ok){
                const body=await res.json() as postType[];
                return body;
            }
        }).catch((err)=>{const msg=getErrorMessage(err);console.error(msg)});
    }
   async savegetblogs():Promise<blogType[]|void>{
        const option={
            headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(this.savegetblog,option).then(async(res)=>{
            if(res.ok){
                const body = await res.json() as blogType[];
                return body;
            }
        });
    }
}
export default Service;