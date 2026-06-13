import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Building2, 
  GraduationCap, 
  Waves, 
  Church, 
  Vote, 
  Cpu, 
  Globe, 
  Sparkles,
  Check,
  ArrowRight,
  Stethoscope,
  Users,
  Calendar,
  DollarSign,
  Zap,
  Shield,
  Code2,
  Database,
  Cloud,
  Smartphone,
  Layers,
  TrendingUp
} from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PageBanner } from '@/components/PageBanner';

gsap.registerPlugin(ScrollTrigger);

const softwareProducts = [
  {
    icon: Stethoscope,
    name: 'Clinic Management System',
    shortName: 'ClinicPro',
    description: 'Complete healthcare management solution for clinics and medical practices. Streamline patient records, appointments, billing, and prescriptions.',
    features: [
      'Patient registration & records',
      'Appointment scheduling',
      'Electronic prescriptions',
      'Billing & invoicing',
      'Lab results management',
      'SMS reminders'
    ],
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    image: 'clinic'
  },
  {
    icon: GraduationCap,
    name: 'School Management System',
    shortName: 'EduWave',
    description: 'Comprehensive school administration platform for educational institutions of all sizes. Manage students, staff, and operations efficiently.',
    features: [
      'Student enrollment & records',
      'Attendance tracking',
      'Grade management',
      'Fee collection',
      'Parent portal',
      'Report cards'
    ],
    color: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    image: 'school'
  },
  {
    icon: Waves,
    name: 'Beach Management Unit',
    shortName: 'BeachGuard',
    description: 'Specialized solution for managing beach operations, safety, and visitor services with real-time monitoring.',
    features: [
      'Visitor registration',
      'Safety incident tracking',
      'Lifeguard scheduling',
      'Revenue collection',
      'Equipment management',
      'Reporting & analytics'
    ],
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-600',
    image: 'beach'
  },
  {
    icon: Church,
    name: 'Church Management System',
    shortName: 'ChurchHub',
    description: 'Digital solution for churches to manage members, events, donations, and communications effectively.',
    features: [
      'Member database',
      'Event management',
      'Donation tracking',
      'Group management',
      'SMS/email communications',
      'Financial reports'
    ],
    color: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    image: 'church'
  },
  {
    icon: Vote,
    name: 'Political Campaign System',
    shortName: 'CampaignPro',
    description: 'Powerful tools for managing political campaigns, voter outreach, and volunteer coordination.',
    features: [
      'Voter database management',
      'Campaign messaging',
      'Volunteer coordination',
      'Event planning',
      'Donation tracking',
      'Analytics & reporting'
    ],
    color: 'from-red-400 to-orange-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-600',
    image: 'campaign'
  }
];

const enterpriseSolutions = [
  {
    icon: Cpu,
    title: 'AI & Machine Learning',
    description: 'Leverage the power of artificial intelligence to automate processes, gain insights, and make data-driven decisions.',
    features: ['Chatbots', 'Predictive Analytics', 'Process Automation', 'Data Mining'],
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
    features: ['Responsive Design', 'E-commerce', 'Web Apps', 'CMS Integration'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Building2,
    title: 'Enterprise Software',
    description: 'Tailored software solutions designed to meet the unique needs of your organization.',
    features: ['ERP Systems', 'CRM Solutions', 'HR Management', 'Inventory Systems'],
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Sparkles,
    title: 'Custom Solutions',
    description: 'Bespoke software development to solve your specific business challenges.',
    features: ['Requirements Analysis', 'UI/UX Design', 'Development', 'Support & Maintenance'],
    gradient: 'from-orange-500 to-amber-500'
  }
];

const whyChooseUs = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our team of experienced developers and designers deliver high-quality solutions tailored to your needs.',
    stat: '25+ Experts'
  },
  {
    icon: Calendar,
    title: 'On-Time Delivery',
    description: 'We understand the importance of deadlines and ensure timely project completion every time.',
    stat: '98% On-Time'
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description: 'Get enterprise-grade solutions at affordable prices with flexible payment options.',
    stat: 'Save 30%'
  },
  {
    icon: Shield,
    title: 'Ongoing Support',
    description: 'We provide continuous support and maintenance to keep your systems running smoothly.',
    stat: '24/7 Support'
  }
];

