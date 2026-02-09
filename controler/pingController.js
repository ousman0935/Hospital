export const pingController= (req, res) => {
  res.status(200).json({ message: "Backend awake 🚀" });
};