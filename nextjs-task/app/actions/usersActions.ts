"use server"
import {prisma} from "@/app/lib/prisma";
import {z} from "zod";
import {userSchema} from "@/app/lib/zoodSchema";


function checkData(data: z.infer<typeof userSchema>){
    const validateData = userSchema.safeParse(data);
    if (!validateData.success) {
        console.error("Address validation failed:", JSON.stringify(validateData.error.format()));
        throw new Error(`Invalid address data: ${JSON.stringify(validateData.error.format())}`);
    }
    return validateData.data;
}

export async function getOneUser(id: number) {
    try {
        const user = await prisma.users.findUnique({
            where: { id },
            include: { users_addresses: true }
        });

        if (!user) {
            return { error: "User not found" };
        }

        return user;
    } catch (error) {
        return { error: "Error fetching user" };
    }
}


export async function getUsers(page: number = 1, limit: number = 12){

    try{
        const usersSplit = await prisma.users.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {users_addresses: true},
        });

        const allUsers = await prisma.users.count();
        return {users: usersSplit, quantityUsers: allUsers};
    }catch (error){
        return {error: "Users list not found"};
    }

}

export async function createNewUser(data: z.infer<typeof userSchema>){
    const validateData = checkData(data);

    try{
        const newUser = await prisma.users.create({data: validateData})
        return newUser;
    }catch (e){
        return {error: "User is not be created"};
    }
}

export async function deleteUser(userId: number) {
    try{
        const userIsFind = await prisma.users.findUnique({
            where: {id: userId},
        });
        if (!userIsFind) {
            return {error: "User not found"};
        }

        const data = await prisma.users.delete({where: {id: userId}});

        return data;
    }catch (e){
        return {error: "User not found"};
    }

}

export async function updateUser(data: z.infer<typeof userSchema>){
    const validateData = checkData(data);

    try{
        const updatedUser = await prisma.users.update({
            where: {email: data.email},
            data: validateData,
        })
        return updatedUser;
    } catch (error) {
        console.error("Error updating user:", error);
        return { error: "Update failed" };
    }
}