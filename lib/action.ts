'use server';

import { connectToMongoDB } from "./db";
import DrinkChoiceModel from "@/models/drinksmodel";

export const createDrinkChoiceModel = async (doc: Object) => {
    await connectToMongoDB();

    try {
        const newDrinkChoiceModel = await DrinkChoiceModel.create(doc);

        newDrinkChoiceModel.save();

        return newDrinkChoiceModel.toString();
    } catch (error) {
        console.log(error);
        return {message: 'error creating'};
    }
};
