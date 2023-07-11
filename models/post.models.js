
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function(title){
                let str = title+" "
                let word = ""
                let arr = []
                for(let t of str){
                  
                  if(t !=" "){
                     word = word+ t // floor
                  }
                  else if(t ==" " && word!=""){
                     arr.push(word)
                    word= ""
                  }
                }
                return arr.length>=3
            },
            message: "Title should have atleast 3 words"
        }
    },
    body:{
        type: String,
    },
    image_link:{
        type: String,
    },
    user_id:{
        type: ObjectId,
        ref: "User",
        required: true,
    }
},{
    timestamps: true,

    validate:{
        validator: function(){
            return this.body || this.image_link
        },
        message: "Post should have atleast one of body or image_link"
    }
})

mongoose.model('Post', postSchema);




// Ram is dancing => ["Ram", "is", "dancing"]  
// title.split()