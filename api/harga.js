export default async function handler(req, res) {
  try {
    const response = await fetch("https://www.antamgold.com/fetch-price.php");

    const json = await response.json();

    if (!json.status) {
      throw new Error("Data tidak tersedia");
    }

    const tahun = Object.keys(json.data)[0];
    const data = json.data[tahun];

    function toNumber(str) {
      return Number(str.replace(/[^\d]/g, ""));
    }

    res.status(200).json({
      status: "ok",
      update: new Date().toISOString(),

      gram1: {
        harga: toNumber(data["1.0"].harga),
        buyback: toNumber(data["1.0"].harga_buyback)
      },

      gram5: {
        harga: toNumber(data["5.0"].harga),
        buyback: toNumber(data["5.0"].harga_buyback)
      },

      gram10: {
        harga: toNumber(data["10.0"].harga),
        buyback: toNumber(data["10.0"].harga_buyback)
      }
    });

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
}
