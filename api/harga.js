export default async function handler(req, res) {

  try {

    const response = await fetch(
      "https://www.antamgold.com/fetch-price.php"
    );

    const json = await response.json();

    const data = json.data["Tahun 2026"];

    res.status(200).json({
      status: "ok",
      update: new Date().toISOString(),

      gram1: {
        harga: Number(data["1.0"].harga.replace(/[^\d]/g, "")),
        buyback: Number(data["1.0"].harga_buyback.replace(/[^\d]/g, ""))
      },

      gram5: {
        harga: Number(data["5.0"].harga.replace(/[^\d]/g, "")),
        buyback: Number(data["5.0"].harga_buyback.replace(/[^\d]/g, ""))
      },

      gram10: {
        harga: Number(data["10.0"].harga.replace(/[^\d]/g, "")),
        buyback: Number(data["10.0"].harga_buyback.replace(/[^\d]/g, ""))
      }

    });

  } catch(e){

    res.status(500).json({
      status:"error",
      message:e.toString()
    });

  }

}
