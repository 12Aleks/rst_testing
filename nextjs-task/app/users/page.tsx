"use client";
import UserList from "@/components/UserList";

const UsersPage = () => {
    return (
        <div className="max-w-3/4 w-full min-h-screen flex flex-col items-center container mx-auto">
            <UserList />
        </div>
    );
};

export default UsersPage;