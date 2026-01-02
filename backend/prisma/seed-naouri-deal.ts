import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Naouri Malibu Villa deal...');

  // Create or update Issuer
  const issuer = await prisma.issuer.upsert({
    where: { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' },
    update: {},
    create: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      companyName: 'Naouri Development LLC',
      legalName: 'Naouri Real Estate Holdings, LLC',
      registrationNumber: 'LLC-2015-CA-789456',
      jurisdiction: 'Delaware, USA',
      companyType: 'LLC',
      website: 'https://naouri.com',
      email: 'invest@naouri.com',
      phone: '+1 (310) 555-0199',
      address: {
        street: '100 Wilshire Blvd, Suite 1500',
        city: 'Santa Monica',
        state: 'CA',
        country: 'USA',
        postal: '90401',
      },
      directors: [
        { name: 'Philippe Naouri', role: 'Managing Director', nationality: 'France' },
        { name: 'Sarah Mitchell', role: 'CFO', nationality: 'USA' },
      ],
      beneficialOwners: [
        { name: 'Philippe Naouri', ownership: 80, isPEP: false },
        { name: 'Sarah Mitchell', ownership: 20, isPEP: false },
      ],
      regulatoryStatus: 'Registered Investment Adviser',
      isVerified: true,
      verifiedAt: new Date(),
      verifiedBy: 'system',
    },
  });

  console.log(`✅ Issuer created: ${issuer.companyName}`);

  // Create the full Naouri Malibu Villa deal
  const deal = await prisma.deal.upsert({
    where: { slug: 'naouri-malibu-villa' },
    update: {
      // Update all fields
      issuerId: issuer.id,
      leaderBio: 'Philippe Naouri is a renowned mid-century modern real estate developer with over 15 years of experience in acquiring, renovating, and selling luxury properties in Beverly Hills and Malibu. His portfolio includes some of the most iconic architectural homes in Los Angeles.',
      leaderCredentials: ['15+ Years Experience', 'Forbes Real Estate Council', 'Architectural Digest Featured'],
      leaderPressLinks: [
        { title: 'Malibu Revival Project', source: 'Architectural Digest', url: 'https://example.com' },
        { title: 'The Future of Luxury Living', source: 'Forbes', url: 'https://example.com' },
      ],
      totalPastProfit: '$25M+ in realized profits',
      strategies: [
        {
          title: 'Strategic Acquisition',
          description: 'Target off-market properties in prime locations with strong value-add potential. Leverage Philippe\'s network for exclusive access.',
          icon: 'Target',
        },
        {
          title: 'Design Excellence',
          description: 'Collaborate with renowned architects to preserve mid-century modern aesthetics while adding contemporary luxury amenities.',
          icon: 'Palette',
        },
        {
          title: 'Premium Renovation',
          description: 'Execute high-quality renovations with attention to detail, using the finest materials and craftsmanship.',
          icon: 'Hammer',
        },
        {
          title: 'Strategic Exit',
          description: 'Maximize returns through optimal timing and marketing to high-net-worth buyers and celebrities.',
          icon: 'TrendingUp',
        },
      ],
      trackRecord: [
        { value: '$25M+', title: 'Total Profit', subtitle: 'Realized gains since 2015' },
        { value: '12', title: 'Exits', subtitle: 'Completed property sales' },
        { value: '85%', title: 'Avg. ROI', subtitle: 'Return on investment' },
        { value: '18mo', title: 'Avg. Hold', subtitle: 'Average holding period' },
      ],
      currentProperties: [
        {
          name: 'Malibu Modern Masterpiece',
          location: 'Carbon Beach, Malibu',
          status: 'In Progress',
          acquisitionPrice: '$4.5M',
          projectedSale: '$8.5M',
          description: 'A stunning oceanfront property with panoramic views, currently undergoing full renovation.',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
          estimatedProfit: '$4M',
          completionDate: 'Q3 2025',
        },
        {
          name: 'Beverly Hills Retreat',
          location: 'Trousdale Estates',
          status: 'In Progress',
          acquisitionPrice: '$6.2M',
          projectedSale: '$12M',
          description: 'Iconic mid-century modern home designed by Richard Neutra, undergoing careful restoration.',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
          estimatedProfit: '$5.8M',
          completionDate: 'Q4 2025',
        },
      ],
      marketData: {
        highlights: [
          { title: 'Market Growth', value: '+12% YoY', description: 'Malibu luxury home price appreciation' },
          { title: 'Inventory', value: 'Low', description: '3.2 months of supply' },
          { title: 'Demand', value: 'Strong', description: 'International buyer interest at all-time high' },
        ],
        trends: [
          'Celebrity and tech executive demand remains robust',
          'Limited new construction due to coastal restrictions',
          'Mid-century modern aesthetics commanding premium prices',
          'Work-from-home trend driving LA coastal migration',
        ],
      },
      financials: {
        projectedIRR: '15-20%',
        targetMultiple: '1.5-2.0x',
        holdPeriod: '24-32 months',
        distributions: 'Upon exit events',
        feeStructure: {
          management: '1.5% annually',
          performance: '20% above 8% preferred return',
        },
      },
      caseStudies: [
        {
          title: 'Sunset Strip Contemporary',
          location: 'Hollywood Hills, CA',
          year: 2023,
          acquisition: '$3.8M',
          sale: '$7.2M',
          profit: '$2.9M (net)',
          holdPeriod: '14 months',
          roi: '76%',
          description: 'A stunning contemporary home with city views, fully renovated with modern amenities.',
        },
        {
          title: 'Pacific Palisades Estate',
          location: 'Pacific Palisades, CA',
          year: 2022,
          acquisition: '$5.5M',
          sale: '$9.8M',
          profit: '$3.6M (net)',
          holdPeriod: '16 months',
          roi: '65%',
          description: 'Classic mid-century modern home with original Neutra elements carefully restored.',
        },
      ],
      realEstateData: {
        propertyType: 'Luxury Residential',
        strategy: 'Value-Add',
        geography: 'Los Angeles, California',
        targetHold: '24-32 months',
        assetCount: 2,
        avgPropertyValue: '$7.5M',
        totalPortfolioValue: '$15M',
      },
      risks: [
        { title: 'Market Risk', description: 'Real estate values may decline due to economic conditions, interest rate changes, or local market factors.' },
        { title: 'Liquidity Risk', description: 'This investment is illiquid. There is no secondary market, and early exit may not be possible.' },
        { title: 'Development Risk', description: 'Renovation projects may experience cost overruns, delays, or permitting issues that affect returns.' },
        { title: 'Concentration Risk', description: 'The portfolio is concentrated in the Los Angeles luxury market, increasing exposure to local conditions.' },
        { title: 'Capital Loss', description: 'You may lose some or all of your invested capital. Past performance is not indicative of future results.' },
      ],
    },
    create: {
      title: 'Prime Beverly Hills & Malibu Portfolio',
      slug: 'naouri-malibu-villa',
      tagline: 'Acquire, renovate, and exit luxury mid-century modern properties in LA\'s most exclusive neighborhoods',
      description: 'Join Philippe Naouri in acquiring and renovating premier mid-century modern properties across Beverly Hills and Malibu. This fund leverages Philippe\'s 15+ years of experience and unique access to off-market deals in LA\'s most sought-after neighborhoods.',
      category: 'Real Estate',
      subcategory: 'Luxury Development',
      issuerId: issuer.id,
      
      // Leadership
      leaderName: 'Philippe Naouri',
      leaderRole: 'Developer & Mid-Century Modern Expert',
      leaderImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      leaderBio: 'Philippe Naouri is a renowned mid-century modern real estate developer with over 15 years of experience in acquiring, renovating, and selling luxury properties in Beverly Hills and Malibu. His portfolio includes some of the most iconic architectural homes in Los Angeles.',
      leaderCredentials: ['15+ Years Experience', 'Forbes Real Estate Council', 'Architectural Digest Featured'],
      leaderPressLinks: [
        { title: 'Malibu Revival Project', source: 'Architectural Digest', url: 'https://example.com' },
        { title: 'The Future of Luxury Living', source: 'Forbes', url: 'https://example.com' },
      ],
      
      // Terms
      currency: 'EUR',
      minTicket: 50000,
      maxTicket: 500000,
      totalRaise: 5000000,
      currentRaised: 0,
      targetReturn: '10-15% IRR',
      term: '24-32 months',
      distributionFrequency: 'Upon exit',
      instrumentType: 'Notes',
      riskLevel: 5,
      risk: 'Medium',
      
      // Media
      bannerImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      heroVideoUrl: 'https://videos.pexels.com/video-files/4818525/4818525-hd_1920_1080_25fps.mp4',
      assetImages: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      ],
      
      // Data
      totalPastProfit: '$25M+ in realized profits',
      strategies: [
        {
          title: 'Strategic Acquisition',
          description: 'Target off-market properties in prime locations with strong value-add potential.',
          icon: 'Target',
        },
        {
          title: 'Design Excellence',
          description: 'Collaborate with renowned architects to preserve mid-century modern aesthetics.',
          icon: 'Palette',
        },
        {
          title: 'Premium Renovation',
          description: 'Execute high-quality renovations with attention to detail.',
          icon: 'Hammer',
        },
        {
          title: 'Strategic Exit',
          description: 'Maximize returns through optimal timing and marketing.',
          icon: 'TrendingUp',
        },
      ],
      trackRecord: [
        { value: '$25M+', title: 'Total Profit', subtitle: 'Realized gains since 2015' },
        { value: '12', title: 'Exits', subtitle: 'Completed property sales' },
        { value: '85%', title: 'Avg. ROI', subtitle: 'Return on investment' },
        { value: '18mo', title: 'Avg. Hold', subtitle: 'Average holding period' },
      ],
      currentProperties: [
        {
          name: 'Malibu Modern Masterpiece',
          location: 'Carbon Beach, Malibu',
          status: 'In Progress',
          acquisitionPrice: '$4.5M',
          projectedSale: '$8.5M',
        },
        {
          name: 'Beverly Hills Retreat',
          location: 'Trousdale Estates',
          status: 'In Progress',
          acquisitionPrice: '$6.2M',
          projectedSale: '$12M',
        },
      ],
      marketData: {
        highlights: [
          { title: 'Market Growth', value: '+12% YoY', description: 'Malibu luxury home price appreciation' },
          { title: 'Inventory', value: 'Low', description: '3.2 months of supply' },
          { title: 'Demand', value: 'Strong', description: 'International buyer interest at all-time high' },
        ],
      },
      financials: {
        projectedIRR: '15-20%',
        targetMultiple: '1.5-2.0x',
        holdPeriod: '24-32 months',
        distributions: 'Upon exit events',
      },
      caseStudies: [
        {
          title: 'Sunset Strip Contemporary',
          location: 'Hollywood Hills, CA',
          year: 2023,
          acquisition: '$3.8M',
          sale: '$7.2M',
          profit: '$2.9M (net)',
          roi: '76%',
        },
      ],
      realEstateData: {
        propertyType: 'Luxury Residential',
        strategy: 'Value-Add',
        geography: 'Los Angeles, California',
      },
      risks: [
        { title: 'Market Risk', description: 'Real estate values may decline due to economic conditions.' },
        { title: 'Liquidity Risk', description: 'This investment is illiquid with no secondary market.' },
        { title: 'Development Risk', description: 'Renovation projects may experience delays or cost overruns.' },
        { title: 'Capital Loss', description: 'You may lose some or all of your invested capital.' },
      ],
      
      // Status
      status: 'ACTIVE',
      launchDate: new Date(),
      investorCount: 0,
      
      // Team
      team: [
        {
          name: 'Philippe Naouri',
          role: 'Managing Partner',
          bio: 'Renowned developer specializing in mid-century modern luxury properties.',
          credentials: ['15+ Years Experience', 'Forbes Real Estate Council'],
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
        },
        {
          name: 'Sarah Mitchell',
          role: 'Chief Financial Officer',
          bio: 'Former Goldman Sachs VP with expertise in real estate finance.',
          credentials: ['CFA', 'MBA Stanford'],
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
        },
        {
          name: 'David Chen',
          role: 'Director of Acquisitions',
          bio: 'Specializes in sourcing off-market luxury properties in LA.',
          credentials: ['10+ Years in LA Real Estate', 'Licensed Broker'],
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        },
      ],
    },
  });

  console.log(`✅ Deal created/updated: ${deal.title}`);
  console.log(`   Slug: ${deal.slug}`);
  console.log(`   Status: ${deal.status}`);
  console.log('');
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
