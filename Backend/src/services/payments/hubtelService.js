const initializeHubtelPayment = async ({ customerName, amount, channel }) => {
  return {
    provider: "hubtel",
    message: "Integration stub ready",
    payload: { customerName, amount, channel },
  };
};

module.exports = { initializeHubtelPayment };