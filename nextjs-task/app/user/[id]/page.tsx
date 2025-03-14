import UserAddressList from "@/components/UserAddressList";

const UserPage = async ({params}: { params: Promise<{ id: string }> }) => {
    const getParams = await params
    if (!getParams.id) return <div>User ID is not defined</div>;

    return (
        <div className="max-w-3/4 w-full min-h-screen flex flex-col items-center container mx-auto">
            <UserAddressList userId={Number(getParams.id)} />
        </div>
    );
};

export default UserPage;