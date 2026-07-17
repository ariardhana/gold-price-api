export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.antamgold.com/fetch-price.php");
    const json = await response.json();

    const tahun = Object.keys(json.data)[0];
    const data = json.data[tahun];

    const hasil = {};

    for (const key in data) {
      hasil[key] = {
        harga: Number(data[key].harga.replace(/[^\d]/g, "")),
        buyback: Number(data[key].harga_buyback.replace(/[^\d]/g, ""))
      };
    }

    res.status(200).json({
      status: "ok",
      update: new Date().toISOString(),
      harga: hasil
    });

  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.toString()
    });
  }
}
