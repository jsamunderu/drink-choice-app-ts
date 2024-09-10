'use server';
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";
import DrinkChoiceModel from "@/models/drinksmodel";

export const createDrinkChoiceModel = async (formData: FormData) => {
    await connectToMongoDB();

    const values = Object.fromEntries(formData.entries());
    try {

        const newDrinkChoiceModel = await DrinkChoiceModel.create({
            ...values
        });

        newDrinkChoiceModel.save();

        return newDrinkChoiceModel.toString();
    } catch (error) {
        console.log(error);
        return {message: 'error creating todo'};
    }
};
