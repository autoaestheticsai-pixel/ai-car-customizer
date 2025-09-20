export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // increase upload limit to 10MB
    },
  },
};

export default async function handler(req, res) {
  try {
    // Check if API key is available
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      return res.status(400).json({ 
        error: "Missing GEMINI API key" 
      });
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { originalImageBase64, prompt, referenceImageBase64 } = req.body;

    if (!originalImageBase64 || !prompt) {
      return res.status(400).json({
        error: 'Missing required fields: originalImageBase64 and prompt'
      });
    }

    // For now, return a mock response since we'd need to install @google/genai
    // You can replace this with actual Gemini API integration
    return res.status(200).json({
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTIxODIxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0E3QTlBQyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vY2sgR2VuZXJhdGVkIEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNBM0E5QUMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TZXQgdXAgR0VNSU5JX0FQSV9LRVkgdG8gdXNlIEFJIGZlYXR1cmVzPC90ZXh0Pjwvc3ZnPg==',
      commentary: 'This is a mock response. Set up GEMINI_API_KEY to use AI features.',
    });

  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ 
      error: "Failed to generate image",
      details: error.message 
    });
  }
}
