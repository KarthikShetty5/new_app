
export default async function handler(req, res) {
    const response = await fetch('http://localhost:8000/data/inter');
    const data = await response.json();
    res.status(200).json(data);
}

