// data/sdgData.js
export interface SDG {
  id: number;
  displayTitle: string;
  actualTitle: string;
  summary: string;
  description: string;
  color: string;
  image_url: string;
  focus_areas: string[];
  objectives: string[];
  requirements: string[];
  benefits: string[];
  targets: string[];
}



export const sdgData: SDG[] = [
  {
    id: 1,
    displayTitle: "NO POVERTY",
    actualTitle: "No Poverty",
    summary: "End poverty in all its forms everywhere by 2030.",
    description: "End poverty in all its forms everywhere. The goal includes targets on social protection, equal rights to economic resources, and building resilience of the poor and vulnerable. Over 700 million people still live in extreme poverty and struggle to fulfill the most basic needs like health, education, and access to water and sanitation.",
    color: "#E5243B",
    image_url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Extreme poverty eradication", "Social protection systems", "Economic resources access", "Poverty resilience"],
    objectives: ["Reduce extreme poverty by 50% by 2030", "Implement social protection measures for all", "Ensure equal rights to economic resources", "Build resilience of the poor"],
    requirements: ["Commitment to social justice", "Understanding of poverty dynamics", "Community engagement skills", "Research and data analysis"],
    benefits: ["Make meaningful impact on global poverty", "Gain experience in development work", "Network with global experts", "Develop policy analysis skills"],
    targets: [
      "By 2030, eradicate extreme poverty for all people everywhere (currently measured as people living on less than $1.25 a day)",
      "Implement nationally appropriate social protection systems and measures for all",
      "Ensure equal rights to economic resources, basic services, ownership and control over land",
      "Build resilience of the poor and those in vulnerable situations"
    ]
  },
  {
    id: 2,
    displayTitle: "ZERO HUNGER",
    actualTitle: "Zero Hunger",
    summary: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
    description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture. This goal aims to end all forms of hunger and malnutrition by 2030, making sure all people – especially children – have access to sufficient and nutritious food all year round.",
    color: "#DDA63A",
    image_url: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Food security", "Nutrition improvement", "Sustainable agriculture", "Small-scale farmers"],
    objectives: ["End hunger and malnutrition", "Double agricultural productivity", "Ensure sustainable food systems", "Maintain genetic diversity"],
    requirements: ["Nutrition knowledge", "Agricultural understanding", "Community engagement", "Food systems analysis"],
    benefits: ["Improve global food systems", "Work on cutting-edge agricultural solutions", "Learn sustainable farming practices", "Impact child nutrition"],
    targets: [
      "By 2030, end hunger and ensure access by all people to safe, nutritious and sufficient food all year round",
      "End all forms of malnutrition, including achieving internationally agreed targets on stunting and wasting in children under 5",
      "Double agricultural productivity and incomes of small-scale food producers",
      "Ensure sustainable food production systems and implement resilient agricultural practices"
    ]
  },
  {
    id: 3,
    displayTitle: "GOOD HEALTH AND WELL-BEING",
    actualTitle: "Good Health and Well-being",
    summary: "Ensure healthy lives and promote well-being for all at all ages.",
    description: "Ensure healthy lives and promote well-being for all at all ages. Significant strides have been made in increasing life expectancy and reducing some of the common killers associated with child and maternal mortality, but more efforts are needed to fully eradicate a wide range of diseases.",
    color: "#4C9F38",
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Maternal health", "Communicable diseases", "Non-communicable diseases", "Substance abuse", "Road safety"],
    objectives: ["Reduce maternal mortality", "End epidemics of AIDS, tuberculosis, malaria", "Strengthen prevention and treatment of substance abuse", "Achieve universal health coverage"],
    requirements: ["Healthcare knowledge", "Public health understanding", "Data analysis skills", "Community health experience"],
    benefits: ["Contribute to global health improvements", "Work with healthcare professionals", "Gain public health expertise", "Make impact on disease prevention"],
    targets: [
      "Reduce global maternal mortality ratio to less than 70 per 100,000 live births",
      "End epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases",
      "Strengthen prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol",
      "Achieve universal health coverage, including financial risk protection, access to quality healthcare services"
    ]
  },
  {
    id: 4,
    displayTitle: "QUALITY EDUCATION",
    actualTitle: "Quality Education",
    summary: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Education enables upward socioeconomic mobility and is a key to escaping poverty. Over 265 million children are currently out of school and 22% of them are of primary school age.",
    color: "#C5192D",
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Primary and secondary education", "Early childhood development", "Technical and vocational skills", "Gender equality in education"],
    objectives: ["Ensure free primary and secondary education", "Equal access to quality pre-primary education", "Increase number of youth with relevant skills", "Eliminate gender disparities in education"],
    requirements: ["Educational background", "Teaching/tutoring experience", "Curriculum development", "Patience and communication skills"],
    benefits: ["Impact future generations", "Develop educational programs", "Work with diverse communities", "Improve literacy rates"],
    targets: [
      "Ensure that all girls and boys complete free, equitable and quality primary and secondary education",
      "Ensure equal access for all women and men to affordable and quality technical, vocational and tertiary education",
      "Increase the number of youth and adults who have relevant skills, including technical and vocational skills, for employment",
      "Eliminate gender disparities in education and ensure equal access to all levels of education"
    ]
  },
  {
    id: 5,
    displayTitle: "GENDER EQUALITY",
    actualTitle: "Gender Equality",
    summary: "Achieve gender equality and empower all women and girls.",
    description: "Achieve gender equality and empower all women and girls. Gender equality is not only a fundamental human right, but a necessary foundation for a peaceful, prosperous and sustainable world. There has been progress over the last decades, but the world is not on track to achieve gender equality by 2030.",
    color: "#FF3A21",
    image_url: "https://images.unsplash.com/photo-1551836026-d5c2c727331f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["End discrimination", "Eliminate violence", "Equal participation", "Reproductive rights", "Economic empowerment"],
    objectives: ["End all forms of discrimination", "Eliminate all forms of violence", "Ensure full participation in leadership", "Recognize unpaid care work"],
    requirements: ["Understanding of gender issues", "Advocacy skills", "Research capabilities", "Cross-cultural sensitivity"],
    benefits: ["Promote human rights", "Work on policy change", "Network with global activists", "Develop advocacy skills"],
    targets: [
      "End all forms of discrimination against all women and girls everywhere",
      "Eliminate all forms of violence against all women and girls in public and private spheres",
      "Ensure women's full and effective participation and equal opportunities for leadership at all levels",
      "Recognize and value unpaid care and domestic work through the provision of public services"
    ]
  },
  {
    id: 6,
    displayTitle: "CLEAN WATER AND SANITATION",
    actualTitle: "Clean Water and Sanitation",
    summary: "Ensure availability and sustainable management of water and sanitation for all.",
    description: "Ensure availability and sustainable management of water and sanitation for all. Water scarcity affects more than 40 percent of people around the world, an alarming figure that is projected to increase with the rise of global temperatures as a result of climate change.",
    color: "#26BDE2",
    image_url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Drinking water", "Sanitation and hygiene", "Water quality", "Water-use efficiency", "Water-related ecosystems"],
    objectives: ["Achieve universal access to safe drinking water", "Achieve access to adequate sanitation", "Improve water quality", "Increase water-use efficiency"],
    requirements: ["Water management knowledge", "Engineering/scientific background", "Community development skills", "Environmental awareness"],
    benefits: ["Address water scarcity issues", "Work on sustainable solutions", "Improve public health", "Protect water ecosystems"],
    targets: [
      "Achieve universal and equitable access to safe and affordable drinking water for all",
      "Achieve access to adequate and equitable sanitation and hygiene for all and end open defecation",
      "Improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals",
      "Substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals"
    ]
  },
  {
    id: 7,
    displayTitle: "AFFORDABLE AND CLEAN ENERGY",
    actualTitle: "Affordable and Clean Energy",
    summary: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all. Energy is central to nearly every major challenge and opportunity the world faces today. Be it for jobs, security, climate change, food production or increasing incomes, access to energy is essential.",
    color: "#FCC30B",
    image_url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Universal energy access", "Renewable energy", "Energy efficiency", "Clean energy technology", "Energy infrastructure"],
    objectives: ["Ensure universal access to affordable energy", "Increase share of renewable energy", "Double global rate of improvement in energy efficiency", "Enhance international cooperation"],
    requirements: ["Energy sector knowledge", "Technical/engineering background", "Sustainability understanding", "Policy analysis skills"],
    benefits: ["Work on renewable energy solutions", "Contribute to climate change mitigation", "Develop clean technology projects", "Improve energy access"],
    targets: [
      "Ensure universal access to affordable, reliable and modern energy services",
      "Increase substantially the share of renewable energy in the global energy mix",
      "Double the global rate of improvement in energy efficiency",
      "Enhance international cooperation to facilitate access to clean energy research and technology"
    ]
  },
  {
    id: 8,
    displayTitle: "DECENT WORK AND ECONOMIC GROWTH",
    actualTitle: "Decent Work and Economic Growth",
    summary: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
    description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all. Roughly half the world's population still lives on the equivalent of about US$2 a day with global unemployment rates of 5.7%.",
    color: "#A21942",
    image_url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Economic growth", "Productive employment", "Labor rights", "Youth employment", "Tourism promotion"],
    objectives: ["Sustain per capita economic growth", "Achieve higher levels of productivity", "Promote development-oriented policies", "Protect labor rights"],
    requirements: ["Economics background", "Business/entrepreneurship skills", "Labor rights knowledge", "Policy development experience"],
    benefits: ["Work on economic development", "Support job creation", "Promote fair labor practices", "Develop business solutions"],
    targets: [
      "Sustain per capita economic growth in accordance with national circumstances",
      "Achieve higher levels of economic productivity through diversification, technological upgrading and innovation",
      "Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship",
      "Protect labor rights and promote safe and secure working environments for all workers"
    ]
  },
  {
    id: 9,
    displayTitle: "INDUSTRY, INNOVATION AND INFRASTRUCTURE",
    actualTitle: "Industry, Innovation and Infrastructure",
    summary: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
    description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation. Investment in infrastructure and innovation are crucial drivers of economic growth and development.",
    color: "#FD6925",
    image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Sustainable infrastructure", "Inclusive industrialization", "Innovation systems", "Scientific research", "Information technology"],
    objectives: ["Develop quality infrastructure", "Promote inclusive industrialization", "Enhance scientific research", "Increase access to information technology"],
    requirements: ["Engineering/technical background", "Innovation mindset", "Research skills", "Infrastructure planning knowledge"],
    benefits: ["Work on cutting-edge innovation", "Develop sustainable infrastructure", "Contribute to technological advancement", "Bridge digital divides"],
    targets: [
      "Develop quality, reliable, sustainable and resilient infrastructure to support economic development",
      "Promote inclusive and sustainable industrialization and significantly raise industry's share of employment",
      "Enhance scientific research, upgrade technological capabilities of industrial sectors in all countries",
      "Significantly increase access to information and communications technology and strive to provide universal internet access"
    ]
  },
  {
    id: 10,
    displayTitle: "REDUCED INEQUALITIES",
    actualTitle: "Reduced Inequalities",
    summary: "Reduce inequality within and among countries.",
    description: "Reduce inequality within and among countries. Income inequality is on the rise—the richest 10 percent have up to 40 percent of global income whereas the poorest 10 percent earn only between 2 to 7 percent.",
    color: "#DD1367",
    image_url: "https://images.unsplash.com/photo-1593113630400-ea4288922493?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Income inequality", "Social inclusion", "Migration policies", "Special treatment for developing countries", "Financial market regulation"],
    objectives: ["Achieve income growth for bottom 40%", "Promote social, economic and political inclusion", "Ensure equal opportunity", "Adopt fiscal and social policies"],
    requirements: ["Understanding of inequality issues", "Policy analysis skills", "Social justice commitment", "Cross-cultural experience"],
    benefits: ["Work on social justice issues", "Develop inclusive policies", "Address systemic inequality", "Promote global equity"],
    targets: [
      "Progressively achieve and sustain income growth of the bottom 40% of the population at a rate higher than the national average",
      "Empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin",
      "Ensure equal opportunity and reduce inequalities of outcome, including by eliminating discriminatory laws, policies and practices",
      "Adopt policies, especially fiscal, wage and social protection policies, and progressively achieve greater equality"
    ]
  },
  {
    id: 11,
    displayTitle: "SUSTAINABLE CITIES AND COMMUNITIES",
    actualTitle: "Sustainable Cities and Communities",
    summary: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable. The world's population is constantly increasing. To accommodate everyone, we need to build modern, sustainable cities. For all of us to survive and prosper, we need new, intelligent urban planning.",
    color: "#FD9D24",
    image_url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Affordable housing", "Sustainable transport", "Urban planning", "Cultural heritage", "Disaster resilience"],
    objectives: ["Ensure access to adequate housing", "Provide sustainable transport systems", "Enhance inclusive urbanization", "Protect cultural and natural heritage"],
    requirements: ["Urban planning knowledge", "Architecture/design background", "Sustainability focus", "Community engagement skills"],
    benefits: ["Design sustainable cities", "Work on urban development", "Improve living conditions", "Protect cultural heritage"],
    targets: [
      "Ensure access for all to adequate, safe and affordable housing and basic services and upgrade slums",
      "Provide access to safe, affordable, accessible and sustainable transport systems for all",
      "Enhance inclusive and sustainable urbanization and capacity for participatory, integrated and sustainable human settlement planning",
      "Strengthen efforts to protect and safeguard the world's cultural and natural heritage"
    ]
  },
  {
    id: 12,
    displayTitle: "RESPONSIBLE CONSUMPTION AND PRODUCTION",
    actualTitle: "Responsible Consumption and Production",
    summary: "Ensure sustainable consumption and production patterns.",
    description: "Ensure sustainable consumption and production patterns. Achieving economic growth and sustainable development requires that we urgently reduce our ecological footprint by changing the way we produce and consume goods and resources.",
    color: "#BF8B2E",
    image_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Sustainable management", "Food waste reduction", "Chemical management", "Waste reduction", "Sustainable practices"],
    objectives: ["Implement sustainable consumption", "Achieve sustainable management of natural resources", "Halve per capita food waste", "Promote sustainable public procurement"],
    requirements: ["Environmental science background", "Supply chain knowledge", "Waste management experience", "Sustainability certification"],
    benefits: ["Promote circular economy", "Reduce environmental impact", "Develop sustainable products", "Work on waste reduction"],
    targets: [
      "Implement the 10-Year Framework of Programmes on Sustainable Consumption and Production Patterns",
      "Achieve sustainable management and efficient use of natural resources",
      "Halve per capita global food waste at retail and consumer levels and reduce food losses along production and supply chains",
      "Encourage companies to adopt sustainable practices and to integrate sustainability information into their reporting"
    ]
  },
  {
    id: 13,
    displayTitle: "CLIMATE ACTION",
    actualTitle: "Climate Action",
    summary: "Take urgent action to combat climate change and its impacts.",
    description: "Take urgent action to combat climate change and its impacts. Climate change is now affecting every country on every continent. It is disrupting national economies and affecting lives, costing people, communities and countries dearly today and even more tomorrow.",
    color: "#3F7E44",
    image_url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Climate resilience", "Climate policies", "Education and awareness", "Climate financing", "Capacity building"],
    objectives: ["Strengthen resilience to climate hazards", "Integrate climate measures into policies", "Improve education and awareness", "Mobilize climate finance"],
    requirements: ["Climate science knowledge", "Policy analysis skills", "Environmental advocacy", "Risk assessment experience"],
    benefits: ["Work on urgent climate issues", "Develop climate resilience strategies", "Influence climate policy", "Join global climate action"],
    targets: [
      "Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries",
      "Integrate climate change measures into national policies, strategies and planning",
      "Improve education, awareness-raising and human and institutional capacity on climate change mitigation",
      "Implement the commitment undertaken by developed-country parties to mobilize jointly $100 billion annually by 2020"
    ]
  },
  {
    id: 14,
    displayTitle: "LIFE BELOW WATER",
    actualTitle: "Life Below Water",
    summary: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
    description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development. The world's oceans – their temperature, chemistry, currents and life – drive global systems that make the Earth habitable for humankind.",
    color: "#0A97D9",
    image_url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Marine pollution", "Ocean acidification", "Sustainable fishing", "Marine conservation", "Fisheries subsidies"],
    objectives: ["Reduce marine pollution", "Protect marine ecosystems", "End overfishing", "Conserve coastal areas"],
    requirements: ["Marine biology background", "Ocean conservation knowledge", "Environmental policy understanding", "Research skills"],
    benefits: ["Protect marine ecosystems", "Work on ocean conservation", "Address plastic pollution", "Promote sustainable fishing"],
    targets: [
      "Prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities",
      "Sustainably manage and protect marine and coastal ecosystems to avoid significant adverse impacts",
      "Effectively regulate harvesting and end overfishing, illegal, unreported and unregulated fishing",
      "Conserve at least 10 per cent of coastal and marine areas, consistent with national and international law"
    ]
  },
  {
    id: 15,
    displayTitle: "LIFE ON LAND",
    actualTitle: "Life on Land",
    summary: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss. Forests cover 30.7 percent of the Earth's surface and are vital for combating climate change.",
    color: "#56C02B",
    image_url: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Forest conservation", "Desertification combat", "Biodiversity protection", "Poaching prevention", "Invasive species"],
    objectives: ["Conserve and restore terrestrial ecosystems", "End deforestation", "Combat desertification", "Protect biodiversity"],
    requirements: ["Ecology/environmental science", "Forestry knowledge", "Conservation experience", "Field research skills"],
    benefits: ["Protect biodiversity", "Work on forest conservation", "Combat desertification", "Restore ecosystems"],
    targets: [
      "Ensure conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems",
      "Promote implementation of sustainable management of all types of forests, halt deforestation, restore degraded forests",
      "Combat desertification, restore degraded land and soil, including land affected by desertification, drought and floods",
      "Take urgent action to end poaching and trafficking of protected species of flora and fauna"
    ]
  },
  {
    id: 16,
    displayTitle: "PEACE, JUSTICE AND STRONG INSTITUTIONS",
    actualTitle: "Peace, Justice and Strong Institutions",
    summary: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
    description: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels. High levels of armed violence and insecurity have a destructive impact on a country's development.",
    color: "#00689D",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Violence reduction", "Rule of law", "Corruption reduction", "Effective institutions", "Inclusive decision-making"],
    objectives: ["Reduce all forms of violence", "Promote rule of law", "Combat organized crime", "Develop accountable institutions"],
    requirements: ["Law/political science background", "Conflict resolution skills", "Governance understanding", "Human rights knowledge"],
    benefits: ["Promote peace and justice", "Work on governance reform", "Develop conflict resolution skills", "Support human rights"],
    targets: [
      "Significantly reduce all forms of violence and related death rates everywhere",
      "Promote the rule of law at the national and international levels and ensure equal access to justice for all",
      "Substantially reduce corruption and bribery in all their forms",
      "Develop effective, accountable and transparent institutions at all levels"
    ]
  },
  {
    id: 17,
    displayTitle: "PARTNERSHIPS FOR THE GOALS",
    actualTitle: "Partnerships for the Goals",
    summary: "Strengthen the means of implementation and revitalize the global partnership for sustainable development.",
    description: "Strengthen the means of implementation and revitalize the global partnership for sustainable development. The SDGs can only be realized with strong global partnerships and cooperation. International investments and support are needed to ensure innovative technological development.",
    color: "#19486A",
    image_url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    focus_areas: ["Development finance", "Technology transfer", "Capacity building", "Trade systems", "Policy coherence"],
    objectives: ["Strengthen domestic resource mobilization", "Enhance North-South cooperation", "Promote technology development", "Build capacity in developing countries"],
    requirements: ["International relations background", "Partnership development skills", "Project management experience", "Cross-cultural communication"],
    benefits: ["Build global partnerships", "Work on international cooperation", "Develop multi-stakeholder initiatives", "Coordinate SDG implementation"],
    targets: [
      "Strengthen domestic resource mobilization, including through international support to developing countries",
      "Enhance North-South, South-South and triangular regional and international cooperation on access to science, technology and innovation",
      "Promote development, transfer, dissemination and diffusion of environmentally sound technologies to developing countries",
      "Enhance international support for implementing effective and targeted capacity-building in developing countries"
    ]
  }
];