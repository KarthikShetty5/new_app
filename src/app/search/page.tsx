'use client'
import { useEffect, useState } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

const HomePage = () => {
    const [search, setSearch] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [done, setDone] = useState(false)
    async function getsearch() {
        const res = await fetch(`http://localhost:8000/data/search?item=${searchTerm}`)
        return res.json()
    }

    async function setter() {
        const searchData = getsearch()
        const [search] = await Promise.all([searchData])
        setSearch(search)
        setTimeout(() => {
            handleSearch()
        }, 9000);
    }

    // useEffect(() => {
    //     setter()
    // }, [searchTerm])

    useEffect(() => {
        console.log(JSON.stringify(search))
    })

    const handleSearch = () => {
        setDone(true)
        const filteredResults = Object.keys(search["Name"]).filter((key) => {
            const nameMatch = search["Name"][key].toLowerCase().includes(searchTerm.toLowerCase());
            const designationMatch = search["Designation"][key].toLowerCase().includes(searchTerm.toLowerCase());
            const companyMatch = search["Company"][key].toLowerCase().includes(searchTerm.toLowerCase());
            const areasMatch = search["Areas of interest"][key].toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch || designationMatch || companyMatch || areasMatch;
        });
        setSearchResults(filteredResults);
    };

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Search Page</h1>
                <div className="mb-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded mr-2 w-[60rem]"
                    />
                    <button
                        onClick={setter}
                        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                    >
                        Search
                    </button>
                </div>

                <div className="flex flex-wrap">
                    {done &&
                        searchResults.map((key) => (
                            <div key={key} className="card border rounded p-4 m-2 max-w-md bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full mr-3">
                                        {search["Name"][key][0].toUpperCase()}
                                    </div>
                                    <h3 className="text-xl font-bold">{search["Name"][key]}</h3>
                                </div>
                                <p className="text-sm">
                                    Date: {search["Date"][key]}<br />
                                    Designation: {search["Designation"][key]}<br />
                                    Company: {search["Company"][key]}<br />
                                    Areas of Interest: {search["Areas of interest"][key]}<br />
                                    <Link href={search["Linkedin"][key]}><LinkedInIcon /></Link>
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
