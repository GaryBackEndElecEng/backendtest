import { getErrorMessage } from "@/lib/errorBoundaries";
import { blogType, postType } from "./Types";


class Service{
    postsUrl:string;
    getblog:string;
    constructor(){
        this.postsUrl="/api/posts";
        this.getblog="/api/getblog";
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
   async getblogs():Promise<blogType[]|void>{
        const option={
            headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(this.getblog,option).then(async(res)=>{
            if(res.ok){
                const body = await res.json() as blogType[];
                return body;
            }
        });
    }
   async getBlog(item:{id:number}):Promise<blogType|void>{
    const {id}=item;
        const option={
            headers:{"Content-Type":"application/json"},
            method:"GET"
        }
        return fetch(`${this.getblog}?id=${id}`,option).then(async(res)=>{
            if(res.ok){
                const body = await res.json() as blogType;
                return body;
            }
        });
    }
}
export default Service;