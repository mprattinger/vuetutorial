import mongoose from "mongoose";

const tutorialSchema = mongoose.Schema({
    title: String,
    description: String,
    published: Boolean
  },
  { timestamps: true }
);

tutorialSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

let TutorialModel = mongoose.model("Tutorial", tutorialSchema);

export default TutorialModel;