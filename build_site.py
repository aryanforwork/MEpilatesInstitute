import os
import re
import markdown

# Setup paths
CONTEXT_DIR = "/Users/apple/Desktop/ME Pilates institute/context"
CONTENT_DIR = os.path.join(CONTEXT_DIR, "06-content")
BUILD_DIR = os.path.join(CONTEXT_DIR, "09-build")

# HTML Template
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">
    <!-- SCHEMA_PLACEHOLDER -->
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <header class="site-header">
        <div class="container nav-container">
            <a href="index.html" class="logo">ME Pilates</a>
            <nav class="site-nav">
                <!-- LINKING_PLACEHOLDER -->
                <ul class="nav-list">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about-us.html">About</a></li>
                    <li><a href="pilates-studio-dehradun.html">Studio</a></li>
                    <li><a href="pilates-classes-dehradun.html">Classes</a></li>
                    <li><a href="pilates-teacher-training-dehradun.html">Teacher Training</a></li>
                    <li><a href="pricing.html">Pricing</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="contact-us.html" class="btn btn-primary">Contact Us</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="main-content">
        {hero_section}
        
        <section class="content-section">
            <div class="container">
                {content}
            </div>
        </section>

        {form_section}
    </main>

    <footer class="site-footer" style="background-image: url('assets/images/footer_bg.jpg');">
        <div class="container footer-container">
            <div class="footer-col">
                <h3>ME Pilates Institute</h3>
                <p>Dehradun's premier Pilates studio.</p>
            </div>
            <div class="footer-col">
                <h4>Quick Links</h4>
                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about-us.html">About</a></li>
                    <li><a href="pilates-classes-dehradun.html">Classes</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="blog.html">Blog</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <p>+91-8077978450</p>
                <p>Contact@MEpilatesInstitute.com</p>
                <p>Indira Nagar Colony, Dehradun</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 ME Pilates Institute. All Rights Reserved.</p>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
"""

FORM_HTML = """
<section class="enquiry-section" id="enquiry">
    <div class="container form-container">
        <div class="form-content">
            <h2>Start Your Journey Today</h2>
            <p>Ready to transform your movement? We're here to help you begin your journey. We aim to reply within 2 hours during studio hours.</p>
            <p>🔒 Your information is secure.</p>
        </div>
        <div class="form-wrapper card">
            <form id="enquiry-form" class="enquiry-form">
                <div class="form-group">
                    <label for="fullName">Full Name *</label>
                    <input type="text" id="fullName" name="fullName" placeholder="e.g., Aditi Sharma" required minlength="2">
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" placeholder="+91 xxxxx xxxxx" required pattern="^[6-9]\\d{9}$">
                </div>
                <div class="form-group">
                    <label for="email">Email Address *</label>
                    <input type="email" id="email" name="email" placeholder="yourname@example.com" required>
                </div>
                <div class="form-group">
                    <label for="interest">Area of Interest *</label>
                    <select id="interest" name="interest" required>
                        <option value="">Select an option</option>
                        <option value="classes">Pilates & Yoga Classes</option>
                        <option value="private">Private Sessions</option>
                        <option value="training">200-Hour Teacher Training</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="contactTime">Preferred Contact Time</label>
                    <select id="contactTime" name="contactTime">
                        <option value="morning">Morning (8 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 8 PM)</option>
                        <option value="anytime">Anytime</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message">Message / Specific Goals</label>
                    <textarea id="message" name="message" placeholder="Tell us about your fitness goals or any injuries..." maxlength="500"></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Book My Session</button>
            </form>
        </div>
    </div>
</section>
"""

# Map internal files to final output URLs
URL_MAP = {
    "home.md": "index.html",
    "about.md": "about-us.html",
    "studio.md": "pilates-studio-dehradun.html",
    "classes.md": "pilates-classes-dehradun.html",
    "teacher-training.md": "pilates-teacher-training-dehradun.html",
    "gallery.md": "gallery.html",
    "pricing.md": "pricing.html",
    "contact.md": "contact-us.html",
    "faq.md": "faq.html",
    "blog.md": "blog.html"
}

def parse_md(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter
    title = ""
    description = ""
    match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if match:
        frontmatter = match.group(1)
        markdown_body = match.group(2)
        
        for line in frontmatter.split('\n'):
            if line.startswith('title:'):
                title = line.replace('title:', '').strip()
            elif line.startswith('description:'):
                description = line.replace('description:', '').strip()
    else:
        markdown_body = content

    # Convert markdown to html
    html_content = markdown.markdown(markdown_body, extensions=['tables', 'fenced_code'])
    
    # Let's customize FAQs to have accordion classes
    # If we see H3 questions, we can wrap them
    if "Frequently Asked Questions" in html_content or "FAQ" in title:
        html_content = html_content.replace('<h3>', '<h3 class="faq-question">')
        
    return title, description, html_content

def build_site():
    for md_file in os.listdir(CONTENT_DIR):
        if md_file.endswith('.md'):
            # Some files might be missing (faq, blog)
            pass

    # Actually let's just make sure all 10 are generated
    for md_name, html_name in URL_MAP.items():
        md_path = os.path.join(CONTENT_DIR, md_name)
        if not os.path.exists(md_path):
            # Create a placeholder if not exists (faq.md, blog.md etc)
            title = md_name.replace('.md', '').capitalize()
            description = "Welcome to " + title
            html_content = f"<h1>{title}</h1><p>Content coming soon.</p>"
        else:
            title, description, html_content = parse_md(md_path)
            
        hero_section = ""
        form_section = ""
        
        if md_name in ["home.md", "contact.md"]:
            form_section = FORM_HTML
            
        if md_name == "home.md":
            hero_section = f'''
            <section class="hero-section" style="background-image: url('assets/images/hero_desktop.jpg');">
                <div class="container hero-content">
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <a href="#enquiry" class="btn btn-primary">Book Your Introductory Session</a>
                </div>
            </section>
            '''

        final_html = HTML_TEMPLATE.format(
            title=title,
            description=description,
            hero_section=hero_section,
            content=html_content,
            form_section=form_section
        )

        with open(os.path.join(BUILD_DIR, html_name), 'w', encoding='utf-8') as f:
            f.write(final_html)

if __name__ == "__main__":
    build_site()
