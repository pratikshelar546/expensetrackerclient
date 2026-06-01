export const wakeUpServer = async () => {    
    try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
    if(!response.ok){
            return false;
        }
        return true;
    } catch (error) {
        console.error("Failed to wake up server", error);
        return false;
    }
}