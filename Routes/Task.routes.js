// const express = require("express");
// const { DataModel } = require("../Model/Data.model");

// const taskRouter = express.Router();

// let addCount = 0;
// let updateCount = 0;

// taskRouter.get("/", async (req, res) => {
//   const tasks = await DataModel.find();
//   console.log("tasks:", tasks);
//   res.send({ Data: tasks });
// });


// taskRouter.post("/create", async (req, res) => {
//     const startTime = new Date();
//     try{
//         const payload = req.body;
//         const task =  new DataModel(payload);
//         await task.save();
//         addCount += 1;
//         res.send({"message":"data created"})
//     }catch(err){
//         res.send({"msg":"data not Created","err":err.message})
//     }
 
//   //For calculating execution time of each API
//   const endTime = new Date();
//   console.log(
//     `Execution time for /create: ${endTime - startTime}ms`
//   );
// });

// taskRouter.delete("/delete/:id",async (req,res)=>{
//     const taskID =  req.params.id;
//     await DataModel.findByIdAndDelete(taskID);
//     res.send({"msg":`data deleted with ${taskID}`})
// })

// taskRouter.patch("/update/:id", async (req, res) => {
//   const startTime = new Date();
//   let dataID = req.params["id"];
//   const payload = req.body;
//   console.log('payload:', payload)


//   if (payload !== undefined) {
//     try {
//         const query = await DataModel.findByIdAndUpdate({ _id: dataID }, payload);
//         console.log('query:', query)
//         updateCount += 1
//         res.send({ msg: "Data get updated" });
//       } catch (err) {
//         console.log("err:", err);
//         res.send({ msg: "Something Went wrong\n" });
//       }
    
// }else {
//     res.status(400).json({ success: false, message: 'Invalid request.' });
// }
 
//   //For calculating execution time of each API
//   const endTime = new Date();
//   console.log(
//     `Execution time for /update/:id: ${endTime - startTime}ms`
//   );
// });

// taskRouter.get('/getCount', (req, res) => {
//     const startTime = new Date();
//     res.json({ addCount, updateCount });

//     //For calculating execution time of each API
//     const endTime = new Date();
//     console.log(`Execution time for /getCount/:id: ${endTime - startTime}ms`);
// });

// module.exports = {
//   taskRouter,
// };


const express = require("express");
const { DataModel } = require("../Model/Data.model");
const { CountModel } = require("../Model/Count.model"); // Assuming you've created this model
const taskRouter = express.Router();

const updateCountsInDatabase = async (type) => {
  if (type === 'add') {
    await CountModel.findOneAndUpdate({}, { $inc: { addCount: 1 } }, { upsert: true });
  } else if (type === 'update') {
    await CountModel.findOneAndUpdate({}, { $inc: { updateCount: 1 } }, { upsert: true });
  }
};


taskRouter.get("/", async (req, res) => {
  const tasks = await DataModel.find();
  res.send(tasks);
});

taskRouter.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const task = new DataModel(payload);
    await task.save();
    await updateCountsInDatabase('add');
    res.send({ message: "Data created" });
  } catch (err) {
    res.status(400).send({ message: "Data not created", error: err.message });
  }
});


taskRouter.patch("/update/:id", async (req, res) => {
  const dataID = req.params.id;
  const payload = req.body;

  try {
    const updatedTask = await DataModel.findByIdAndUpdate(dataID, payload, { new: true });
    if (!updatedTask) {
      return res.status(404).send({ message: "Task not found" });
    }
    await updateCountsInDatabase('update');
    res.send({ message: "Data updated", task: updatedTask });
  } catch (err) {
    res.status(400).send({ message: "Data not updated", error: err.message });
  }
});


taskRouter.get("/getCount", async (req, res) => {
  const counts = await CountModel.findOne({});
  if (!counts) {
    return res.status(404).json({ message: "Counts not found" });
  }
  res.json({ addCount: counts.addCount, updateCount: counts.updateCount });
});


module.exports = {
  taskRouter,
};



