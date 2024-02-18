
export default async function handler(req, res) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/data/year`);
    const data = await response.json();
    res.status(200).json(data);
}
