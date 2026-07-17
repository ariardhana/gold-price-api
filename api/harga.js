export default async function handler(req, res) {
  try {
    const headers = {
      "User-Agent": "Mozilla/5.0"
    };

    // Harga jual
    const home = await fetch("https://www.logammulia.com/id", {
      headers
    }).then(r => r.text());

    // Buyback
    const sell = await fetch("https://www.logammulia.com/id/sell/gold", {
      headers
    }).then(r => r.text());

    // Ambil harga jual
    const hargaMatch = home.match(/Harga\/gram\s*Rp\s*([\d.,]+)/i);

    // Ambil buyback
    const buybackMatch = sell.match(/Harga Buyback:\s*.*?Rp\s*([\d.,]+)/is);

    if (!hargaMatch)
      throw new Error("Harga jual tidak ditemukan");

    if (!buybackMatch)
      throw new Error("Harga buyback tidak ditemukan");

    const harga = Number(
      hargaMatch[1]
        .replace(/\./g, "")
        .replace(",", ".")
        .split(".")[0]
    );

    const buyback = Number(
      buybackMatch[1]
        .replace(/\./g, "")
        .replace(",", ".")
        .split(".")[0]
    );

    res.status(200).json({
      status: "ok",
      tanggal: new Date().toISOString(),
      harga,
      buyback,
      source: "Logam Mulia"
    });

  } catch (e) {
    res.status(500).json({
      status: "error",
      message: e.message
    });
  }
}
