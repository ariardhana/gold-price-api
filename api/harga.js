export default function handler(req, res) {
  res.status(200).json({
    status: "ok",
    harga: 2839000,
    buyback: 2685000,
    source: "temporary"
  });
}
