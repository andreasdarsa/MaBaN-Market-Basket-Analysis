
// Original design: show all visualizations at once
document.addEventListener('DOMContentLoaded', function() {
    const visuals = [
        {
            endpoint: '/api/visualize/heatmap',
            alt: 'Heatmap Visualization',
            title: 'Heatmap'
        },
        {
            endpoint: '/api/visualize/frequent_items?n=10',
            alt: 'Frequent Items Visualization',
            title: 'Frequent Items'
        },
        {
            endpoint: '/api/visualize/rules_network',
            alt: 'Rules Network Visualization',
            title: 'Rules Network'
        },
        {
            endpoint: '/api/visualize/scatter_lift_support',
            alt: 'Scatter Plot Visualization',
            title: 'Scatter Plot'
        }
    ];

    const container = document.getElementById('graphs-section');
    if (!container) {
        console.error('Visuals container not found!');
        return;
    }

    visuals.forEach(visual => {
        // Create a wrapper for each visual
        const wrapper = document.createElement('div');
        wrapper.className = 'visual-slide';
        // Title
        const title = document.createElement('h3');
        title.textContent = visual.title;
        wrapper.appendChild(title);
        // Image placeholder
        const img = document.createElement('img');
        img.alt = visual.alt;
        img.className = 'visual-img';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        wrapper.appendChild(img);
        // Append wrapper to container
        container.appendChild(wrapper);

        // Fetch image
        fetch(visual.endpoint)
            .then(response => response.json())
            .then(data => {
                if (data.image) {
                    img.src = 'data:image/png;base64,' + data.image;
                } else {
                    img.alt = 'No image data received';
                }
            })
            .catch(error => {
                img.alt = 'Error loading image';
                console.error('Error fetching', visual.alt, ':', error);
            });
    });
});
