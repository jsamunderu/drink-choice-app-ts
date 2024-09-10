'use server';

import { connectToMongoDB } from "./db";
import DrinkChoiceModel from "@/models/drinksmodel";

export const createDrinkChoiceModel = async (formData: FormData) => {
    await connectToMongoDB();

    let attr = [] as any;
    const obj = Object.fromEntries(formData.entries());
    Object.entries(obj).forEach(([key, value]) => { attr.push({name: key, value: value})});
    const doc = { attributes:attr };

    try {
        const newDrinkChoiceModel = await DrinkChoiceModel.create(doc);

        newDrinkChoiceModel.save();

        return newDrinkChoiceModel.toString();
    } catch (error) {
        console.log(error);
        return {message: 'error creating'};
    }
};
