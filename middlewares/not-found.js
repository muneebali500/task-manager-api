export default function notFound(req, res) {
  res.status(404).send(`Route does not exist`);
}
