import Link from "next/link";


const Ready = () => {
    return (
        <div>
            <div className="mt-12 p-6  rounded-lg flex flex-col items-center gap-4 text-center">
                <div>
                    <h1 className="text-4xl font-bold dark:text-white my-2">Ready to find your perfect companion?</h1>
                    <p className="opacity-75">Thousands of pets are waiting for their forever homes.</p>
                </div>
                <div>
                    <Link href="/add-pet" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add a Pet
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Ready;