import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

interface BlogPost {
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  fullContent: string;
}

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  // --- Data ---
  const techStack = [
    'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Python', 'Django', 'Azure', 'Stripe API', 'Cloud Hosting'
  ];

  const trustPoints = [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>, text: 'Wexford Based' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>, text: 'Direct Communication' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 12.17l7.59-7.59L19 6l-9 9z"/></svg>, text: 'On-Time, On-Budget' },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24" aria-hidden="true"><path d="M7.41 8.59L6 10l-4-4 4-4 1.41 1.41L3.83 6l3.58 3.59zm9.18 6.82L18 14l4 4-4 4-1.41-1.41L19.17 18l-3.58-3.59zM14.5 3.5l-5 17 1 0.5 5-17-1-0.5z"/></svg>, text: 'Custom Code, Not Templates' }
  ];

  const blogPosts: BlogPost[] = [
    {
      slug: 'clear-communication-web-design-wexford',
      image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1920&auto=format&fit=crop',
      category: 'Web Design',
      title: 'From Dive Slates to Digital States: Clear Communication in Web Design',
      excerpt: "How my experience as a technical diver in Wexford, Ireland taught me the importance of clarity in custom software development and web design.",
      fullContent: `
        <p><em>By Kim Hanlon</em></p>
        <p>There's a surprising amount of overlap between explaining a complex dive plan to a student and walking a client through a new software feature. Both worlds can be filled with jargon and intricate details that feel overwhelming. My background in marine conservation and as a technical rebreather diver taught me one thing above all: clarity saves the day.</p>
        <p>In my former life, I conducted underwater surveys and taught advanced diving techniques. You can't afford miscommunication at 40 meters below the surface. Every instruction must be simple, direct, and unambiguous. This mindset is at the core of my approach to <strong>software development in Wexford</strong>.</p>
        <h3>The Connection to Web Design in Ireland</h3>
        <p>I bring this exact same discipline to every web design and development project. When a client in Ireland needs a new e-commerce site or a business application, they don't need a lecture on JavaScript frameworks. They need to understand how the digital tool will solve their problem, save them time, or increase their revenue.</p>
        <p>Just as I would confirm a diver's gas mix or decompression schedule, I now confirm a project's key objectives and deliverables in plain English. This focus on clear, simple communication ensures my clients are not just passive recipients of a product, but active, informed partners in its creation. It's the most valuable skill I have, and it's the foundation of every successful project I deliver.</p>
      `
    },
    {
      slug: 'safe-software-development-process-wexford',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop',
      category: 'Process',
      title: 'A Diver\'s Process: Building Reliable Software in Wexford',
      excerpt: "Technical diving requires a meticulous process to stay safe. I apply that same disciplined approach to software development for businesses across Ireland.",
       fullContent: `
        <p><em>By Kim Hanlon</em></p>
        <p>In technical scuba diving, rushing is not an option. Before ever hitting the water, we have detailed plans, equipment checks, and contingency strategies. Ascending too quickly causes decompression sickness, or 'the bends'. The same principle applies to building quality software. Skipping the planning phase to rush into coding is the fastest way to get a project 'bent'.</p>
        <p>As a developer providing <strong>web design in Wexford</strong>, I see this all the time. The temptation to just 'start building' is strong, but it leads to predictable problems.</p>
        <h3>Symptoms of a 'Bent' Software Project</h3>
        <ul>
          <li><strong>Bloated Code:</strong> Features are added haphazardly without a solid architectural plan.</li>
          <li><strong>Persistent Bugs:</strong> Rushed code is brittle. Fixing one issue often creates two more.</li>
          <li><strong>Blown Budgets & Timelines:</strong> The time 'saved' by skipping planning is lost tenfold during chaotic debugging phases.</li>
          <li><strong>Unhappy Clients:</strong> The final product fails to solve the core problem, because it was never properly understood.</li>
        </ul>
        <p>My structured process—from discovery and detailed proposals to regular check-ins—is my 'dive plan'. These are the non-negotiable safety procedures I use for every <strong>software development</strong> project in Ireland. It's how we ensure a robust, stable, and effective product that surfaces safely and on schedule.</p>
      `
    },
    {
      slug: 'website-for-irish-tradespeople',
      image: 'https://images.unsplash.com/photo-1581092921440-2a31a755e383?q=80&w=1920&auto=format&fit=crop',
      category: 'Local Business',
      title: 'Beyond Word of Mouth: Why Irish Tradespeople Need a Simple, Professional Website',
      excerpt: "Your skills are top-notch, but in 2024, a solid website is the most powerful tool in your toolbox for finding high-quality clients.",
      fullContent: `
        <p><em>By Kim Hanlon</em></p>
        <p>For generations, Irish plumbers, electricians, and carpenters have built successful businesses on reputation and word-of-mouth. And while that's still incredibly important, the way customers find services has changed. When a homeowner has a burst pipe, their first move isn't to ask a neighbour—it's to Google 'plumber near me'.</p>
        <h3>Your Website is Your Best Apprentice</h3>
        <p>Think of a simple, professional website as your 24/7 apprentice. It works tirelessly to:</p>
        <ul>
          <li><strong>Showcase Your Work:</strong> A gallery of your finished projects is more powerful than any business card. It builds instant trust and shows the quality of your craftsmanship.</li>
          <li><strong>Answer Questions:</strong> List your services, your service area, and your qualifications. This filters out tyre-kickers and brings you more qualified leads.</li>
          <li><strong>Provide Social Proof:</strong> Displaying testimonials from happy clients is the digital equivalent of a glowing recommendation.</li>
          <li><strong>Make Contact Easy:</strong> A clear phone number and a simple contact form mean potential clients can reach you instantly, even outside of business hours.</li>
        </ul>
        <p>You don't need a complex, expensive site. You need a clean, mobile-friendly online brochure that establishes your professionalism and makes it easy for Wexford and Southeast customers to hire you. It's a small investment that pays for itself with just one or two high-quality jobs.</p>
      `
    },
    {
      slug: 'musician-website-design-ireland-streaming',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1920&auto=format&fit=crop',
      category: 'Music Industry',
      title: 'Why Irish Musicians Need More Than Just Spotify: Building Your Digital Presence',
      excerpt: "From traditional music to electronic beats, Irish artists need websites that convert fans into paying customers and build lasting careers.",
      fullContent: `
        <p><em>By Kim Hanlon</em></p>
        <p>Streaming platforms pay artists roughly €0.003 per play. To make minimum wage from Spotify alone, you'd need about 3 million streams per month. For most Irish musicians, that's not realistic. But there's a better path: building your own digital ecosystem.</p>
        <p>Having worked with traditional Irish music dealers and modern artists, I've seen what works. The most successful musicians treat their website as the hub of their business, not an afterthought.</p>
        <h3>What Your Website Should Actually Do</h3>
        <p>Your website isn't just a digital business card. It's your direct line to fans who want to support you financially. This means e-commerce integration for merchandise, direct track sales, concert ticket links, and crucially—email capture for your biggest supporters.</p>
        <p>I've built systems that handle everything from vinyl pre-orders to VIP concert packages. The goal is giving fans multiple ways to support you while keeping 100% of the profits, not giving 30% to streaming platforms.</p>
        <p>The Irish music scene is incredibly supportive, but you need the right tools to convert that goodwill into sustainable income. A properly built website does exactly that.</p>
      `
    },
    {
      slug: 'artisan-food-business-ecommerce-ireland',
      image: 'https://images.unsplash.com/photo-1556909114-4c3c1c9c2e90?q=80&w=1920&auto=format&fit=crop',
      category: 'Food & Craft',
      title: 'From Farmers Markets to Online Orders: Scaling Irish Artisan Food Businesses',
      excerpt: "How small-batch food producers in Ireland can use custom e-commerce to reach customers nationwide while maintaining their artisanal quality.",
      fullContent: `
        <p><em>By Kim Hanlon</em></p>
        <p>The artisan food scene in Ireland is booming, but most producers are stuck selling at local markets or through expensive third-party platforms. The leap from weekend markets to sustainable online business requires more than just listing products on Etsy.</p>
        <p>Working with family food businesses taught me that artisan producers have unique challenges: limited batch sizes, seasonal ingredients, complex shipping requirements, and the need to tell their story authentically.</p>
        <h3>Why Generic E-commerce Platforms Don't Work</h3>
        <p>Shopify templates can't handle "only 12 jars available this week" or "ships only within Ireland due to dairy regulations." Artisan businesses need custom inventory management, automatic stock limits, regional shipping controls, and subscription systems for regular customers.</p>
        <p>I've built systems that handle everything from automatic low-stock notifications to seasonal product scheduling. One client went from €2,000 monthly market sales to €15,000 monthly online revenue by properly showcasing their products and streamlining the buying process.</p>
        <p>The key is building a system that scales with your production capacity, not against it. Your website should feel as personal and high-quality as your products.</p>
      `
    },
    {
      slug: 'therapist-practice-management-software-ireland',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1920&auto=format&fit=crop',
      category: 'Healthcare',
      title: 'GDPR-Compliant Practice Management for Irish Therapists and Counsellors',
      excerpt: "How mental health professionals in Ireland can streamline their practice with secure, compliant booking and client management systems.",
      fullContent: `
        <p><em>By Kim Hanlon</em></p>
        <p>Managing a private therapy practice involves more admin work than most professionals expect. Between GDPR compliance, secure client records, appointment scheduling, and payment processing, the technical requirements can be overwhelming.</p>
        <p>I've worked with several Irish mental health professionals to build custom practice management systems that handle the unique requirements of therapeutic work while maintaining strict privacy standards.</p>
        <h3>What Therapists Actually Need</h3>
        <p>Generic booking systems don't understand the nuances of therapeutic practice. You need encrypted client notes, automatic appointment reminders that don't mention "therapy," GDPR-compliant data handling, and secure payment processing for both sessions and packages.</p>
        <p>The system should also handle sliding scale fees, insurance claim documentation, and detailed reporting for professional supervision requirements—all while being simple enough to use during busy practice days.</p>
        <p>Most importantly, everything must be hosted within EU servers to comply with GDPR. Many international platforms can't guarantee this, putting Irish practitioners at legal risk.</p>
        <p>I focus on building systems that handle the technical complexity while letting therapists focus entirely on their clients. The admin burden shouldn't interfere with providing quality care.</p>
      `
    }
  ];

  // --- Handlers ---
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const navigateTo = (page: string, postSlug: string | null = null) => {
    setCurrentPage(page);
    if (page === 'post' && postSlug) {
      const post = blogPosts.find(p => p.slug === postSlug);
      setCurrentPost(post || null);
    } else {
      setCurrentPost(null);
    }
    closeMenu();
    window.scrollTo(0, 0);
  };

  const navigateToHash = (hash: string) => {
    setCurrentPage('home');
    setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
            element.scrollIntoView();
        }
    }, 0);
    closeMenu();
  };

  // --- Scroll animations ---
  useEffect(() => {
    if (currentPage !== 'home') return;
    const sections = document.querySelectorAll('.section');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));
    return () => sections.forEach(section => sectionObserver.unobserve(section));
  }, [currentPage]);

  // --- Components ---
  const HomePage = () => (
    <>
      {/* Hero Section */}
      <section className="hero section" id="home">
        <div className="container hero-content">
          <h1 className="hero-title">
            <span style={{whiteSpace: 'nowrap'}}>Software that just works.</span><br />No jargon, no excuses.
          </h1>
          <p className="hero-subtitle">
            Hi, I'm Kim, a software developer based in Wexford. I build custom web
            applications for Irish businesses that need reliable, high-quality
            digital tools.
          </p>
          <div className="hero-cta">
            <a href="#work" onClick={(e) => { e.preventDefault(); navigateToHash('#work'); }} className="btn btn-primary">See My Work</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); navigateToHash('#contact'); }} className="btn btn-secondary">Start a Conversation</a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar" aria-label="Trust Points">
        <div className="trust-bar-scroller">
            {[...trustPoints, ...trustPoints].map((item, index) => (
              <div className="trust-item" key={index}>
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
        </div>
      </div>
      
      {/* About Kim Section */}
      <section className="section about-kim-section" id="about-kim">
        <div className="container about-kim-container">
          <img src="/kimfaceli.jpeg" alt="Kim, software developer" className="profile-pic" />
          <div className="about-kim-text">
            <h2 className="section-title">Meet Kim</h2>
            <p className="section-subtitle">
              Azure-certified full-stack developer specializing in React, Django, and cloud-deployed applications.
            </p>
            <p>
              I build custom software solutions for businesses across Ireland and internationally. Available for in-person meetings throughout Ireland or remote collaboration anywhere in the world. My background spans marine conservation and modern software development—a combination that brings methodical problem-solving to every project.
            </p>
          </div>
        </div>
      </section>
      
      {/* Why Work With Me Section */}
      <section className="section section-alt" id="about">
        <div className="container about-container">
          <div className="about-text">
            <h2 className="section-title">Why work with me?</h2>
            <p className="section-subtitle">
              You get a dedicated partner who is invested in your success.
            </p>
            <div className="about-points">
              <div className="about-point">
                <h3>You talk to the developer. Directly.</h3>
                <p>
                  No project managers or salespeople. You have a direct line to
                  me, the person actually writing the code. This means clearer
                  communication and faster results.
                </p>
              </div>
              <div className="about-point">
                <h3>Practical solutions, not buzzwords.</h3>
                <p>
                  I focus on building what you actually need to solve your
                  problem and grow your business—no unnecessary features or
                  over-engineered tech.
                </p>
              </div>
              <div className="about-point">
                <h3>Fixed prices. No surprises.</h3>
                <p>
                  You'll receive a detailed, fixed-price quote before we start.
                  The price we agree on is the price you pay. Period.
                </p>
              </div>
            </div>
          </div>
          <div className="about-image" />
        </div>
      </section>
      
      {/* Services Section */}
      <section className="section" id="services">
        <div className="container">
          <h2 className="section-title">What I Build</h2>
          <p className="section-subtitle">
            Robust, tailor-made digital tools that give your business an edge.
          </p>
          <div className="services-grid">
            <div className="service-card">
              <h3>E-Commerce Stores</h3>
              <p>
                High-performance online shops that are easy to manage and provide a
                seamless experience for your customers, from browsing to checkout.
              </p>
            </div>
            <div className="service-card">
              <h3>Custom Business Apps</h3>
              <p>
                Booking systems, client dashboards, inventory managers—whatever
                your business needs to run more smoothly, I can build it.
              </p>
            </div>
            <div className="service-card">
              <h3>Automation Tools</h3>
              <p>
                Tired of repetitive manual tasks? I create custom scripts and
                integrations that save you time and let you focus on what matters.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tech Toolkit Section */}
      <section className="section section-alt" id="toolkit">
          <div className="container">
              <h2 className="section-title">My Toolkit</h2>
              <p className="section-subtitle">
                  I use modern, proven technologies to build reliable and scalable software.
              </p>
              <div className="toolkit-grid">
                  {techStack.map((tech, index) => (
                      <div className="toolkit-item" key={index}>
                          {tech}
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Portfolio Section */}
      <section className="section" id="work">
        <div className="container">
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            Real results for real Irish businesses.
          </p>
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <div className="portfolio-image music" />
              <div className="portfolio-content">
                <span className="portfolio-type">E-Commerce</span>
                <h3>Music Dealer Goes Digital</h3>
                <p>
                  Brought a 92-year-old music dealer's traditional Irish music
                  collection online, shipping CDs worldwide.
                </p>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-image diving" />
              <div className="portfolio-content">
                <span className="portfolio-type">Booking System</span>
                <h3>Dive Center Transformation</h3>
                <p>
                  Replaced handwritten ledgers with a cloud-based booking system
                  that manages 200+ reservations a month.
                </p>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-image neural" />
              <div className="portfolio-content">
                <span className="portfolio-type">Automation</span>
                <h3>Retail Inventory Automation</h3>
                <p>
                  Eliminated spreadsheet chaos with a real-time inventory
                  tracker that saved the owner 10+ hours a week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section section-alt" id="process">
        <div className="container">
          <h2 className="section-title">My Simple Process</h2>
          <p className="section-subtitle">
            A straightforward path from idea to finished product.
          </p>
          <div className="process-steps">
            <div className="process-step">
              <div className="process-number">1</div>
              <div className="process-text">
                <h3>Discovery Call</h3>
                <p>
                  A 30-minute chat where we discuss your project. I listen, you
                  talk. It's that simple.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-number">2</div>
              <div className="process-text">
                <h3>The Proposal</h3>
                <p>
                  You get a clear, detailed proposal with a fixed price and
                  timeline. No jargon, no surprises.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-number">3</div>
              <div className="process-text">
                <h3>The Build</h3>
                <p>
                  I get to work building your software. You'll get regular
                  updates so you're always in the loop.
                </p>
              </div>
            </div>
            <div className="process-step">
              <div className="process-number">4</div>
              <div className="process-text">
                <h3>Launch & Support</h3>
                <p>
                  We go live. I'll make sure you're comfortable using your new
                  tool, and I'm here for support after.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Teaser Section */}
      <section className="section" id="blog-teaser">
        <div className="container">
          <h2 className="section-title">The Developer's Notebook</h2>
          <p className="section-subtitle">
            Insights on software development, project management, and building reliable systems.
          </p>
          <div className="blog-grid">
            {blogPosts.slice(0, 3).map((post, index) => (
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('post', post.slug); }} className="blog-card" key={index}>
                <div className="blog-image" style={{backgroundImage: `url(${post.image})`}} />
                <div className="blog-content">
                  <span className="blog-category">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
           <div className="view-all-btn-container">
             <button onClick={() => navigateTo('blog')} className="btn btn-secondary">Read More</button>
           </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-alt" id="faq">
          <div className="container faq-container">
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="faq-grid">
                  <div className="faq-item">
                      <button 
                          className="faq-question" 
                          type="button"
                          onClick={() => {
                            const answer = document.getElementById('faq-0');
                            const icon = document.getElementById('faq-icon-0');
                            if (answer && icon) {
                              if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
                                answer.style.maxHeight = '300px';
                                icon.textContent = '−';
                              } else {
                                answer.style.maxHeight = '0px';
                                icon.textContent = '+';
                              }
                            }
                          }}
                      >
                          <span>Do you only work with businesses in Wexford?</span>
                          <span className="faq-icon" id="faq-icon-0">+</span>
                      </button>
                      <div 
                        id="faq-0"
                        className="faq-answer" 
                        style={{ 
                          maxHeight: '0px',
                          overflow: 'hidden',
                          transition: 'max-height 0.3s ease'
                        }}
                      >
                          <p style={{padding: '1rem 0'}}>Not at all. While I'm proud to be based in Wexford, I work with clients all across Ireland and internationally. Modern tools make remote collaboration seamless, but I'm always happy to meet for coffee if you're local.</p>
                      </div>
                  </div>

                  <div className="faq-item">
                      <button 
                          className="faq-question" 
                          type="button"
                          onClick={() => {
                            const answer = document.getElementById('faq-1');
                            const icon = document.getElementById('faq-icon-1');
                            if (answer && icon) {
                              if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
                                answer.style.maxHeight = '300px';
                                icon.textContent = '−';
                              } else {
                                answer.style.maxHeight = '0px';
                                icon.textContent = '+';
                              }
                            }
                          }}
                      >
                          <span>What does 'custom' software actually mean?</span>
                          <span className="faq-icon" id="faq-icon-1">+</span>
                      </button>
                      <div 
                        id="faq-1"
                        className="faq-answer" 
                        style={{ 
                          maxHeight: '0px',
                          overflow: 'hidden',
                          transition: 'max-height 0.3s ease'
                        }}
                      >
                          <p style={{padding: '1rem 0'}}>It means I build your software from the ground up to fit your exact needs. It's not a pre-built template or a WordPress theme. It's a solution designed specifically for your business challenges.</p>
                      </div>
                  </div>

                  <div className="faq-item">
                      <button 
                          className="faq-question" 
                          type="button"
                          onClick={() => {
                            const answer = document.getElementById('faq-2');
                            const icon = document.getElementById('faq-icon-2');
                            if (answer && icon) {
                              if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
                                answer.style.maxHeight = '300px';
                                icon.textContent = '−';
                              } else {
                                answer.style.maxHeight = '0px';
                                icon.textContent = '+';
                              }
                            }
                          }}
                      >
                          <span>How much does a project typically cost?</span>
                          <span className="faq-icon" id="faq-icon-2">+</span>
                      </button>
                      <div 
                        id="faq-2"
                        className="faq-answer" 
                        style={{ 
                          maxHeight: '0px',
                          overflow: 'hidden',
                          transition: 'max-height 0.3s ease'
                        }}
                      >
                          <p style={{padding: '1rem 0'}}>It varies. A simple, beautiful static website to get you online starts at €950. A more complex custom web application could range from €3,000 to €10,000+. After our discovery call, I provide a detailed, fixed-price quote so there are no surprises.</p>
                      </div>
                  </div>

                  <div className="faq-item">
                      <button 
                          className="faq-question" 
                          type="button"
                          onClick={() => {
                            const answer = document.getElementById('faq-3');
                            const icon = document.getElementById('faq-icon-3');
                            if (answer && icon) {
                              if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
                                answer.style.maxHeight = '300px';
                                icon.textContent = '−';
                              } else {
                                answer.style.maxHeight = '0px';
                                icon.textContent = '+';
                              }
                            }
                          }}
                      >
                          <span>What if I need support after the project is finished?</span>
                          <span className="faq-icon" id="faq-icon-3">+</span>
                      </button>
                      <div 
                        id="faq-3"
                        className="faq-answer" 
                        style={{ 
                          maxHeight: '0px',
                          overflow: 'hidden',
                          transition: 'max-height 0.3s ease'
                        }}
                      >
                          <p style={{padding: '1rem 0'}}>All projects include 30 days of free support to fix any bugs. For anything more, I offer flexible, no-contract monthly retainers for ongoing maintenance, updates, and peace of mind.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Contact Section */}
      <section className="section section-alt" id="contact">
          <div className="container contact-container">
              <h2 className="section-title">Ready to build something great?</h2>
              <p className="section-subtitle">Let's have a chat. No sales pitch, just a conversation about your project and how I can help.</p>
              <div className="contact-details">
                <a href="mailto:kim@devdactyl.ie?subject=Project Inquiry from Devdactyl Website" className="btn btn-primary btn-large">kim@devdactyl.ie</a>
              </div>
          </div>
      </section>
    </>
  );

  const BlogListPage = () => (
    <section className="section blog-page" id="blog">
      <div className="container">
        <div className="blog-page-header">
          <h1 className="section-title">The Developer's Notebook</h1>
          <p className="section-subtitle">
            Thoughts on software development, clear communication, and building things that last.
          </p>
        </div>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('post', post.slug); }} className="blog-card" key={index}>
              <div className="blog-image" style={{backgroundImage: `url(${post.image})`}} />
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );

  const BlogPostPage = () => {
    if (!currentPost) return <HomePage />;
    return (
      <section className="section blog-post-page">
        <div className="container blog-post-container">
          <button onClick={() => navigateTo('blog')} className="back-to-blog-btn">← Back to Blog</button>
          <div className="blog-post-header">
            <span className="blog-category">{currentPost.category}</span>
            <h1>{currentPost.title}</h1>
          </div>
          <img src={currentPost.image} alt={currentPost.title} className="blog-post-image" />
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: currentPost.fullContent }} />
          
          {/* Call to Action */}
          <div className="blog-post-cta">
            <div className="blog-cta-content">
              <h3>Need custom software for your business?</h3>
              <p>Let's discuss how I can help solve your specific challenges with tailored solutions.</p>
              <a href="mailto:kim@devdactyl.ie?subject=Project Inquiry from Blog" className="btn btn-primary">Get In Touch</a>
            </div>
          </div>
          
          {/* Bottom Navigation */}
          <div className="blog-post-navigation">
            <button onClick={() => navigateTo('blog')} className="btn btn-secondary">← Back to Blog</button>
            <button onClick={() => navigateTo('home')} className="btn btn-secondary">Home</button>
          </div>
        </div>
      </section>
    );
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'blog': return <BlogListPage />;
      case 'post': return <BlogPostPage />;
      default: return <HomePage />;
    }
  };

  return (
    <>
      <nav className="nav">
        <div className="container nav-container">
          <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="logo">devdactyl</a>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#services" onClick={(e) => { e.preventDefault(); navigateToHash('#services'); }}>What I Build</a>
            <a href="#work" onClick={(e) => { e.preventDefault(); navigateToHash('#work'); }}>My Work</a>
            <a href="#process" onClick={(e) => { e.preventDefault(); navigateToHash('#process'); }}>Process</a>
            <a href="#blog" onClick={(e) => { e.preventDefault(); navigateTo('blog'); }}>Blog</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); navigateToHash('#contact'); }}>Contact</a>
          </div>
          <button className="mobile-menu-btn" aria-label="Toggle Menu" aria-expanded={isMenuOpen} onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <main>{renderPage()}</main>

      <footer className="footer">
          <div className="container footer-grid">
              <div className="footer-col">
                  <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="logo">devdactyl</a>
                  <p className="footer-tagline">Custom software, simplified.</p>
                  <div className="social-links">
                      <a href="https://www.linkedin.com/in/yourprofile" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                      <a href="https://github.com/yourusername" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </a>
                      <a href="https://instagram.com/yourusername" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
                      </a>
                  </div>
              </div>
              <div className="footer-col">
                  <h3>Quick Links</h3>
                  <a href="#services" onClick={(e) => { e.preventDefault(); navigateToHash('#services'); }}>What I Build</a>
                  <a href="#work" onClick={(e) => { e.preventDefault(); navigateToHash('#work'); }}>My Work</a>
                  <a href="#process" onClick={(e) => { e.preventDefault(); navigateToHash('#process'); }}>Process</a>
                  <a href="#blog" onClick={(e) => { e.preventDefault(); navigateTo('blog'); }}>Blog</a>
              </div>
              <div className="footer-col">
                  <h3>Contact</h3>
                  <a href="mailto:kim@devdactyl.ie">kim@devdactyl.ie</a>
                  <a href="tel:+353894807998">+353 89 480 7998</a>
                  <span>Wexford, Ireland</span>
              </div>
          </div>
          <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Devdactyl. All rights reserved.</p>
          </div>
      </footer>
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
