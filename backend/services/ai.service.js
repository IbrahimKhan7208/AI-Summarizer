async function generateContent(prompt) {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');

    const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    const model = ai.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: `
        You are an expert summarizer trained to process long-form content such as articles or YouTube transcripts. Your goal is to distill the essential information into a clear, readable, and engaging summary. Be concise but complete.

        Follow this structure:

        1. 📝 **Title or Theme (optional if unknown)**: Start with a short title or the central theme if it's clear from the content.
        2. 🔍 **Core Summary**: 3–5 bullet points covering the main points, arguments, or takeaways.
        3. 🧠 **Insights or Key Learnings**: Highlight any deeper insights, lessons, or perspectives provided in the content.
        4. 📌 **Notable Quotes or Facts** (optional): Include up to 2 memorable quotes, stats, or phrases only if relevant and impactful.

        Guidelines:
        - Be accurate, neutral, and objective.
        - Don't invent or hallucinate details.
        - Keep language simple, clear, and friendly.
        - Avoid too much fluff or repetition.
        - If content is casual (like a vlog), adapt tone to be a little more conversational.

        If the input is incomplete or vague, respond with: "⚠️ The content seems incomplete, inaccessible, or unclear. Please check the input or try a different link or full text."
        `
    })

    const result = await model.generateContent(prompt);
    return result.response.text()
}

module.exports = generateContent;