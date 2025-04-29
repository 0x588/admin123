
import provinces from '@/assets/area/provinces.json'
import areas from '@/assets/area/areas.json'
import cities from '@/assets/area/cities.json'

export const areaOption = provinces.map(province => {
  const childrenCities = cities
    .filter(city => city.provinceCode === province.code)
    .map(city => {
      const childrenAreas = areas
        .filter(area => area.cityCode === city.code)
        .map(area => ({
          label: area.name,
          value: area.code,
          isLeaf: true,
        }));
      return {
        label: city.name,
        value: city.code,
        children: childrenAreas,
      };
    });
  return {
    label: province.name,
    value: province.code,
    children: childrenCities,
  };
});
