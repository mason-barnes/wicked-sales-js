export default function fixPrice(price) {
  const dividedPrice = price / 100;
  const fixedPrice = dividedPrice.toFixed(2);
  return '$' + fixedPrice;
}
