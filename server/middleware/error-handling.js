const errorHandler = (err, req, res, next) => {
  console.error("Error: ", req.method, req.path, err);
  res.status(500).json({ message: "Internal server error occured." });
}

const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: "This route does not exist" });
}

module.exports = {
  errorHandler,
  notFoundHandler
}