import Service from "./service";


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
    cleanUp(item:{parent:HTMLElement}){
        const {parent}=item;
        while(parent.firstChild as ChildNode){
            parent.removeChild(parent.lastChild as ChildNode)
        }
    }
}
export default Home;