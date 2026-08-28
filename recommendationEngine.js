/**
 * Recommendation Engine & Transparent Scoring Logic
 * Total Score = 100 Points maximum
 * Weighting Breakdown:
 * - Interest Match: 40 points
 * - Skills/Hobbies Match: 20 points
 * - Preferred Activities Match: 15 points
 * - Schedule/Time Match: 15 points
 * - Preferred Club Type Match: 10 points
 */

function parseTime(timeStr) {
  if (!timeStr) return null;
  const [hours, minutes] = timeStr.trim().split(':').map(Number);
  return hours * 60 + minutes;
}

function convert12to24(time12) {
  if (!time12) return '';
  const [time, modifier] = time12.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM' || modifier === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours.toString().padStart(2, '0')}:${minutes || '00'}`;
}

function parseClubSchedule(timeRangeStr) {
  if (!timeRangeStr) return { start: 0, end: 1440 };
  const parts = timeRangeStr.split('-').map(s => s.trim());
  if (parts.length < 2) return { start: 0, end: 1440 };
  return {
    start: parseTime(convert12to24(parts[0])),
    end: parseTime(convert12to24(parts[1]))
  };
}

function calculateMatch(studentProfile, club) {
  let scoreBreakdown = {
    interests: 0,
    skills: 0,
    activities: 0,
    schedule: 0,
    clubType: 0
  };
  let matchReasons = [];

  // Normalize Strings helper
  const normalize = (arr) => arr.map(i => i.toLowerCase().trim());

  const studentInterests = normalize(studentProfile.interests || []);
  const studentSkills = normalize(studentProfile.skills || []);
  const studentActivities = normalize(studentProfile.preferredActivities || []);
  const studentDays = normalize(studentProfile.availableDays || []);
  const clubActivities = normalize(club.activities || []);
  const clubSkills = normalize(club.requiredSkills || []);
  const clubDays = normalize(club.meetingDays || []);

  // 1. INTEREST MATCH (Max: 40 pts)
  // Check direct matches between student interests and club details (category, name, activities)
  let interestMatches = 0;
  studentInterests.forEach(interest => {
    if (
      club.category.toLowerCase().includes(interest) ||
      club.clubName.toLowerCase().includes(interest) ||
      clubActivities.some(act => act.includes(interest)) ||
      club.description.toLowerCase().includes(interest)
    ) {
      interestMatches++;
    }
  });

  if (studentInterests.length > 0) {
    const interestRatio = Math.min(interestMatches / Math.max(studentInterests.length, 1), 1);
    scoreBreakdown.interests = Math.round(interestRatio * 40);
    if (scoreBreakdown.interests > 0) {
      matchReasons.push(`Matches your key interest areas (${scoreBreakdown.interests}/40 pts).`);
    }
  }

  // 2. SKILLS / HOBBIES MATCH (Max: 20 pts)
  let skillMatches = 0;
  studentSkills.forEach(skill => {
    if (
      clubSkills.some(cs => cs.includes(skill) || skill.includes(cs)) ||
      club.description.toLowerCase().includes(skill)
    ) {
      skillMatches++;
    }
  });

  if (studentSkills.length > 0) {
    const skillRatio = Math.min(skillMatches / Math.max(clubSkills.length, 1), 1);
    scoreBreakdown.skills = Math.round(skillRatio * 20);
    if (scoreBreakdown.skills > 0) {
      matchReasons.push(`Utilizes your background skills like ${studentProfile.skills.join(', ')} (${scoreBreakdown.skills}/20 pts).`);
    }
  }

  // 3. PREFERRED ACTIVITIES MATCH (Max: 15 pts)
  let activityMatches = 0;
  studentActivities.forEach(act => {
    if (clubActivities.some(ca => ca.includes(act) || act.includes(ca))) {
      activityMatches++;
    }
  });

  if (studentActivities.length > 0) {
    const actRatio = Math.min(activityMatches / Math.max(studentActivities.length, 1), 1);
    scoreBreakdown.activities = Math.round(actRatio * 15);
    if (scoreBreakdown.activities > 0) {
      matchReasons.push(`Offers your preferred engagement types like ${studentProfile.preferredActivities.join(', ')} (${scoreBreakdown.activities}/15 pts).`);
    }
  }

  // 4. SCHEDULE & TIME MATCH (Max: 15 pts)
  let dayMatch = clubDays.some(day => studentDays.includes(day));
  let timeMatch = true;

  if (studentProfile.timeRangeStart && studentProfile.timeRangeEnd) {
    const studentStart = parseTime(studentProfile.timeRangeStart);
    const studentEnd = parseTime(studentProfile.timeRangeEnd);
    const clubSchedule = parseClubSchedule(club.meetingTime);

    // Check overlap
    if (studentStart && studentEnd && clubSchedule.start && clubSchedule.end) {
      timeMatch = Math.max(studentStart, clubSchedule.start) < Math.min(studentEnd, clubSchedule.end);
    }
  }

  if (dayMatch && timeMatch) {
    scoreBreakdown.schedule = 15;
    matchReasons.push(`Fits your availability on ${club.meetingDays.join(', ')} during ${club.meetingTime} (${scoreBreakdown.schedule}/15 pts).`);
  } else if (dayMatch) {
    scoreBreakdown.schedule = 8;
    matchReasons.push(`Matches day availability (${club.meetingDays.join(', ')}), though times overlap partially (${scoreBreakdown.schedule}/15 pts).`);
  }

  // 5. PREFERRED CLUB TYPE MATCH (Max: 10 pts)
  if (
    !studentProfile.preferredClubType ||
    studentProfile.preferredClubType === 'Any' ||
    studentProfile.preferredClubType.toLowerCase() === club.category.toLowerCase()
  ) {
    scoreBreakdown.clubType = 10;
    matchReasons.push(`Aligns with your chosen club category (${club.category}) (${scoreBreakdown.clubType}/10 pts).`);
  }

  // Calculate Total Score
  const totalScore = Math.min(
    100,
    scoreBreakdown.interests +
    scoreBreakdown.skills +
    scoreBreakdown.activities +
    scoreBreakdown.schedule +
    scoreBreakdown.clubType
  );

  // Generate Human-Readable Reason
  let explanation = matchReasons.length > 0 
    ? matchReasons.join(' ') 
    : `Provides exposure to ${club.category} activities on campus despite partial preference overlap.`;

  return {
    ...club,
    relevanceScore: totalScore,
    scoreBreakdown,
    matchExplanation: explanation
  };
}

function processRecommendations(studentProfile, clubsData) {
  const ratedClubs = clubsData.map(club => calculateMatch(studentProfile, club));
  
  // Sort descending by score
  ratedClubs.sort((a, b) => b.relevanceScore - a.relevanceScore);

  const strongMatches = ratedClubs.filter(c => c.relevanceScore >= 50);
  const isStrongMatchFound = strongMatches.length > 0;

  return {
    isStrongMatchFound,
    recommendations: ratedClubs,
    bestMatch: ratedClubs[0] || null
  };
}

module.exports = {
  processRecommendations
};
