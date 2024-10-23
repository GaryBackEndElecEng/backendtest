import { getErrorMessage } from "@/lib/errorBoundaries";
import { postType } from "./Types";


class Service{
    postsUrl:string;
    constructor(){
        this.postsUrl="/api/posts";
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
}
export default Service;