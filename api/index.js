const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const imgDir = path.join(__dirname, '..', 'public', 'img');
  fs.readdir(imgDir, (err, files) => {
    if (err) {
      res.status(500).send('Error reading image directory.');
      return;
    }

    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const images = files.filter(file => imageExtensions.includes(path.extname(file).toLowerCase()));

    let itemsHTML = '';
    images.forEach(file => {
      const title = path.basename(file, path.extname(file))
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      itemsHTML += `
        <div class="item">
          <a href="#">
            <img src="img/${file}">
          </a>
        </div>
      `;
    });

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

      <!-- Lightbox -->
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

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  });
};