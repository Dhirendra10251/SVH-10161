import { RajasthanDistrict, RajasthanDivision } from '../types';

export const RAJASTHAN_DIVISIONS: RajasthanDivision[] = [
  {
    name: 'Ajmer Division',
    districts: ['Ajmer', 'Beawar', 'Bhilwara', 'Didwana-Kuchaman', 'Nagaur', 'Tonk'],
  },
  {
    name: 'Bharatpur Division',
    districts: ['Bharatpur', 'Deeg', 'Dholpur', 'Karauli', 'Sawai Madhopur'],
  },
  {
    name: 'Bikaner Division',
    districts: ['Bikaner', 'Churu', 'Ganganagar', 'Hanumangarh'],
  },
  {
    name: 'Jaipur Division',
    districts: ['Alwar', 'Dausa', 'Jaipur', 'Jhunjhunu', 'Khairthal-Tijara', 'Kotputli-Behror', 'Sikar'],
  },
  {
    name: 'Jodhpur Division',
    districts: ['Balotra', 'Barmer', 'Jaisalmer', 'Jalore', 'Jodhpur', 'Pali', 'Phalodi', 'Sirohi'],
  },
  {
    name: 'Kota Division',
    districts: ['Baran', 'Bundi', 'Jhalawar', 'Kota'],
  },
  {
    name: 'Udaipur Division',
    districts: ['Banswara', 'Chittorgarh', 'Dungarpur', 'Pratapgarh', 'Rajsamand', 'Salumbar', 'Udaipur'],
  },
];

