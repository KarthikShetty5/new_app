
export default async function handler(req, res) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/data/search?item=${searchTerm}`);
    const data = await response.json();
    res.status(200).json(data);
}