const techStack = [
  { name: 'React', icon: Code2, color: 'text-blue-400' },
  { name: 'Node.js', icon: Layers, color: 'text-green-500' },
  { name: 'Python', icon: Database, color: 'text-yellow-400' },
  { name: 'AI/ML', icon: Cpu, color: 'text-purple-400' },
  { name: 'Cloud', icon: Cloud, color: 'text-cyan-400' },
  { name: 'Mobile', icon: Smartphone, color: 'text-pink-400' },
  { name: 'API', icon: Zap, color: 'text-orange-400' },
  { name: 'Analytics', icon: TrendingUp, color: 'text-emerald-400' }
];

const stats = [
  { value: '50+', label: 'Software Products', suffix: '' },
  { value: '200+', label: 'Happy Clients', suffix: '' },
  { value: '15+', label: 'Industries Served', suffix: '' },
  { value: '9+', label: 'Years Experience', suffix: '' }
];

const liveProjects = [
  { name: 'Tewaw', href: 'https://tewaw.mobiwave.co.ke' },
  { name: 'Malanga Welfare', href: 'https://malangawelfare.org' },
  { name: 'RewardHub', href: 'https://mobiwavesrs.co.ke' },
  { name: 'Voting System', href: 'https://mobipoll.co.ke' },
  { name: 'JuaAfya', href: 'https://juaafya.co.ke' },
  { name: 'BID Logistics', href: 'https://bidlogistics.co.ke' },
  { name: 'Kilifi.go.ke', href: 'https://kilifi.go.ke', note: 'County Government of Kilifi' },
  { name: 'MobiWaveAI', href: 'https://mobiwaveai.co.ke', note: 'AI customer support' }
];

const comingSoonProjects = [
  { name: 'Imani CMS', note: 'Church management system' },
  { name: 'eShule', note: 'School management system' }
];