// Complete 41-district administrative registry for the Government of Rajasthan
export const RAJASTHAN_DISTRICTS: RajasthanDistrict[] = [
  // 1. Ajmer Division (6)
  { id: 'ajmer', name: 'Ajmer', division: 'Ajmer Division', headquarters: 'Ajmer', pilotCampusesCount: 0 },
  { id: 'beawar', name: 'Beawar', division: 'Ajmer Division', headquarters: 'Beawar', pilotCampusesCount: 0 },
  { id: 'bhilwara', name: 'Bhilwara', division: 'Ajmer Division', headquarters: 'Bhilwara', pilotCampusesCount: 0 },
  { id: 'didwana-kuchaman', name: 'Didwana-Kuchaman', division: 'Ajmer Division', headquarters: 'Didwana', pilotCampusesCount: 0 },
  { id: 'nagaur', name: 'Nagaur', division: 'Ajmer Division', headquarters: 'Nagaur', pilotCampusesCount: 0 },
  { id: 'tonk', name: 'Tonk', division: 'Ajmer Division', headquarters: 'Tonk', pilotCampusesCount: 0 },

  // 2. Bharatpur Division (5)
  { id: 'bharatpur', name: 'Bharatpur', division: 'Bharatpur Division', headquarters: 'Bharatpur', pilotCampusesCount: 0 },
  { id: 'deeg', name: 'Deeg', division: 'Bharatpur Division', headquarters: 'Deeg', pilotCampusesCount: 0 },
  { id: 'dholpur', name: 'Dholpur', division: 'Bharatpur Division', headquarters: 'Dholpur', pilotCampusesCount: 0 },
  { id: 'karauli', name: 'Karauli', division: 'Bharatpur Division', headquarters: 'Karauli', pilotCampusesCount: 0 },
  { id: 'sawai-madhopur', name: 'Sawai Madhopur', division: 'Bharatpur Division', headquarters: 'Sawai Madhopur', pilotCampusesCount: 0 },

  // 3. Bikaner Division (4)
  { id: 'bikaner', name: 'Bikaner', division: 'Bikaner Division', headquarters: 'Bikaner', pilotCampusesCount: 1 },
  { id: 'churu', name: 'Churu', division: 'Bikaner Division', headquarters: 'Churu', pilotCampusesCount: 0 },
  { id: 'ganganagar', name: 'Ganganagar', division: 'Bikaner Division', headquarters: 'Sri Ganganagar', pilotCampusesCount: 0 },
  { id: 'hanumangarh', name: 'Hanumangarh', division: 'Bikaner Division', headquarters: 'Hanumangarh', pilotCampusesCount: 0 },

  // 4. Jaipur Division (7)
  { id: 'alwar', name: 'Alwar', division: 'Jaipur Division', headquarters: 'Alwar', pilotCampusesCount: 0 },
  { id: 'dausa', name: 'Dausa', division: 'Jaipur Division', headquarters: 'Dausa', pilotCampusesCount: 0 },
  { id: 'jaipur', name: 'Jaipur', division: 'Jaipur Division', headquarters: 'Jaipur', pilotCampusesCount: 1 },
  { id: 'jhunjhunu', name: 'Jhunjhunu', division: 'Jaipur Division', headquarters: 'Jhunjhunu', pilotCampusesCount: 1 },
  { id: 'khairthal-tijara', name: 'Khairthal-Tijara', division: 'Jaipur Division', headquarters: 'Khairthal', pilotCampusesCount: 0 },
  { id: 'kotputli-behror', name: 'Kotputli-Behror', division: 'Jaipur Division', headquarters: 'Kotputli', pilotCampusesCount: 0 },
  { id: 'sikar', name: 'Sikar', division: 'Jaipur Division', headquarters: 'Sikar', pilotCampusesCount: 0 },

  // 5. Jodhpur Division (8)
  { id: 'balotra', name: 'Balotra', division: 'Jodhpur Division', headquarters: 'Balotra', pilotCampusesCount: 0 },
  { id: 'barmer', name: 'Barmer', division: 'Jodhpur Division', headquarters: 'Barmer', pilotCampusesCount: 0 },
  { id: 'jaisalmer', name: 'Jaisalmer', division: 'Jodhpur Division', headquarters: 'Jaisalmer', pilotCampusesCount: 0 },
  { id: 'jalore', name: 'Jalore', division: 'Jodhpur Division', headquarters: 'Jalore', pilotCampusesCount: 0 },
  { id: 'jodhpur', name: 'Jodhpur', division: 'Jodhpur Division', headquarters: 'Jodhpur', pilotCampusesCount: 2 },
  { id: 'pali', name: 'Pali', division: 'Jodhpur Division', headquarters: 'Pali', pilotCampusesCount: 0 },
  { id: 'phalodi', name: 'Phalodi', division: 'Jodhpur Division', headquarters: 'Phalodi', pilotCampusesCount: 0 },
  { id: 'sirohi', name: 'Sirohi', division: 'Jodhpur Division', headquarters: 'Sirohi', pilotCampusesCount: 0 },

  // 6. Kota Division (4)
  { id: 'baran', name: 'Baran', division: 'Kota Division', headquarters: 'Baran', pilotCampusesCount: 0 },
  { id: 'bundi', name: 'Bundi', division: 'Kota Division', headquarters: 'Bundi', pilotCampusesCount: 0 },
  { id: 'jhalawar', name: 'Jhalawar', division: 'Kota Division', headquarters: 'Jhalawar', pilotCampusesCount: 0 },
  { id: 'kota', name: 'Kota', division: 'Kota Division', headquarters: 'Kota', pilotCampusesCount: 1 },

  // 7. Udaipur Division (7)
  { id: 'banswara', name: 'Banswara', division: 'Udaipur Division', headquarters: 'Banswara', pilotCampusesCount: 0 },
  { id: 'chittorgarh', name: 'Chittorgarh', division: 'Udaipur Division', headquarters: 'Chittorgarh', pilotCampusesCount: 0 },
  { id: 'dungarpur', name: 'Dungarpur', division: 'Udaipur Division', headquarters: 'Dungarpur', pilotCampusesCount: 0 },
  { id: 'pratapgarh', name: 'Pratapgarh', division: 'Udaipur Division', headquarters: 'Pratapgarh', pilotCampusesCount: 0 },
  { id: 'rajsamand', name: 'Rajsamand', division: 'Udaipur Division', headquarters: 'Rajsamand', pilotCampusesCount: 0 },
  { id: 'salumbar', name: 'Salumbar', division: 'Udaipur Division', headquarters: 'Salumbar', pilotCampusesCount: 0 },
  { id: 'udaipur', name: 'Udaipur', division: 'Udaipur Division', headquarters: 'Udaipur', pilotCampusesCount: 1 },
];
