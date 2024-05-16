const categoryModel = require("../MODEL/Catogories");
const Expensemodel = require("../MODEL/Expenseschema");
const { getlist } = require("./ExpCrud1");

const Createcat = async (req, res) => {
  const { type, color } = req.body;
  const categoryCreate = await categoryModel.create({
    type,
    color,
  });
  res.json(categoryCreate);
};

const getcat = async (req, res) => {
  const categoryget = await categoryModel.find();

  let filter = await categoryget.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
};

// const get_Labels = async(req,res)=>
// {
//     const label = getlist.aggregate([
//         {
//             $lookup : {
//                 from:"categories",
//                 localField:'type',
//                 foreignFeild:"type",
//                 as:"categories_info"
//             }
//         },
//         {
//             $unwind:"$categories_info"
//         }

//     ]).then(result => {
//         categoryget = result.map(v=>Object.assign({},{_id:v._id,type:v.type,name:v.name,amount:v.amount,color:v.categories_info['color']}));
//         res.json(categoryget);
//     }).catch(error => {
//         res.status(400).json("Looup collection Error")
//     })
// }

// async function get_Labels(req,res){
//     model.Expensemodel.aggregate([
//         {
//             $lookup : {
//                 from:"categories",
//                 localField:'type',
//                 foreignFeild:"type",
//                 as:"categories_info"
//             }
//         },
//         {
//             $unwind:"$categories_info"
//         }
//     ]).then(result => {
//         res.json(result);
//     }).catch(error => {
//         res.status(400).json("Looup collection Error")
//     })
// }

async function get_graph(req, res) {
  categoryModel
    .aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "type",
          foreignField: "type",
          as: "categories_info",
        },
      },
      {
        $unwind: "$categories_info",
      },
    ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            type: v.type,
            name: v.name,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Looup Collection Error");
    });
}

async function get_Labels(req, res) {
    console.log(req.params.userId);
  try {
    let data = await Expensemodel.find({user:req.params.userId});
    const categories = await categoryModel.find();
    data = data.map((transaction) => {
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].type === transaction.type) {
          return {
            _id: transaction._id,
            type: transaction.type,
            name: transaction.name,
            amount: transaction.amount,
            color: categories[i].color,
          };
        }
      }
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Createcat, getcat, get_graph, get_Labels };
