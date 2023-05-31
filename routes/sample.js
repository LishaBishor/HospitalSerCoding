const express=require('express');
const app=new express();
app.use(express.json())
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
var fs=require('fs');
var ans;

//....here hosp.json file is read and stored in 'ans'...
fs.readFile('./hosp.json',(error,result)=>{
if(error){ ans=error;}
else{ ans=result}

})
//...to 'get'  the contents in the hosp.json file....
router.get('/',(req,res)=>{
    
    res.send(ans);
})

//....data to be posted or written  to the hosp.json file.....
var data={"name":"St.James","patients":200,"location":"Chalakudy"}
//....to post or write the data in to the file....
router.post('/add',(req,res)=>{
   var hosparr=JSON.parse(ans);
   hosparr.push(data)
   console.log(hosparr)
   var data2=JSON.stringify(hosparr)
   fs.writeFile('./hosp.json',data2,(err)=>{ if (err) throw err;
   console.log(`The ${data["name"]} hospital details has been saved!`);})
   res.send(`given data of ${data["name"]}  hospital is added, use GET command in postman to see it `)      
 })
 //...to update a particular element in the array in the hosp.json...
 router.put('/update/:ind',(req,res)=>{
    const index=req.params.ind;
    var hosparr=JSON.parse(ans);
    console.log(hosparr);
    hosparr[index].patients=335
    console.log(hosparr[index].patients)
    var data2=JSON.stringify(hosparr)
    fs.writeFile('./hosp.json',data2,(err)=>{ if (err) throw err;
    console.log(`The no.of patients of hospital ${hosparr[index].name} is updated`);})
    console.log(index);
    res.send(`updated patietns number of hospital ${hosparr[index].name}.To see it Use the Get command`);
 })

 //...to delete a particular hospital details in the array in the hosp.json...
 router.delete('/delete/:ind',(req,res)=>{
    const index=req.params.ind;
    var hosparr=JSON.parse(ans);
    console.log(hosparr);
   // hosparr = hosparr.slice(index);
    //hosparr[index].remove();
    var hosname=hosparr[index].name
    delete hosparr[index];
    //...inorder to remove the null value in the array in hosp.json...
     var newhosparr=[];
    hosparr.forEach(element => {
        if(element!=null){
            console.log(element)
            newhosparr.push(element)                     
        }
    });
    var data2=JSON.stringify(newhosparr)
    fs.writeFile('./hosp.json',data2,(err)=>{ if (err) throw err;
    console.log(`The ${hosname} hospital details is removed`);})
    console.log(index);
    res.send(`Deleted ${hosname} details. to see it Use the Get command`);
 })
module.exports=router;