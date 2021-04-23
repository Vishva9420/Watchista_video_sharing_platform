export class comments{
  
    comment:String;
    vid:String;
    like:number;
    dislike:number;
    canLike:number;
    canDislike:number;
    userId:any;
    cReply:[
        {
        userId:number,
        reply:string
        }
    ];
   
    
}