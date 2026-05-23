const initializePaystackTransaction = async ({ email, amount, reference }) => {
  return {
    provider: "paystack",
    message: "Integration stub ready",
    payload: { email, amount, reference },
  };
};

module.exports = { initializePaystackTransaction };