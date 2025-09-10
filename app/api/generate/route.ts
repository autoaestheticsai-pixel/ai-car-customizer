import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI, Modality } from '@google/genai'

const API_KEY = process.env.GEMINI_API_KEY

if (!API_KEY) {
  console.warn('GEMINI_API_KEY not found in environment variables')
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null
const model = 'gemini-2.5-flash-image-preview'

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!API_KEY || !ai) {
      // Return mock response for development
      return NextResponse.json({
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTIxODIxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI0E3QTlBQyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vY2sgR2VuZXJhdGVkIEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNBM0E5QUMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TZXQgdXAgR0VNSU5JX0FQSV9LRVkgdG8gdXNlIEFJIGZlYXR1cmVzPC90ZXh0Pjwvc3ZnPg==',
        commentary: 'This is a mock response. Set up GEMINI_API_KEY to use AI features.',
      })
    }

    const body = await request.json()
    const { originalImageBase64, prompt, referenceImageBase64 } = body

    if (!originalImageBase64 || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: originalImageBase64 and prompt' },
        { status: 400 }
      )
    }

    // Prepare parts for Gemini API
    const parts: any[] = []

    // Add original car image
    parts.push({
      inlineData: {
        data: originalImageBase64,
        mimeType: 'image/jpeg',
      },
    })

    // Add user prompt
    const fullPrompt = `Based on the user's car image, apply the following cosmetic modification: "${prompt}". If a second 'reference' image is provided, use it as inspiration for the specific style of the part being added or modified. Ensure the final image is photorealistic, maintaining the original background, lighting, and perspective. The modified car should look natural in its environment.`
    parts.push({ text: fullPrompt })

    // Add reference image if it exists
    if (referenceImageBase64) {
      parts.push({
        inlineData: {
          data: referenceImageBase64,
          mimeType: 'image/jpeg',
        },
      })
      parts.push({ text: "This is the reference image for the modification style." })
    }

    // Call Gemini API
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: parts,
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    })

    let imageUrl: string | null = null
    let commentary: string | null = null

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data && part.inlineData?.mimeType) {
          const base64ImageBytes = part.inlineData.data
          imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`
        } else if (part.text) {
          commentary = part.text
        }
      }
    }

    if (!imageUrl) {
      throw new Error("API did not return an image. The model may have refused the request.")
    }

    return NextResponse.json({
      imageUrl,
      commentary,
    })

  } catch (error) {
    console.error('Generation error:', error)
    
    // Handle quota exceeded errors specifically
    if (error && typeof error === 'object' && 'error' in error) {
      const apiError = error as any
      if (apiError.error?.code === 429) {
        return NextResponse.json(
          { 
            error: "🚫 API Quota Exceeded: You've reached the free tier limit. Please wait a few minutes and try again, or consider upgrading your plan at https://ai.google.dev/gemini-api/docs/rate-limits"
          },
          { status: 429 }
        )
      }
    }

    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json(
      { error: `Failed to generate image: ${errorMessage}` },
      { status: 500 }
    )
  }
}
