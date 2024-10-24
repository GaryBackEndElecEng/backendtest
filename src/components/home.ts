import Service from "./service";
import { blogType } from "./Types";


class Home{
    constructor(private _service:Service){

    }

    main(item:{parent:HTMLElement}){
        const {parent}=item;
        this.cleanUp({parent});
        const container=document.createElement("section");
        container.id="home-main";
        container.style.cssText="display:grid;place-items:center;padding:4rem;min-height:30vh;width:100%;";
        parent.appendChild(container);
        this.blogs({parent});
        this._service.getPosts().then(async(res)=>{
            if(res){
                const row=document.createElement("div");
                row.className="row mx-auto px-2";
                container.appendChild(row);
                res.map((post,index)=>{
                    if(post){
                        const col=document.createElement("div");
                        col.id=`${index}-col`;
                        col.style.cssText="display:flex;flex-direction:column;gap:1rem;justify-content:center;align-items:center;";
                        const h6=document.createElement("h6");
                        h6.textContent=post.title;
                        const para=document.createElement("p");
                        para.textContent=post.content ? post.content : "none";
                        const imgkey=document.createElement("p");
                        imgkey.textContent=post.imageKey ? post.imageKey : "none";
                        const date=document.createElement("p");
                        date.textContent=post.date ? JSON.stringify(post.date) :" no date";
                        col.appendChild(h6);
                        col.appendChild(para);
                        col.appendChild(imgkey);
                        col.appendChild(date);
                        row.appendChild(col);
                    }
                });
            }
        });
    }
    blogs(item:{parent:HTMLElement}){
        const {parent}=item;
        const container=document.createElement("div");
        container.id="blogs-container";
        container.style.cssText="width:100%;min-height:5vh;padding:1rem;";
        const row=document.createElement("div");
        row.className="row";
        container.appendChild(row);
        this._service.getblogs().then(async(res)=>{
            if(res){
                const blogs=res as blogType[];
                blogs.map(blog=>{
                    if(blog){

                        const col=document.createElement("div");
                        col.id="col" + blog.id;
                        col.style.cssText="margin-inline:auto;flex:0 0 25%";
                        col.className="col-md-4";
                        const title=document.createElement("h6");
                        title.id="title" + blog.id;
                        title.textContent=blog.title ? blog.title:"blog.title"
                        const para1=document.createElement("p");
                        para1.id="para1"+ blog.id;
                        para1.textContent=blog.desc ? blog.desc :" blog.desc";
                        const para2=document.createElement("p");
                        para2.id="para2"+ blog.id;
                        para2.textContent=blog.date ? JSON.stringify(blog.date):" date";
                        const para3=document.createElement("p");
                        para3.id="para3"+blog.id;
                        para3.textContent=JSON.stringify(blog.elements);
                        col.appendChild(title);
                        col.appendChild(para1);
                        col.appendChild(para2);
                        col.appendChild(para3);
                        row.appendChild(col);
                    }
                });
            }
        });
        parent.appendChild(container);
    };
    cleanUp(item:{parent:HTMLElement}){
        const {parent}=item;
        while(parent.firstChild as ChildNode){
            parent.removeChild(parent.lastChild as ChildNode)
        }
    }
}
export default Home;