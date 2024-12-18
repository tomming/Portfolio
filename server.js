const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files from the public folder (CSS, JS, images)
app.use(express.static('public'));

app.get('/', (req, res) => {
  const imgDir = path.join(__dirname, 'public', 'img');

  fs.readdir(imgDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading image directory.');
    }

    // Filter image files by extension
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    // Generate HTML for each image
    let itemsHTML = '';
    imageFiles.forEach(file => {
      const title = path.basename(file, path.extname(file))
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

    //   itemsHTML += `
    //     <div class="item">
    //       <a href="#">
    //         <img src="img/${file}" alt="${title}">
    //         <div class="overlay">
    //           <span class="title">${title}</span>
    //         </div>
    //       </a>
    //     </div>
    //   `;
        itemsHTML += `
            <div class="item">
                <a href="#">
                    <img src="img/${file}" alt="${title}">
                </a>
            </div>
        `;
    });

    // Full HTML page with lightbox structure
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Weng Kin's Portfolio</title>
      <link rel="stylesheet" href="styles.css"/>
    </head>
    <body>
      <header>
        <div class="container">
          <div class="logo">Weng Kin</div>
          <nav>
            <ul>
              <li><a href="#">Work</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div class="container">
          <section class="portfolio-grid">
            ${itemsHTML}
          </section>
        </div>
      </main>

      <!-- Lightbox Structure -->
      <div class="lightbox" id="lightbox">
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <img class="lightbox-image" src="" alt="">
        </div>
      </div>

      <script src="script.js"></script>
    </body>
    </html>
    `;
    
    res.send(html);
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
