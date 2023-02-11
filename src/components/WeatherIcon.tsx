import React from 'react';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiNightAltRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiWindDeg,
  WiCloudUp,
  WiCloudDown
} from 'react-icons/wi';

type Props = {
  type: string,
  className?: string
}

export default function WeatherIcon({ type, className }: Props) {
  if (type.startsWith('50')) return <WiFog />;
  if (type.startsWith('13')) return <WiSnow />;
  if (type.startsWith('11')) return <WiThunderstorm />;
  if (type.startsWith('09')) return <WiRain />;
  if (type.startsWith('04')) return <WiCloudy />;
  if (type.startsWith('03')) return <WiCloud />;
  if (type.startsWith('10')) {
    return type.endsWith('d') ? <WiDayRain /> : <WiNightAltRain />;
  }
  if (type.startsWith('02')) {
    return type.endsWith('d') ? <WiDayCloudy /> : <WiNightAltCloudy />;
  }
  if (type.startsWith('01')) {
    return type.endsWith('d') ? <WiDaySunny /> : <WiNightClear />;
  }
  if (type === 'wind') return <WiWindDeg />;
  if (type === 'up') return <WiCloudUp className={className} />;
  if (type === 'down') return <WiCloudDown className={className} />;
  return null;
}
