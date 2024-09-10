import mongoose, { Document, Model } from "mongoose";

export interface IDrinkChoiceModel extends Document{
  attributes: [
    {
      name: String,
      value: String,
    }
  ]
}

const drinksChoiceSchema = new mongoose.Schema<IDrinkChoiceModel>(
  {
    attributes: [
      {
        name: {
          type: String,
          required: true
        },
        value: {
          type: String,
          required: true
        },
      }
    ]
  },
);

const DrinkChoiceModel: Model<IDrinkChoiceModel> =
  mongoose.models?.DrinkChoiceModel || mongoose.model("DrinkChoiceModel", drinksChoiceSchema);

export default DrinkChoiceModel;
