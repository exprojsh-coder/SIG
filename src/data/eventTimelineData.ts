// src/data/eventTimelineData.ts

export interface EventTimeline {
  id: number;
  sdgId: number;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;
}

export const eventTimelineData: EventTimeline[] = [
  // SDG 1: No Poverty
  {
    id: 1,
    sdgId: 1,
    title: "Community Livelihoods Workshop",
    startDate: "2026-04-05",
    endDate: "2026-04-07",
  },
  {
    id: 2,
    sdgId: 1,
    title: "Microfinance Awareness Campaign",
    startDate: "2026-05-10",
    endDate: "2026-05-15",
  },

  // SDG 2: Zero Hunger
  {
    id: 3,
    sdgId: 2,
    title: "Food Distribution Drive",
    startDate: "2026-03-20",
    endDate: "2026-03-22",
  },
  {
    id: 4,
    sdgId: 2,
    title: "Urban Farming Training",
    startDate: "2026-04-12",
    endDate: "2026-04-18",
  },

  // SDG 3: Good Health and Well-being
  {
    id: 5,
    sdgId: 3,
    title: "Free Health Checkup Camp",
    startDate: "2026-03-25",
    endDate: "2026-03-28",
  },
  {
    id: 6,
    sdgId: 3,
    title: "Mental Health Awareness Week",
    startDate: "2026-05-01",
    endDate: "2026-05-07",
  },

  // SDG 4: Quality Education
  {
    id: 7,
    sdgId: 4,
    title: "Teacher Training Workshop",
    startDate: "2026-04-02",
    endDate: "2026-04-05",
  },
  {
    id: 8,
    sdgId: 4,
    title: "School Supply Distribution",
    startDate: "2026-06-01",
    endDate: "2026-06-03",
  },
  {
    id: 9,
    sdgId: 4,
    title: "Digital Literacy Bootcamp",
    startDate: "2026-07-10",
    endDate: "2026-07-20",
  },

  // SDG 5: Gender Equality
  {
    id: 10,
    sdgId: 5,
    title: "Women's Leadership Conference",
    startDate: "2026-03-08",
    endDate: "2026-03-10",
  },
  {
    id: 11,
    sdgId: 5,
    title: "Gender Equality Workshops in Schools",
    startDate: "2026-04-20",
    endDate: "2026-04-25",
  },

  // SDG 6: Clean Water and Sanitation
  {
    id: 12,
    sdgId: 6,
    title: "Well Drilling Project",
    startDate: "2026-03-15",
    endDate: "2026-03-30",
  },
  {
    id: 13,
    sdgId: 6,
    title: "Water Quality Testing Training",
    startDate: "2026-05-05",
    endDate: "2026-05-08",
  },

  // SDG 7: Affordable and Clean Energy
  {
    id: 14,
    sdgId: 7,
    title: "Solar Panel Installation Workshop",
    startDate: "2026-04-10",
    endDate: "2026-04-14",
  },
  {
    id: 15,
    sdgId: 7,
    title: "Energy Efficiency Awareness Fair",
    startDate: "2026-06-15",
    endDate: "2026-06-17",
  },

  // SDG 8: Decent Work and Economic Growth
  {
    id: 16,
    sdgId: 8,
    title: "Entrepreneurship Bootcamp for Youth",
    startDate: "2026-03-22",
    endDate: "2026-03-28",
  },
  {
    id: 17,
    sdgId: 8,
    title: "Job Fair for Marginalized Communities",
    startDate: "2026-05-20",
    endDate: "2026-05-22",
  },

  // SDG 9: Industry, Innovation and Infrastructure
  {
    id: 18,
    sdgId: 9,
    title: "Innovation Hackathon",
    startDate: "2026-04-16",
    endDate: "2026-04-18",
  },
  {
    id: 19,
    sdgId: 9,
    title: "Infrastructure Planning Symposium",
    startDate: "2026-07-01",
    endDate: "2026-07-03",
  },

  // SDG 10: Reduced Inequalities
  {
    id: 20,
    sdgId: 10,
    title: "Inclusion and Diversity Training",
    startDate: "2026-03-12",
    endDate: "2026-03-14",
  },
  {
    id: 21,
    sdgId: 10,
    title: "Refugee Support Volunteering",
    startDate: "2026-05-02",
    endDate: "2026-05-09",
  },

  // SDG 11: Sustainable Cities and Communities
  {
    id: 22,
    sdgId: 11,
    title: "Community Garden Build",
    startDate: "2026-04-04",
    endDate: "2026-04-10",
  },
  {
    id: 23,
    sdgId: 11,
    title: "Urban Cleanup Day",
    startDate: "2026-06-05",
    endDate: "2026-06-05",
  },

  // SDG 12: Responsible Consumption and Production
  {
    id: 24,
    sdgId: 12,
    title: "Plastic Waste Reduction Campaign",
    startDate: "2026-03-18",
    endDate: "2026-03-25",
  },
  {
    id: 25,
    sdgId: 12,
    title: "Sustainable Fashion Workshop",
    startDate: "2026-05-15",
    endDate: "2026-05-17",
  },

  // SDG 13: Climate Action
  {
    id: 26,
    sdgId: 13,
    title: "Tree Planting Drive",
    startDate: "2026-04-22",
    endDate: "2026-04-24",
  },
  {
    id: 27,
    sdgId: 13,
    title: "Climate Awareness March",
    startDate: "2026-06-10",
    endDate: "2026-06-10",
  },

  // SDG 14: Life Below Water
  {
    id: 28,
    sdgId: 14,
    title: "Beach Cleanup",
    startDate: "2026-03-27",
    endDate: "2026-03-29",
  },
  {
    id: 29,
    sdgId: 14,
    title: "Ocean Conservation Webinar",
    startDate: "2026-05-25",
    endDate: "2026-05-26",
  },

  // SDG 15: Life on Land
  {
    id: 30,
    sdgId: 15,
    title: "Reforestation Camp",
    startDate: "2026-04-01",
    endDate: "2026-04-08",
  },
  {
    id: 31,
    sdgId: 15,
    title: "Wildlife Protection Awareness",
    startDate: "2026-07-05",
    endDate: "2026-07-07",
  },

  // SDG 16: Peace, Justice and Strong Institutions
  {
    id: 32,
    sdgId: 16,
    title: "Community Mediation Training",
    startDate: "2026-03-14",
    endDate: "2026-03-17",
  },
  {
    id: 33,
    sdgId: 16,
    title: "Anti-Corruption Workshop",
    startDate: "2026-06-20",
    endDate: "2026-06-22",
  },

  // SDG 17: Partnerships for the Goals
  {
    id: 34,
    sdgId: 17,
    title: "Multi-Stakeholder Partnership Forum",
    startDate: "2026-04-28",
    endDate: "2026-04-30",
  },
  {
    id: 35,
    sdgId: 17,
    title: "SDG Youth Ambassadors Meetup",
    startDate: "2026-08-05",
    endDate: "2026-08-07",
  },
];