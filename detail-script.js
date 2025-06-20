document.addEventListener('DOMContentLoaded', function() {
    const detailTitle = document.getElementById('detail-title');
    const detailImageContainer = document.getElementById('detail-image-container');
    const detailBody = document.getElementById('detail-body');
    const relatedPostsContainer = document.getElementById('related-posts-container');
    const params = new URLSearchParams(window.location.search);
    const keywordFromQuery = params.get('q') || '';
    const keyword = keywordFromQuery.replace(/-/g, ' ').trim();
    
    function capitalizeEachWord(str) { if (!str) return ''; return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); }
    function generateSeoTitle(baseKeyword) { const hookWords = ['Delicious', 'Easy', 'Quick', 'Healthy', 'Tasty', 'Simple', 'Best', 'Amazing', 'Homemade', 'Ultimate']; const randomHook = hookWords[Math.floor(Math.random() * hookWords.length)]; const randomNumber = Math.floor(Math.random() * (50 - 10 + 1)) + 10; const capitalizedKeyword = capitalizeEachWord(baseKeyword); return `${randomHook} ${capitalizedKeyword} Recipe`; }

    // ▼▼▼ FUNGSI BARU: Untuk memproses Spintax {a|b|c} ▼▼▼
    function processSpintax(text) {
        const spintaxPattern = /{([^{}]+)}/g;
        while (spintaxPattern.test(text)) {
            text = text.replace(spintaxPattern, (match, choices) => {
                const options = choices.split('|');
                return options[Math.floor(Math.random() * options.length)];
            });
        }
        return text;
    }

    if (!keyword) { detailTitle.textContent = 'Recipe Not Found'; detailBody.innerHTML = '<p>Sorry, the requested recipe could not be found. Please return to the <a href="index.html">homepage</a>.</p>'; if (relatedPostsContainer) { relatedPostsContainer.closest('.related-posts-section').style.display = 'none'; } return; }

    function populateMainContent(term) {
        const newTitle = generateSeoTitle(term);
        const capitalizedTermForArticle = capitalizeEachWord(term);
        document.title = `${newTitle} | RecipeFiesta`;
        detailTitle.textContent = newTitle;

        const imageUrl = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(term)}&w=800&h=1200&c=7&rs=1&p=0&dpr=1.5&pid=1.7`;
        detailImageContainer.innerHTML = `<img src="${imageUrl}" alt="${newTitle}">`;

        // ▼▼▼ ARTIKEL BARU: Template artikel dengan format Spintax ▼▼▼
        const spintaxArticleTemplate = `
            <p>{Welcome to|Explore|Discover} our {delicious|amazing|tasty} recipe for <strong>${capitalizedTermForArticle}</strong>. {This is the perfect dish|You'll love this recipe} for {any occasion|a weeknight dinner|a special meal}. {It's easy to make|Simple and quick|A delightful treat}, and {packed with flavor|absolutely delicious|sure to impress}.</p>
            <h3>Ingredients</h3>
            <ul>
                <li>{2 cups|500g|1 lb} of {flour|chicken|beef|tofu}</li>
                <li>{1 cup|250ml|8 oz} of {milk|water|broth}</li>
                <li>{2|3|4} {eggs|onions|cloves of garlic}</li>
                <li>{1 tsp|1 tbsp} of {salt|sugar|paprika}</li>
                <li>{A handful of|A pinch of} {fresh herbs|spices}</li>
            </ul>
            <h3>Instructions</h3>
            <ol>
                <li>{First, preheat your oven to|Start by heating a pan on medium heat with} {350°F (175°C)|a drizzle of oil}.</li>
                <li>{In a large bowl, combine the|Mix together the} dry ingredients.</li>
                <li>{Gradually add the|Whisk in the} wet ingredients until {smooth|well combined}.</li>
                <li>{Pour the mixture into|Transfer the mixture to} a baking dish and {bake for 30 minutes|cook for 15-20 minutes}, or until golden brown.</li>
                <li>{Let it cool before serving|Serve immediately} with your favorite garnish.</li>
            </ol>
            <p>We {hope|trust} you {enjoy|love} this {fantastic|wonderful|delicious} <strong>${capitalizedTermForArticle}</strong> recipe. {Feel free|Don't hesitate} to {share it with your friends|leave a comment below}. {Happy cooking|Enjoy your meal|Bon appétit}!</p>
        `;

        // Proses Spintax dan tampilkan hasilnya
        detailBody.innerHTML = processSpintax(spintaxArticleTemplate);
    }

    function generateRelatedPosts(term) {
        const script = document.createElement('script');
        script.src = `https://suggestqueries.google.com/complete/search?jsonp=handleRelatedSuggest&hl=en&client=firefox&q=${encodeURIComponent(term)}`;
        document.head.appendChild(script);
        script.onload = () => script.remove();
        script.onerror = () => { relatedPostsContainer.innerHTML = '<div class="loading-placeholder">Could not load related recipes.</div>'; script.remove(); }
    }

    window.handleRelatedSuggest = function(data) {
        const suggestions = data[1];
        relatedPostsContainer.innerHTML = '';
        if (!suggestions || suggestions.length === 0) { relatedPostsContainer.closest('.related-posts-section').style.display = 'none'; return; }
        const originalKeyword = keyword.toLowerCase();
        let relatedCount = 0;
        suggestions.forEach(relatedTerm => {
            if (relatedTerm.toLowerCase() === originalKeyword || relatedCount >= 11) return;
            relatedCount++;
            const keywordForUrl = relatedTerm.replace(/\s/g, '-').toLowerCase();
            const linkUrl = `detail.html?q=${encodeURIComponent(keywordForUrl)}`;
            
            const imageUrl = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(relatedTerm)}&w=600&h=900&c=7&rs=1&p=0&dpr=1.5&pid=1.7`;
            const newRelatedTitle = generateSeoTitle(relatedTerm);
            const card = `<article class="content-card"><a href="${linkUrl}"><img src="${imageUrl}" alt="${newRelatedTitle}" loading="lazy"><div class="content-card-body"><h3>${newRelatedTitle}</h3></div></a></article>`;
            relatedPostsContainer.innerHTML += card;
        });
        if (relatedCount === 0) { relatedPostsContainer.closest('.related-posts-section').style.display = 'none'; }
    };

    populateMainContent(keyword);
    generateRelatedPosts(keyword);
});
