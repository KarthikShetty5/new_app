'use client'
import { useEffect, useState } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
interface SearchState {
    Name: Record<string, string>;
    Date: Record<string, string>;
    Designation: Record<string, string>;
    Company: Record<string, string>;
    "Areas of interest": Record<string, string>;
    Linkedin: Record<string, string>;
}

const HomePage = () => {

    const [showHistory, setShowHistory] = useState(false);

    const handleHistoryItemClick = (item: string) => {
        setSearchTerm(item);
        setShowHistory(false);
    };

    const handleRemoveHistoryItem = (item: string) => {
        const updatedHistory = searchHistory.filter((historyItem) => historyItem !== item);
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const handleCloseHistory = () => {
        setShowHistory(false);
    };

    // const CustomAvatar = ({ name }: string) => {
    //     const firstLetter = name.charAt(0).toUpperCase();
    //     return (
    //         <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full mr-3">
    //             {firstLetter}
    //         </div>
    //     );
    // };

    const [search, setSearch] = useState<SearchState>({
        Name: {},
        Date: {},
        Designation: {},
        Company: {},
        "Areas of interest": {},
        Linkedin: {}
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [done, setDone] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>(() => {
        const storedHistory = localStorage.getItem('searchHistory');
        return storedHistory ? JSON.parse(storedHistory) : [];
    });

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/data/search?item=${searchTerm}`);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return {};
        }
    };

    const handleSearch = async () => {
        setDone(false); // Reset the done state
        const searchData = await fetchData();

        if (!searchData || Object.keys(searchData).length === 0) {
            console.error('No data found or error in fetching data.');
            return;
        }

        setSearch(searchData);
        const filteredResults = Object.keys(searchData["Name"]).filter((key) => {
            const nameMatch = searchData["Name"][key].toLowerCase().includes(searchTerm.toLowerCase());
            const designationMatch = searchData["Designation"][key].toLowerCase().includes(searchTerm.toLowerCase());
            const companyMatch = searchData["Company"][key].toLowerCase().includes(searchTerm.toLowerCase());
            const areasMatch = searchData["Areas of interest"][key].toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch || designationMatch || companyMatch || areasMatch;
        });
        setSearchResults(filteredResults);
        setDone(true);

        if (searchTerm.trim() !== '' && !searchHistory.includes(searchTerm)) {
            const newSearchHistory = [...searchHistory, searchTerm];
            setSearchHistory(newSearchHistory);
            localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
        }
    };

    useEffect(() => {
        console.log(JSON.stringify(searchResults));
    }, [searchResults]);

    return (
        <DefaultLayout>
            <div className="container mx-auto p-4 relative">
                <h1 className="text-3xl font-bold mb-4">Search Page</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by any keyword"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowHistory(true);
                        }}
                        className="p-2 border rounded w-[60rem] text-black"
                    />
                    {showHistory && searchHistory.length > 0 && (
                        <div className="search-history-box absolute z-50 bg-black w-[60rem] border rounded mt-2 top-[2.5rem]">
                            <div className="flex justify-between items-center p-2 border-b">
                                <span className='text-white'>Search History</span>
                                <button onClick={handleCloseHistory}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <ul>
                                {searchHistory.map((historyItem, index) => (
                                    <li key={index} className="flex justify-between items-center p-2 border-b">
                                        <span onClick={() => handleHistoryItemClick(historyItem)}>{historyItem}</span>
                                        <button onClick={() => handleRemoveHistoryItem(historyItem)}>
                                            <span>&times;</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => {
                        handleSearch();
                        setShowHistory(false);
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer mt-2"
                >
                    Search
                </button>

                <div className="flex flex-wrap gap-4 justify-around mt-4">
                    {done &&
                        searchResults.map((key) => (
                            <Card key={key} className="w-[500px] border border-primary-200 p-4 bg-slate-200 rounded-3xl">
                                <CardHeader className="justify-between">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex flex-col gap-1">
                                            <h5 className="text-small font-semibold text-slate-950">
                                                {search["Name"][key]}
                                            </h5>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-3 py-0 text-small text-default-400">
                                    <p className="text-sm">
                                        <span className="text-slate-800">Date : </span> <span className="text-slate-800">{search["Date"][key]}</span><br />
                                        <span className="text-slate-800">Designation : </span> <span className="text-slate-800">{search["Designation"][key]}</span><br />
                                        <span className="text-slate-800">Company : </span> <span className="text-slate-800">{search["Company"][key]}</span><br />
                                        <span className="text-slate-800">Areas of Interest : </span> <span className="text-slate-800">{search["Areas of interest"][key]}</span><br />
                                    </p>
                                    <span className='mt-2'><Link href={search["Linkedin"][key]} >
                                        <LinkedInIcon />
                                    </Link></span>
                                </CardBody>
                            </Card>
                        ))}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default HomePage;
