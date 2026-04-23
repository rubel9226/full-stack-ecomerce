
const publicIdWithoutExtensionFromUrl = async (imageUrl) => {
  const pathSegments = imageUrl.split("/");

  // get the last segment - g5tytdi3ojfrp5nr3ppb.jpg
  const lastSegment = pathSegments[pathSegments.length - 1];

  const valueWithoutExtension = lastSegment.replace(".jpg", "");

  return valueWithoutExtension;
};

module.exports = { publicIdWithoutExtensionFromUrl };
