const app = require('./index');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  const isCloud = process.env.NODE_ENV === 'production';
  console.log(`Gemini proxy server with security measures enabled, listening on ${isCloud ? `port ${PORT}` : `http://localhost:${PORT}`}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`API rate limits: 100 requests per 1 hour`);
  console.log(`Daily API call limit: 1000 calls`);
});