export function Products() {
  const statsRef = useRef<HTMLDivElement>(null);
  const innovationsHubRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof softwareProducts[0] | null>(null);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 80%',
        onEnter: () => {
          stats.forEach((stat, index) => {
            const numValue = parseInt(stat.value);
            gsap.to({}, {
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                const progress = this.progress();
                setAnimatedStats(prev => {
                  const newStats = [...prev];
                  newStats[index] = Math.floor(numValue * progress);
                  return newStats;
                });
              }
            });
          });
        },
        once: true
      });

      // Section animations
      const sections = [
        { ref: innovationsHubRef, selector: '.innovation-card' },
        { ref: productsRef, selector: '.product-card' },
        { ref: solutionsRef, selector: '.solution-card' },
        { ref: whyUsRef, selector: '.why-card' },
        { ref: techRef, selector: '.tech-item' }
      ];

      sections.forEach(({ ref, selector }) => {
        if (ref.current) {
          gsap.fromTo(selector,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 75%'
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden pt-28 sm:pt-32">
      <PageBanner
        title="Innovations"
        subtitle="Industry-focused software products and custom digital solutions by MobiWave."
      />

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {animatedStats[index]}{stat.suffix}+
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovations Hub Section */}
      <section ref={innovationsHubRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0084ff]/10 text-[#0084ff] text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              INNOVATIONS HUB
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Use Cases, Live Projects, and What&apos;s Next
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              A clear view of our product use cases, currently active deployments, and projects in progress.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="innovation-card rounded-3xl border border-gray-100 bg-gray-50 p-7">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Use Cases</h3>
              <p className="text-sm text-gray-600 mb-5">Industry scenarios we build for.</p>
              <ul className="space-y-3">
                {softwareProducts.map((product) => (
                  <li key={product.name} className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className={`w-4 h-4 mt-0.5 ${product.textColor} flex-shrink-0`} />
                    <span>
                      <span className="font-semibold text-gray-900">{product.name}</span>
                      <span className="block text-gray-600">{product.shortName}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="innovation-card rounded-3xl border border-emerald-100 bg-emerald-50/40 p-7">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Projects</h3>
              <p className="text-sm text-gray-600 mb-5">Projects currently deployed and accessible.</p>
              <ul className="space-y-3">
                {liveProjects.map((project) => (
                  <li key={project.name} className="text-sm">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
                    >
                      {project.name}
                    </a>
                    {project.note && <p className="text-gray-600">{project.note}</p>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="innovation-card rounded-3xl border border-amber-100 bg-amber-50/50 p-7">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-sm text-gray-600 mb-5">Products in development and planned release.</p>
              <ul className="space-y-3">
                {comingSoonProjects.map((project) => (
                  <li key={project.name} className="text-sm">
                    <p className="font-semibold text-amber-700">{project.name}</p>
                    <p className="text-gray-600">{project.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Software Products Section */}
      <section id="products" ref={productsRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0084ff]/10 text-[#0084ff] text-sm font-medium mb-4">
              <Layers className="w-4 h-4" />
              SOFTWARE PRODUCTS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry-Specific Solutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Ready-to-deploy software solutions designed for specific industries. 
              Each product is built with deep understanding of industry needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {softwareProducts.map((product) => (
              <div
                key={product.name}
                className="product-card group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Card Header with Gradient */}
                <div className={`h-32 bg-gradient-to-br ${product.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full blur-2xl" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-xl" />
                  </div>
                  <div className="absolute -bottom-8 left-6">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      <product.icon className={`w-8 h-8 ${product.textColor}`} />
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pt-12 pb-6 px-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${product.bgColor} ${product.textColor}`}>
                      {product.shortName}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {product.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className={`w-4 h-4 ${product.textColor} flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${product.bgColor} ${product.textColor} hover:opacity-80 flex items-center justify-center gap-2 group-hover:gap-3`}
                  >
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Solutions Section */}
      <section ref={solutionsRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              ENTERPRISE SOLUTIONS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Custom Development Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Bespoke software solutions tailored to your unique business requirements. 
              We turn your vision into reality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {enterpriseSolutions.map((solution) => (
              <div
                key={solution.title}
                className="solution-card group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {solution.features.map((feature, i) => (
                      <span 
                        key={i} 
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full font-medium group-hover:bg-gray-200 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={whyUsRef} className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              The MobiWave Advantage
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We combine technical expertise with industry knowledge to deliver solutions that truly make a difference.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item) => (
              <div
                key={item.title}
                className="why-card group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0084ff] to-[#1d8c89] flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#0084ff] mb-2">{item.stat}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section ref={techRef} className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0084ff]/10 text-[#0084ff] text-sm font-medium mb-4">
              <Code2 className="w-4 h-4" />
              TECHNOLOGIES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Modern Tech Stack
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We use cutting-edge technologies to build scalable, secure, and performant solutions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="tech-item group flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 min-w-[120px]"
              >
                <tech.icon className={`w-10 h-10 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-gray-900 font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              OUR PROCESS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'We understand your requirements and business goals' },
              { step: '02', title: 'Design', desc: 'We create intuitive UI/UX designs for your solution' },
              { step: '03', title: 'Development', desc: 'We build your solution using modern technologies' },
              { step: '04', title: 'Deployment', desc: 'We launch and provide ongoing support' }
            ].map((item, i) => (
              <div key={item.step} className="relative text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0084ff] to-[#1d8c89] flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0a1a25]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">
            Let's discuss how our software solutions can help you achieve your business goals. 
            Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-[#0084ff] font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Get a Free Consultation <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="tel:+254736427842"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all duration-300"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <div className="p-2">
              <div className={`h-24 bg-gradient-to-br ${selectedProduct.color} rounded-2xl flex items-center justify-center mb-6`}>
                <selectedProduct.icon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-3 mb-6">
                {selectedProduct.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <div className={`w-6 h-6 rounded-full ${selectedProduct.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Check className={`w-4 h-4 ${selectedProduct.textColor}`} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3">
                <a
                  href="/contact"
                  className={`flex-1 py-3 rounded-xl font-semibold text-center text-white bg-gradient-to-r ${selectedProduct.color} hover:opacity-90 transition-opacity`}
                >
                  Request Demo
                </a>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
