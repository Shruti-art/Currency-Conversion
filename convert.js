app.post('/convert', async (req, res) => {
    try {
      const { toConvert } = req.body;
      const conversions = [];
  
      for (const conversion of toConvert) {
        const { amount, from, to } = conversion;
        const exchangeValues = [];
  
        for (const targetCurrency of to) {
          const response = await axios.get(`https://cdn.isdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${targetCurrency}.json`);
          const rate = response.data[targetCurrency];
          const convertedAmount = amount * rate;
  
          exchangeValues.push({ to: targetCurrency, value: convertedAmount });
        }
  
        conversions.push({ amount, from, exchangeValues });
      }
  
      res.status(200).json({ conversions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  