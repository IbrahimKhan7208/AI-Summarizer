async function articleExtract (url){
    const {extract} = (await import("@extractus/article-extractor"))
    const article = await extract(url)
    const content = article?.content || article?.text || '';
    if (!content) throw new Error("Failed")
    return content;
}

module.exports = {articleExtract}