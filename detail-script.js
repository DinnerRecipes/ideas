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

        const imageUrl = `https://tse1.mm.bing.net/th?q=${encodeURIComponent(term)}&w=1200&h=800&c=7&rs=1&p=0&dpr=1.5&pid=1.7`;
        detailImageContainer.innerHTML = `<img src="${imageUrl}" alt="${newTitle}">`;

        // ▼▼▼ ARTIKEL BARU: Template artikel dengan format Spintax ▼▼▼
        const spintaxArticleTemplate = `
            <p>{Welcome|Hello, food lovers|Greetings, home cooks} to our blog! {This time|On this occasion|In this article}, we will {explore|share|discover} various {delicious and inspiring|mouth-watering and creative|simple and tasty} ideas for <strong>${capitalizedTermForArticle}</strong>.
            {Finding|Discovering} the {right|perfect|suitable} inspiration for <strong>${capitalizedTermForArticle}</strong> {can sometimes be a challenge|is often easier said than done|requires a bit of culinary creativity}.
            {That's why|Therefore}, we've {curated|gathered|presented} {a variety of|several} of the {tastiest concepts|most exciting ideas} for {you|our loyal readers}.</p>

            <h3>{Key Elements|Main Focus|Crucial Details} in ${capitalizedTermForArticle}</h3>
            <p>To {achieve|create|cook up} the {best|most delicious|most satisfying} results with your <strong>${capitalizedTermForArticle}</strong>, there are {several things|a few key aspects} that {need your attention|you should focus on}.
            {From|Whether it's} the {ingredient selection|choice of produce}, {cooking technique|preparation method}, to the {final presentation|plating}, everything {plays a crucial role|is highly influential|contributes significantly}.
            {Let's look at|Here are} some {more detailed|specific} {ideas|concepts|inspirations}:</p>

            <h4>1. {The Freshest|High-Quality|Perfect} {Ingredients|Components}</h4>
            <p>{The foundation of|The secret to} any great dish is its ingredients.
            For <strong>${capitalizedTermForArticle}</strong>, {you might consider|try using} {seasonal vegetables and fruits|locally sourced meats and dairy|high-quality pantry staples} to {create|achieve} a taste that is {fresh and vibrant|rich and comforting|authentic and flavorful}.</p>

            <h4>2. {Essential|The Right|Proper} {Kitchen Tools|Equipment}</h4>
            <p>{Beyond the recipe, your tools|Not just about ingredients, your equipment} must also be {up to the task|considered}.
            {Choose|Select} equipment that {not only makes the job easier|is suitable for} the <strong>${capitalizedTermForArticle}</strong> but also {ensures the best results|is efficient and reliable}.
            {For instance|For example}, a {sharp chef's knife|heavy-bottomed skillet|powerful blender} can be a {game-changer|cook's best friend}.</p>

            <h4>3. {Mastering|The Art of|Perfecting} the Technique</h4>
            <p>{The right technique can|Proper cooking methods} {elevate your dish|make all the difference}.
            {Consider mastering techniques|Combine different methods} like {sautéing, roasting, and braising|grilling, searing, and baking}.
            This {creates layers of flavor and texture|adds a professional touch} to your <strong>${capitalizedTermForArticle}</strong>.</p>

            <h4>4. {Flavorful|Balanced|Bold} Seasoning</h4>
            <p>{Don't underestimate|Never forget} the power of seasoning. {Herbs, spices, salt, and acid|Spices, aromatics, and sweeteners} {add depth, complexity, and balance|are essential for a complete flavor profile}.
            {Opt for|Choose} seasonings and flavor combinations that {complement|enhance} your main <strong>${capitalizedTermForArticle}</strong> ingredients.</p>
			
			<h4>5. {Appetizing|Beautiful|Creative} Plating & Presentation</h4>
            <p>{Bare plates are a missed opportunity|We eat with our eyes first}.
            {A thoughtful arrangement, a sprinkle of fresh herbs, or a drizzle of sauce|Color contrast, varied textures, and elegant dinnerware} can {serve as a focal point|add a touch of class}.
            Good presentation also {makes the meal feel more special|enhances the dining experience}.</p>

            <h4>6. {Healthy|Nutritious|Balanced} Twists</h4>
            <p>{Delicious food can also be healthy|Good flavor doesn't have to be unhealthy}.
            {Whether it's swapping refined grains for whole ones or adding more vegetables|From reducing sugar to choosing leaner proteins}, a healthy twist {can make you feel good about what you're eating|instantly boosts the nutritional value}.
            This is a simple yet effective <strong>${capitalizedTermForArticle}</strong> trick.</p>

            <h4>7. {Smart|Efficient|Savvy} Meal Prep</h4>
            <p>{A well-planned meal is an easy meal|Chaos can ruin a good recipe}.
            {Integrate smart meal prep solutions|Choose recipes that are great for making ahead}.
            {Think batch cooking, pre-chopping vegetables, or making sauces in advance|Consider freezer-friendly meals, marinating proteins overnight, or organizing your ingredients} to keep things {organized and stress-free|neat and tidy}.</p>

            <h4>8. {Add|A Dash of|Your} Personal Flair</h4>
            <p>{Finally, make the recipe yours|The final step is to add a personal touch}.
            {Incorporate ingredients that tell your story|Showcase your unique taste}. {This could be a secret family spice, a favorite hot sauce, a squeeze of fresh citrus, or a unique garnish|Think a special herb from your garden, a regional ingredient, or a cherished cooking method}.
            These details make your <strong>${capitalizedTermForArticle}</strong> {truly unique|one-of-a-kind}.</p>

            <h3>{Conclusion|Final Thoughts|Wrapping It Up}</h3>
            <p>{So there you have it|And that's a wrap}—several {ideas and inspirations|delicious concepts|tips and tricks} for <strong>${capitalizedTermForArticle}</strong> that {you can try|can serve as your guide in the kitchen}.
            {Remember, the key is|The most important thing to remember is} {creativity and tasting as you go|being bold and experimenting with flavors}.
            {Don't be afraid to|Feel free to} {mix and match|combine} different elements to {achieve|create} a final dish that {truly|fully} {represents your style|satisfies your cravings}.</p>

            <p>{Happy cooking|Enjoy your meal}!</p>
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
