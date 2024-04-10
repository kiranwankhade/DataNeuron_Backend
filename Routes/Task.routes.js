const express = require("express");
const { DataModel } = require("../Model/Data.model");

const taskRouter = express.Router();

let addCount = 0;
let updateCount = 0;

taskRouter.get("/", async (req, res) => {
  const tasks = await DataModel.find();
  console.log("tasks:", tasks);
  res.send({ Data: tasks });
});


taskRouter.post("/create", async (req, res) => {
    const startTime = new Date();
    try{
        const payload = req.body;
        const task =  new DataModel(payload);
        await task.save();
        addCount += 1;
        res.send({"message":"data created"})
    }catch(err){
        res.send({"msg":"data not Created","err":err.message})
    }
 
  //For calculating execution time of each API
  const endTime = new Date();
  console.log(
    `Execution time for /create: ${endTime - startTime}ms`
  );
});

taskRouter.delete("/delete/:id",async (req,res)=>{
    const taskID =  req.params.id;
    await DataModel.findByIdAndDelete(taskID);
    res.send({"msg":`data deleted with ${taskID}`})
})

taskRouter.patch("/update/:id", async (req, res) => {
  const startTime = new Date();
  let dataID = req.params["id"];
  const payload = req.body;
  console.log('payload:', payload)


  if (payload !== undefined) {
    try {
        const query = await DataModel.findByIdAndUpdate({ _id: dataID }, payload);
        console.log('query:', query)
        updateCount += 1
        res.send({ msg: "Data get updated" });
      } catch (err) {
        console.log("err:", err);
        res.send({ msg: "Something Went wrong\n" });
      }
    
}else {
    res.status(400).json({ success: false, message: 'Invalid request.' });
}
 
  //For calculating execution time of each API
  const endTime = new Date();
  console.log(
    `Execution time for /update/:id: ${endTime - startTime}ms`
  );
});

taskRouter.get('/getCount', (req, res) => {
    const startTime = new Date();
    res.json({ addCount, updateCount });

    //For calculating execution time of each API
    const endTime = new Date();
    console.log(`Execution time for /getCount/:id: ${endTime - startTime}ms`);
});

module.exports = {
  taskRouter,
};
