"use server"
import {prisma} from "@/app/lib/prisma";
import {z} from "zod";
import {addressSchema} from "@/app/lib/zoodSchema";


function checkData(data: z.infer<typeof addressSchema>){
    const validateData = addressSchema.safeParse(data);
    if (!validateData.success) {
        console.error("Address validation failed:", JSON.stringify(validateData.error.format()));
        throw new Error(`Invalid address data: ${JSON.stringify(validateData.error.format())}`);
    }
    return validateData.data;
}

export async function getUserAddresses(userId: number, page: number = 1, limit: number = 12) {
    try{
        const addressSplit= await prisma.users_addresses.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: { user_id: userId },
            select: {
                user_id: true,
                address_type: true,
                valid_from: true,
                post_code: true,
                city: true,
                country_code: true,
                street: true,
                building_number: true,
                created_at: true,
                updated_at: true,
            },
        });
        const allUserAdress = await prisma.users.count();
        return {addresses: addressSplit, quantityAddress: allUserAdress};
    }catch (e){
        return { addresses: [], quantityAddress: 0 };
    }

}

export async function createUserAddress(data: z.infer<typeof addressSchema>, userId: number, validFrom: Date) {
    const validateData = checkData(data);

    try {
        const newAddress = await prisma.users_addresses.create({
            data: {
                ...validateData,
                user_id: userId,
                valid_from: validFrom
            }
        });
        console.log("new address", newAddress);
        return newAddress;
    } catch (error) {
        console.error("Error creating address:", error);
        return { error: "Address could not be created." };
    }
}

export async function deleteUserAddress(userId: number, addressType: string, validFrom: Date) {
    try{
        const deleteData =  await prisma.users_addresses.delete({
            where: { user_id_address_type_valid_from: { user_id: userId, address_type: addressType, valid_from: validFrom } },
        });
        return deleteData;
    }catch (error){
        console.error("Error deleting address:", error);
        return {error: "Invalid address data"};
    }

}

export async function updateUserAddress(userId: number, data: z.infer<typeof addressSchema>){
    const validateData = checkData(data);

    try {
        const updatedUserAddress = await prisma.users_addresses.update({
            where: {
                user_id_address_type_valid_from: {
                    user_id: userId,
                    address_type: data.address_type,
                    valid_from: data.valid_from,
                }
            },
            data: validateData,
        });


        return updatedUserAddress;
    } catch (error) {
        console.error("Error updating address:", error);
        return { error: "User address not found or update failed" };
    }
}

