
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

export function showAreaText(ar: Array<any>) {
  if (ar.length === 0) {
    return '';
  }
  var result : Array<string> = [];
  if (ar.length >= 1) {
    provinces.forEach((province, index) => {
      if (province.code === ar[0]) {
        result.push(province.name);
      }
    })
  }
  if (ar.length >= 2) {
    cities.forEach((city, index) => {
      if (city.code === ar[1]) {
        result.push(city.name);
      }
    })
  }
  if (ar.length >= 3) {
    areas.forEach((area, index) => {
      if (area.code === ar[2]) {
        result.push(area.name);
      }
    })
  }
  return result.join('-');
}

export function showAreasText(ars: Array<any>) {
  var result : Array<string> = [];
  ars.forEach((area, index) => {
    result.push(showAreaText(area))
  })
  return result;
}

export function showAreasWithJson(json: any) {
  if (typeof json !== 'object') {
    try {
    var data = JSON.parse(json);
    return showAreasText(data)
    } catch (e) {
      return []
    }
  }
  return showAreasText(json)
}
